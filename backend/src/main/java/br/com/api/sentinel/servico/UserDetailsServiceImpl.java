package br.com.api.sentinel.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;

import br.com.api.sentinel.modelo.UsuariosModelo;
import br.com.api.sentinel.repositorio.UsuariosRepositorio;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

        @Autowired
        private UsuariosRepositorio usuarioRepository;

        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                UsuariosModelo usuario = usuarioRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

                return new org.springframework.security.core.userdetails.User(
                                usuario.getEmail(),
                                usuario.getSenha(),
                                usuario.getPermissaoGrupo().getPermissoes().stream()
                                                .map(p -> new SimpleGrantedAuthority(p.getNome())) // ou p.getNome()

                                                .collect(Collectors.toList()));
        }
}
