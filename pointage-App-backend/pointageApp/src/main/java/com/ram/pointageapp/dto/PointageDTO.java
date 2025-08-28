package com.ram.pointageapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointageDTO {
    private long id;
    private String nom;
    private String prenom;
    private String idMachin;
    private String date;
    private String heure;
    private String statut;
    public PointageDTO(Long id, String nom, String prenom, String idMachin,
                       String date, String heure, String statut) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.idMachin = idMachin;
        this.date = date;
        this.heure = heure;
        this.statut = statut;
    }

}
