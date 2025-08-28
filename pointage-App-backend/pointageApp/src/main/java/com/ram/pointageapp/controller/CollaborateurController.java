
package com.ram.pointageapp.controller;

import com.ram.pointageapp.model.Collaborateur;
import com.ram.pointageapp.service.CollaborateurService;
import com.ram.pointageapp.service.impl.CollaborateurServiceImpl;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/collaborateurs")
public class CollaborateurController {

    private final CollaborateurService service;

    public CollaborateurController(CollaborateurService service) {
        this.service = service;
    }



    @GetMapping
    public Page<Collaborateur> getAll(Pageable pageable) {
        return service.getAll(pageable);
    }


    @GetMapping("/{id}")
    public Collaborateur getOne(@PathVariable Long id) {
        return service.getById(id);
    }


    @GetMapping("/by-idMachin/{idMachin}")
    public Collaborateur getByIdMachin(@PathVariable String idMachin) {
        return service.getByIdMachin(idMachin);
    }


    @PostMapping
    public ResponseEntity<Collaborateur> create(@Valid @RequestBody Collaborateur c) {
        Collaborateur saved = service.save(c);
        return ResponseEntity
                .created(URI.create("/api/collaborateurs/" + saved.getId()))
                .body(saved);
    }


    @PutMapping("/{id}")
    public Collaborateur update(@PathVariable Long id, @Valid @RequestBody Collaborateur c) {
        return service.update(id, c);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/search")
    public Page<Collaborateur> searchByNom(
            @RequestParam String nom,
            Pageable pageable
    ) {
        return service.searchByNom(nom, pageable);
    }

}
