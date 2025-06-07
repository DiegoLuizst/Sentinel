package br.com.api.sentinel.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.sentinel.modelo.AlunosModelo;
import br.com.api.sentinel.modelo.RespostaModelo;

import br.com.api.sentinel.servico.AlunosServico;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "*")
public class AlunosControle {

    @Autowired
    private AlunosServico alunosServico;

    // Listar todos os alunos
    @GetMapping("/listar-alunos")
    public Iterable<AlunosModelo> listar() {
        return alunosServico.listar();
    }

    // Remover aluno por ID
    @DeleteMapping("/remover-aluno/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable Long id) {
        return alunosServico.remover(id);
    }

    // Alterar aluno existente
    @PutMapping("/alterar-aluno")
    public ResponseEntity<?> alterar(@RequestBody AlunosModelo aluno) {
        return alunosServico.cadastrarAlterar(aluno, "alterar");
    }

    // Cadastrar novo aluno
    @PostMapping("/cadastrar-aluno")
    public ResponseEntity<?> cadastrar(@RequestBody AlunosModelo aluno) {
        return alunosServico.cadastrarAlterar(aluno, "cadastrar");
    }

}
