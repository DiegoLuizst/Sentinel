package br.com.api.sentinel.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.sentinel.modelo.UsuariosModelo;

@Repository
public interface UsuariosRepositorio extends CrudRepository<UsuariosModelo, Long> {
    Optional<UsuariosModelo> findByEmail(String email);

    List<UsuariosModelo> findByPermissaoGrupoId(Long permissaoGrupoId);
}
