package com.ram.pointageapp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DernierPointageDTO {
    private String date;
    private String entree;
    private String sortie;
    private long nbPointages;

    public DernierPointageDTO(String date, long nbPointages) {
        this.date = date;
        this.nbPointages = nbPointages;
    }

    public DernierPointageDTO(String date, String entree, String sortie) {
        this.date = date;
        this.entree = entree;
        this.sortie = sortie;
    }

}
