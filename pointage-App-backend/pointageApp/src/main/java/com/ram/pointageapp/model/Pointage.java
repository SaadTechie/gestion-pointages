package com.ram.pointageapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "pointages")
public class Pointage {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(name = "date_pointage", nullable = false)
    private LocalDate date;

    @Setter
    @Getter
    @Column(name = "heure", nullable = false)
    private LocalTime heure;

    @Setter
    @Getter
    @Enumerated(EnumType.STRING)
    @Column(name = "type_pointage", nullable = false)
    private TypePointage typePointage;

    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collaborateur_id", nullable = false)
    private Collaborateur collaborateur;

    // 🔹 Constructeurs
    public Pointage() {}

    public Pointage(LocalDate date, LocalTime heure, TypePointage typePointage, Collaborateur collaborateur) {
        this.date = date;
        this.heure = heure;
        this.typePointage = typePointage;
        this.collaborateur = collaborateur;
    }
    @Transient
    @JsonProperty("dateTime")
    public LocalDateTime getDateTime() {
        if (date != null && heure != null) {
            return LocalDateTime.of(date, heure);
        }
        return null;
    }
    public TypePointage getType() {
        return typePointage;
    }


}
