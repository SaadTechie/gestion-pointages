package com.ram.pointageapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
        name = "collaborateurs",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_collaborateur_id_machin", columnNames = "id_machin")
        }
)
public class Collaborateur {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @NotBlank
    @Column(nullable = false, length = 100)
    private String nom;

    @Setter
    @Getter
    @NotBlank
    @Column(nullable = false, length = 100)
    private String prenom;

    @Setter
    @Getter
    @Email
    @NotBlank
    @Column(nullable = false, length = 180)
    private String email;

    @Setter
    @Getter
    @NotBlank
    @Column(length = 120)
    private String poste;

    @Setter
    @Getter
    @Column(nullable = false)
    private boolean active = true;

    @Setter
    @Getter
    @NotBlank
    @Column(name = "id_machin", nullable = false, length = 50, unique = true)
    private String idMachin;

    public Collaborateur() {}

    public Collaborateur(Long id, String nom, String prenom, String email, String poste, boolean active, String idMachin) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.poste = poste;
        this.active = active;
        this.idMachin = idMachin;
    }



}
