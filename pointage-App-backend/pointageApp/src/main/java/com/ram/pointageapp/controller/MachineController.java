package com.ram.pointageapp.controller;

import com.ram.pointageapp.repository.CollaborateurRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/machine")
public class MachineController {

    private final CollaborateurRepository collaborateurRepository;

    public MachineController(CollaborateurRepository collaborateurRepository) {
        this.collaborateurRepository = collaborateurRepository;
    }

    @GetMapping("/current")
    public ResponseEntity<String> getMachineId() {
        try {

            String hostname = InetAddress.getLocalHost().getHostName();
            return collaborateurRepository.findByIdMachin(hostname)
                    .map(c -> ResponseEntity.ok(c.getIdMachin()))
                    .orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la récupération de l'id machine");
        }
    }
}

