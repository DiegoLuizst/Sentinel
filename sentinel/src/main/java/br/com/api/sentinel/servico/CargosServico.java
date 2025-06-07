package br.com.api.sentinel.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import br.com.api.sentinel.modelo.CargosModelo;
import br.com.api.sentinel.modelo.RespostaModelo;

import br.com.api.sentinel.repositorio.CargosRepositorio;

@Service
public class CargosServico {

    @Autowired
    private CargosRepositorio cr;

    @Autowired
    private RespostaModelo rm;

    // Listar todos
    public Iterable<CargosModelo> listar() {
        return cr.findAll();
    }

    // Cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(CargosModelo cm, String acao) {
        if (cm.getNome() == null || cm.getNome().isEmpty()) {
            rm.setMensagem("O nome do Cargo é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(cr.save(cm), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(cr.save(cm), HttpStatus.OK);
        }
    }

    // Remover usuário
    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!cr.existsById(id)) {
            rm.setMensagem("Cargo não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        cr.deleteById(id);
        rm.setMensagem("Cargo excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }
}
