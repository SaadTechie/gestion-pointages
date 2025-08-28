package com.ram.pointageapp.service.impl;

import com.ram.pointageapp.model.Collaborateur;
import com.ram.pointageapp.repository.CollaborateurRepository;
import com.ram.pointageapp.service.CollaborateurService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CollaborateurServiceImpl implements CollaborateurService {

    private final CollaborateurRepository repo;

    public CollaborateurServiceImpl(CollaborateurRepository repo) {
        this.repo = repo;
    }

    @Override
    public Page<Collaborateur> getAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Override
    public Collaborateur getById(Long id) {
        return repo.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Collaborateur " + id + " introuvable"));
    }

    @Override
    public Collaborateur getByIdMachin(String idMachin) {
        return repo.findByIdMachin(idMachin).orElseThrow(() ->
                new EntityNotFoundException("Collaborateur avec idMachin " + idMachin + " introuvable"));
    }

    @Override
    public Collaborateur save(Collaborateur c) {
        return repo.save(c);
    }

    @Override
    public Collaborateur update(Long id, Collaborateur c) {
        Collaborateur existing = getById(id);
        existing.setNom(c.getNom());
        existing.setPrenom(c.getPrenom());
        existing.setEmail(c.getEmail());
        existing.setPoste(c.getPoste());
        existing.setActive(c.isActive());
        existing.setIdMachin(c.getIdMachin());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Collaborateur " + id + " introuvable");
        }
        repo.deleteById(id);
    }

    @Override
    public Page<Collaborateur> searchByNom(String nom, Pageable pageable) {
        return repo.findByNomContainingIgnoreCase(nom, pageable);
    }
}
