
package com.ram.pointageapp.service;

import com.ram.pointageapp.dto.ChangePasswordRequest;
import com.ram.pointageapp.model.Admin;
import com.ram.pointageapp.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public void changePassword(ChangePasswordRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin introuvable"));


        if (!passwordEncoder.matches(request.getAncienMotDePasse(), admin.getPassword())) {
            throw new RuntimeException("Ancien mot de passe incorrect");
        }


        admin.setPassword(passwordEncoder.encode(request.getNouveauMotDePasse()));
        adminRepository.save(admin);
    }
}
