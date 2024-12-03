package hu.szarvas.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String secretKey = "Hello";

    public String generateToken(String username) {
        JwtBuilder jwt = Jwts.builder().subject(username).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, generateJwtSecretKey());
        return jwt.compact();
    }

    public SecretKey generateJwtSecretKey() {
        byte[] keyBytes = secretKey.getBytes();
        byte[] keyBytesPadded = new byte[32];
        System.arraycopy(keyBytes, 0, keyBytesPadded, 0, Math.min(keyBytes.length, 32));

        return Keys.hmacShaKeyFor(keyBytesPadded);
    }

    public boolean validateToken(String token, String username) {
        return (username.equals(getUsername(token)) && !isTokenExpired(token) );
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public Claims getClaims(String token) {
        return Jwts.parser().verifyWith(generateJwtSecretKey()).build().parseSignedClaims(token).getPayload();
    }
}
