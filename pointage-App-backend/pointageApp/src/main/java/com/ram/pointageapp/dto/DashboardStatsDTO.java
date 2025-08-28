package com.ram.pointageapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardStatsDTO {
    private long totalUtilisateurs;
    private long pointagesAujourdhui;
    private long absences;

    public DashboardStatsDTO(long totalUtilisateurs, long pointagesAujourdhui, long absences) {
        this.totalUtilisateurs = totalUtilisateurs;
        this.pointagesAujourdhui = pointagesAujourdhui;
        this.absences = absences;
    }

    public long getTotalUtilisateurs() {
        return totalUtilisateurs;
    }

    public long getPointagesAujourdhui() {
        return pointagesAujourdhui;
    }

    public long getAbsences() {
        return absences;
    }
}
