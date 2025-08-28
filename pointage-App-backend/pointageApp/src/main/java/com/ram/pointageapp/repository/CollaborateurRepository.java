// src/main/java/com/ram/pointageapp/repository/CollaborateurRepository.java
package com.ram.pointageapp.repository;

import com.ram.pointageapp.model.Collaborateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CollaborateurRepository extends JpaRepository<Collaborateur, Long> {
    Optional<Collaborateur> findByIdMachin(String idMachin);

    boolean existsByIdMachin(String idMachin);
    Page<Collaborateur> findByNomContainingIgnoreCase(String nom, Pageable pageable);

}
