package br.com.api.sentinel.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import br.com.api.sentinel.modelo.UsuariosModelo;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(
            "Sentinelapp263093Sentinelapp263093Sentinelapp263093Sentinelapp263093".getBytes(StandardCharsets.UTF_8));

    private static final long EXPIRATION_TIME_MS = 86400000; // 1 dia

    /**
     * Gera um token JWT para o e-mail fornecido.
     */
    public String generateToken(UsuariosModelo usuario) {
        Map<String, Object> claims = new HashMap<>();

        // Dados básicos do usuário
        claims.put("nome", usuario.getNome());
        claims.put("email", usuario.getEmail());
        claims.put("grupo", usuario.getPermissaoGrupo().getNome());

        // Permissões do grupo (lista de objetos com nome, rota e metodoHttp)
        List<Map<String, String>> permissoes = usuario.getPermissaoGrupo().getPermissoes().stream()
                .map(p -> {
                    Map<String, String> perm = new HashMap<>();
                    perm.put("nome", p.getNome());
                    perm.put("rota", p.getRota());
                    perm.put("metodoHttp", p.getMetodoHttp());
                    return perm;
                }).collect(Collectors.toList());

        claims.put("permissoes", permissoes);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getEmail())
                .setIssuer("SentinelSystem")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256) // <-- Correção aqui
                .compact();

    }

    /**
     * Extrai o e-mail (subject) do token JWT.
     */
    public String extractEmail(String token) {
        try {
            String email = getClaims(token).getSubject();
            logger.debug("Email extraído do token: {}", email);
            return email;
        } catch (JwtException e) {
            logger.error("Erro ao extrair e-mail do token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Valida o token JWT verificando sua integridade e expiração.
     */
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            logger.info("Token JWT é válido.");
            return true;
        } catch (ExpiredJwtException e) {
            logger.warn("Token expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.warn("Token não suportado: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.warn("Token malformado: {}", e.getMessage());
        } catch (SecurityException e) {
            logger.warn("Falha na assinatura do token: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warn("Token vazio ou inválido: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("Erro ao validar token: {}", e.getMessage());
        }

        return false;
    }

    /**
     * Retorna os claims (dados) do token.
     */
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
