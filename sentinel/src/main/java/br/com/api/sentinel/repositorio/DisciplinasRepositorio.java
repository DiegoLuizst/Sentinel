package br.com.api.sentinel.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.sentinel.modelo.DisciplinasModelo;

@Repository
public interface DisciplinasRepositorio extends CrudRepository<DisciplinasModelo, Long> {

}
