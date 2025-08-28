package com.ram.pointageapp.service;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {


    private static final String SECRET_KEY = "ma_cle_secrete_ultra_longue_pour_signature_256bits";


    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 2;

    private final Key key;

    public JwtService() {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }


    public String generateToken(Object user) {
        com.ram.pointageapp.model.Admin admin = (com.ram.pointageapp.model.Admin) user;

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", "ADMIN");

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(admin.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }



    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    public String extractEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}
