package br.com.api.sentinel.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.sentinel.modelo.CargosModelo;

@Repository
public interface CargosRepositorio extends CrudRepository<CargosModelo, Long> {

}
