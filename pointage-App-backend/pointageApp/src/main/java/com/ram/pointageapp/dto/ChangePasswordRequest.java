
package com.ram.pointageapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private String email;
    private String ancienMotDePasse;
    private String nouveauMotDePasse;
}
