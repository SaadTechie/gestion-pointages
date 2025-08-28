package com.ram.pointageapp.repository;

import com.ram.pointageapp.model.Pointage;
import com.ram.pointageapp.model.Collaborateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PointageRepository extends JpaRepository<Pointage, Long> {


    @Query("SELECT p.date as date, COUNT(p) as nbPointages " +
            "FROM Pointage p " +
            "GROUP BY p.date " +
            "ORDER BY p.date DESC")
    List<Object[]> findDerniersPointagesRaw();
    @Query("SELECT COUNT(DISTINCT p.collaborateur.id) " +
            "FROM Pointage p " +
            "WHERE p.date = :date")
    long countCollaborateursPresents(LocalDate date);

    List<Pointage> findTop30ByCollaborateurOrderByDateDescHeureDesc(Collaborateur collab);
    Page<Pointage> findAll(Pageable pageable);
    Page<Pointage> findByCollaborateur_IdMachin(String idMachin, Pageable pageable);
    Page<Pointage> findByDate(LocalDate date, Pageable pageable);
    Page<Pointage> findByCollaborateur_IdMachinAndDate(String idMachin, LocalDate date, Pageable pageable);
}
