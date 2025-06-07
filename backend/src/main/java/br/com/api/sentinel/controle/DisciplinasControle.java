package br.com.api.sentinel.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.sentinel.modelo.DisciplinasModelo;
import br.com.api.sentinel.modelo.RespostaModelo;

import br.com.api.sentinel.servico.DisciplinasServico;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "*")
public class DisciplinasControle {

    @Autowired
    private DisciplinasServico ds;

    @GetMapping("/listar-disciplinas")
    public Iterable<DisciplinasModelo> listar() {
        return ds.listar();
    }

    @DeleteMapping("/remover-disciplina/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return ds.remover(id);

    }

    @PutMapping("/alterar-disciplina")
    public ResponseEntity<?> alterar(@RequestBody DisciplinasModelo dm) {
        return ds.cadastrarAlterar(dm, "alterar");
    }

    @PostMapping("/cadastrar-disciplina")
    public ResponseEntity<?> cadastrar(@RequestBody DisciplinasModelo dm) {
        return ds.cadastrarAlterar(dm, "cadastrar");
    }

}
