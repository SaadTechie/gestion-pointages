package com.ram.pointageapp.controller;

import com.ram.pointageapp.dto.DashboardStatsDTO;
import com.ram.pointageapp.dto.DernierPointageDTO;
import com.ram.pointageapp.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    @GetMapping("/derniers-pointages")
    public ResponseEntity<List<DernierPointageDTO>> getDerniersPointages(
            @RequestParam(defaultValue = "3") int limit) {
        return ResponseEntity.ok(dashboardService.getDerniersPointages(limit));
    }
}
