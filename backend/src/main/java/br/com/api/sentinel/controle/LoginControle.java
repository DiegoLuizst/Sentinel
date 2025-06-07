package br.com.api.sentinel.controle;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.sentinel.DTO.LoginRequest;
import br.com.api.sentinel.DTO.LoginResponse;
import br.com.api.sentinel.modelo.UsuariosModelo;
import br.com.api.sentinel.repositorio.UsuariosRepositorio;
import br.com.api.sentinel.security.JwtUtil;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "*")
public class LoginControle {

    @Autowired
    private UsuariosRepositorio usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<UsuariosModelo> usuarioOpt = usuarioRepository.findByEmail(loginRequest.getEmail());

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
        }

        UsuariosModelo usuario = usuarioOpt.get();

        if (!passwordEncoder.matches(loginRequest.getSenha(), usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha inválida");
        }

        String token = jwtUtil.generateToken(usuario);

        // Você pode retornar um DTO com mais dados se quiser
        return ResponseEntity.ok(new LoginResponse(token));
    }

}
