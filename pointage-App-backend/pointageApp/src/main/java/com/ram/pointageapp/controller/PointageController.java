package com.ram.pointageapp.controller;

import com.ram.pointageapp.dto.PointageDTO;
import com.ram.pointageapp.dto.PointageJourDTO;
import com.ram.pointageapp.model.Collaborateur;
import com.ram.pointageapp.model.Pointage;
import com.ram.pointageapp.model.TypePointage;
import com.ram.pointageapp.repository.CollaborateurRepository;
import com.ram.pointageapp.repository.PointageRepository;
import com.ram.pointageapp.service.PointageService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/pointages")
public class PointageController {

    private final PointageService pointageService;
    private final CollaborateurRepository collaborateurRepo;
    private final PointageRepository pointageRepo;

    public PointageController(PointageService pointageService, CollaborateurRepository collaborateurRepo , PointageRepository pointageRepo) {
        this.pointageService = pointageService;
        this.collaborateurRepo = collaborateurRepo;
        this.pointageRepo = pointageRepo;
    }

    @PostMapping("/{idMachin}/{type}")
    public ResponseEntity<Pointage> pointer(
            @PathVariable String idMachin,
            @PathVariable TypePointage type
    ) {
        Collaborateur collab = collaborateurRepo.findByIdMachin(idMachin)
                .orElseThrow(() -> new RuntimeException("Collaborateur introuvable"));

        Pointage p = pointageService.enregistrerPointage(collab, type);
        return ResponseEntity.ok(p);
    }

    @GetMapping("/{idMachin}/derniers")
    public ResponseEntity<List<PointageJourDTO>> derniersPointages(
            @PathVariable String idMachin,
            @RequestParam(defaultValue = "3") int limit
    ) {
        boolean exists = collaborateurRepo.existsByIdMachin(idMachin);
        Collaborateur collab = collaborateurRepo.findByIdMachin(idMachin)
                .orElseThrow(() -> new RuntimeException("Collaborateur introuvable"));

        return ResponseEntity.ok(pointageService.getDerniersPointages(collab, limit));
    }

    @GetMapping("/all")
    public Page<PointageDTO> getAllPointages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(required = false) String idMachin,
            @RequestParam(required = false) String date
    ) {
        Pageable pageable = PageRequest.of(
                page, size,
                Sort.by("date").descending().and(Sort.by("heure").descending())
        );

        Page<Pointage> pointages;

        if (idMachin != null && date != null) {
            pointages = pointageRepo.findByCollaborateur_IdMachinAndDate(
                    idMachin, LocalDate.parse(date), pageable
            );
        } else if (idMachin != null) {
            pointages = pointageRepo.findByCollaborateur_IdMachin(idMachin, pageable);
        } else if (date != null) {
            pointages = pointageRepo.findByDate(LocalDate.parse(date), pageable);
        } else {
            pointages = pointageRepo.findAll(pageable);
        }

        return pointages.map(p -> new PointageDTO(
                p.getId(),
                p.getCollaborateur().getNom(),
                p.getCollaborateur().getPrenom(),
                p.getCollaborateur().getIdMachin(),
                p.getDate().toString(),
                p.getHeure().toString().substring(0, 5),
                p.getType() == TypePointage.Entree ? "Entrée" : "Sortie"
        ));
    }






}
