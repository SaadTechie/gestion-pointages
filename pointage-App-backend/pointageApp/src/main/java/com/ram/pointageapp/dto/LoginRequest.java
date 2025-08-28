package com.ram.pointageapp.dto;

import lombok.Getter;

public class LoginRequest {
    @Getter
    private String email;
    private String password;

    public CharSequence getPassword() {
        return password;
    }
}
