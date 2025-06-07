package br.com.api.sentinel.repositorio;

import br.com.api.sentinel.modelo.PermissaoPagina;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissaoPaginaRepositorio extends CrudRepository<PermissaoPagina, Long> {

}
