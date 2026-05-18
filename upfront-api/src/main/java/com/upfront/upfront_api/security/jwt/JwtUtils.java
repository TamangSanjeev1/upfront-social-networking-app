package com.upfront.upfront_api.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-ms}")
    private long jwtExpirationMs;

    private SecretKey key() {
        byte[] keyBytes = jwtSecret.getBytes();
        // Ensure at least 256 bits
        byte[] paddedKey = new byte[32];
        System.arraycopy(keyBytes, 0, paddedKey, 0, Math.min(keyBytes.length, 32));
        return Keys.hmacShaKeyFor(paddedKey);
    }

    public String generateToken(String email, String name, String profileImage, String googleId, Long id) {
        return Jwts.builder()
                .subject(email)
                .claim("name", name)
                .claim("profileImage", profileImage)
                .claim("googleId", googleId)
                .claim("id", id)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key())
                .compact();
    }

    public String getEmailFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    public Long getId(String token) {

        Claims claims = parseClaims(token);

        return claims.get("id", Long.class);
    }

    public String getGoogleId(String token) {

        Claims claims = parseClaims(token);

        return claims.get("googleId", String.class);
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
