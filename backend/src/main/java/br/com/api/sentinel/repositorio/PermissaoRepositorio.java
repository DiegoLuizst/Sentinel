package br.com.api.sentinel.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.sentinel.modelo.PermissaoGrupo;

@Repository
public interface PermissaoRepositorio extends CrudRepository<PermissaoGrupo, Long> {

}
