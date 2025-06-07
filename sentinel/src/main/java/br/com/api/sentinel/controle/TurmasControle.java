package br.com.api.sentinel.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.sentinel.modelo.RespostaModelo;
import br.com.api.sentinel.modelo.TurmasModelo;

import br.com.api.sentinel.servico.TurmasServico;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "*")
public class TurmasControle {

    @Autowired
    private TurmasServico ts;

    @GetMapping("/listar-turmas")
    public Iterable<TurmasModelo> listar() {
        return ts.listar();
    }

    @DeleteMapping("/remover-turma/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ts.remover(id);

    }

    @PutMapping("/alterar-turma")
    public ResponseEntity<?> alterar(@RequestBody TurmasModelo cm) {
        return ts.cadastrarAlterar(cm, "alterar");
    }

    @PostMapping("/cadastrar-turma")
    public ResponseEntity<?> cadastrar(@RequestBody TurmasModelo cm) {
        return ts.cadastrarAlterar(cm, "cadastrar");
    }

}
