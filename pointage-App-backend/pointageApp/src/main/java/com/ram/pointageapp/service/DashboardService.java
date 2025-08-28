package com.ram.pointageapp.service;

import com.ram.pointageapp.dto.DashboardStatsDTO;
import com.ram.pointageapp.dto.DernierPointageDTO;
import com.ram.pointageapp.repository.CollaborateurRepository;
import com.ram.pointageapp.repository.PointageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final CollaborateurRepository collaborateurRepo;
    private final PointageRepository pointageRepo;

    public DashboardService(CollaborateurRepository collaborateurRepo, PointageRepository pointageRepo) {
        this.collaborateurRepo = collaborateurRepo;
        this.pointageRepo = pointageRepo;
    }

    public DashboardStatsDTO getStats() {
        long totalUtilisateurs = collaborateurRepo.count();
        long pointagesAujourdhui = pointageRepo.countCollaborateursPresents(LocalDate.now());
        long absences = totalUtilisateurs - pointagesAujourdhui;

        return new DashboardStatsDTO(totalUtilisateurs, pointagesAujourdhui, absences);
    }

    public List<DernierPointageDTO> getDerniersPointages(int limit) {
        return pointageRepo.findDerniersPointagesRaw().stream()
                .limit(limit)
                .map(obj -> new DernierPointageDTO(
                        obj[0].toString(),
                        ((Number) obj[1]).longValue()
                ))
                .collect(Collectors.toList());
    }


}
