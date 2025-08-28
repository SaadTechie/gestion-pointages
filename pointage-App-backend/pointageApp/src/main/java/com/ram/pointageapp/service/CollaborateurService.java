
package com.ram.pointageapp.service;

import com.ram.pointageapp.model.Collaborateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CollaborateurService {
    Page<Collaborateur> getAll(Pageable pageable);
    Collaborateur getById(Long id);
    Collaborateur getByIdMachin(String idMachin);
    Collaborateur save(Collaborateur c);
    Collaborateur update(Long id, Collaborateur c);
    void delete(Long id);
    Page<Collaborateur> searchByNom(String nom, Pageable pageable);
}
