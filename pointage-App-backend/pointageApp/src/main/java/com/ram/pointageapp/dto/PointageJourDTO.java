package com.ram.pointageapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointageJourDTO {
    private  String heureEntree;
    private  String heureSortie;
    private  String date;

    public PointageJourDTO(String date, String heureEntree, String heureSortie) {
        this.date = date;
        this.heureEntree = heureEntree;
        this.heureSortie = heureSortie;
    }

}
