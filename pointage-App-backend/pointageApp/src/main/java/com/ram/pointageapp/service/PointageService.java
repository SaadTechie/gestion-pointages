package com.ram.pointageapp.service;

import com.ram.pointageapp.dto.PointageJourDTO;
import com.ram.pointageapp.model.Collaborateur;
import com.ram.pointageapp.model.Pointage;
import com.ram.pointageapp.model.TypePointage;
import com.ram.pointageapp.repository.PointageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PointageService {

    private final PointageRepository pointageRepo;

    public PointageService(PointageRepository pointageRepo) {
        this.pointageRepo = pointageRepo;
    }

    public Pointage enregistrerPointage(Collaborateur collaborateur, TypePointage type) {
        Pointage pointage = new Pointage(
            LocalDate.now(),
            LocalTime.now(),
            type,
            collaborateur
        );
        return pointageRepo.save(pointage);
    }

    public List<PointageJourDTO> getDerniersPointages(Collaborateur collab, int limit) {

        List<Pointage> pointages = pointageRepo
                .findTop30ByCollaborateurOrderByDateDescHeureDesc(collab);


        Map<LocalDate, List<Pointage>> grouped = pointages.stream()
                .collect(Collectors.groupingBy(Pointage::getDate));

        List<PointageJourDTO> result = new ArrayList<>();


        LocalDate today = LocalDate.now();
        for (int i = 0; i < limit; i++) {
            LocalDate date = today.minusDays(i);

            List<Pointage> list = grouped.getOrDefault(date, Collections.emptyList());

            String heureEntree = list.stream()
                    .filter(p -> p.getType() == TypePointage.Entree)
                    .map(p -> p.getHeure().toString())
                    .findFirst()
                    .orElse(null);

            String heureSortie = list.stream()
                    .filter(p -> p.getType() == TypePointage.Sortie)
                    .map(p -> p.getHeure().toString())
                    .findFirst()
                    .orElse(null);

            result.add(new PointageJourDTO(date.toString(), heureEntree, heureSortie));
        }

        return result;
    }




}
