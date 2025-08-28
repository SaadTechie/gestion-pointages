package com.ram.pointageapp.controller;

import com.ram.pointageapp.dto.ChangePasswordRequest;
import com.ram.pointageapp.dto.JwtResponse;
import com.ram.pointageapp.dto.LoginRequest;
import com.ram.pointageapp.model.Admin;
import com.ram.pointageapp.repository.AdminRepository;
import com.ram.pointageapp.service.AuthService;
import com.ram.pointageapp.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AdminRepository adminRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthService authService;

    public AuthController(AdminRepository adminRepo, PasswordEncoder passwordEncoder, JwtService jwtService, AuthService authService) {
        this.adminRepo = adminRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Admin> adminOpt = adminRepo.findByEmail(request.getEmail());


        if (adminOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), adminOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }


        String token = jwtService.generateToken(adminOpt.get());


        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            authService.changePassword(request);
            return ResponseEntity.ok("Mot de passe changé avec succès ✅");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token manquant");
        }

        String token = authHeader.substring(7);
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token invalide ou expiré");
        }

        String email = jwtService.extractEmail(token);
        return ResponseEntity.ok("Connecté en tant que : " + email);
    }
}
