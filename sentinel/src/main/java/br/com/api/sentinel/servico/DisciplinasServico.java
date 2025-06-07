package br.com.api.sentinel.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import br.com.api.sentinel.modelo.DisciplinasModelo;
import br.com.api.sentinel.modelo.RespostaModelo;

import br.com.api.sentinel.repositorio.DisciplinasRepositorio;

@Service
public class DisciplinasServico {

    @Autowired
    private DisciplinasRepositorio dr;

    @Autowired
    private RespostaModelo rm;

    // Listar todos
    public Iterable<DisciplinasModelo> listar() {
        return dr.findAll();
    }

    // Cadastrar ou alterar usuário
    public ResponseEntity<?> cadastrarAlterar(DisciplinasModelo dm, String acao) {
        if (dm.getNome() == null || dm.getNome().isEmpty()) {
            rm.setMensagem("O nome da disciplina é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (dm.getCarga_horaria() == null || dm.getCarga_horaria().isEmpty()) {
            rm.setMensagem("A carga horária da disciplina é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(dr.save(dm), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(dr.save(dm), HttpStatus.OK);
        }
    }

    // Remover usuário
    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!dr.existsById(id)) {
            rm.setMensagem("Disciplina não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        dr.deleteById(id);
        rm.setMensagem("Disciplina excluída com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }
}
