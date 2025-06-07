package br.com.api.sentinel.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

import br.com.api.sentinel.modelo.AlunosModelo;
import br.com.api.sentinel.modelo.RespostaModelo;

import br.com.api.sentinel.repositorio.AlunosRepositorio;

@Service
public class AlunosServico {

    @Autowired
    private AlunosRepositorio alunosRepositorio;

    @Autowired
    private RespostaModelo resposta;

    // Listar todos os alunos
    public Iterable<AlunosModelo> listar() {
        return alunosRepositorio.findAll();
    }

    // Cadastrar ou alterar aluno
    public ResponseEntity<?> cadastrarAlterar(AlunosModelo aluno, String acao) {

        // Validações principais
        if (aluno.getNome() == null || aluno.getNome().isEmpty()) {
            resposta.setMensagem("O nome do aluno é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getData() == null) {
            resposta.setMensagem("A data de nascimento é obrigatória!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getGenero() == null || aluno.getGenero().isEmpty()) {
            resposta.setMensagem("O gênero do aluno é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getEndereco() == null || aluno.getEndereco().isEmpty()) {
            resposta.setMensagem("O Endereço do aluno é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getTelefone() == null || aluno.getTelefone().isEmpty()) {
            resposta.setMensagem("O telefone do aluno é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);

            // Responsavel 1
        } else if (aluno.getNome_resp1() == null || aluno.getNome_resp1().isEmpty()) {
            resposta.setMensagem("O nome do responsável 1 é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getTelefone_resp1() == null || aluno.getTelefone_resp1().isEmpty()) {
            resposta.setMensagem("O telefone do responsável 1 é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getCpf_resp1() == null || aluno.getCpf_resp1().isEmpty()) {
            resposta.setMensagem("O CPF do responsável 1 é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getEndereco_resp1() == null || aluno.getEndereco_resp1().isEmpty()) {
            resposta.setMensagem("O Endereço do responsável 1 é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        } else if (aluno.getParentesco_resp1() == null || aluno.getParentesco_resp1().isEmpty()) {
            resposta.setMensagem("O Parentesco do responsável é obrigatório!");
            return new ResponseEntity<>(resposta, HttpStatus.BAD_REQUEST);
        }

        // Turma não é obrigatória aqui, pois será preenchida somente após matrícula
        // Não é obrigatorio tambem os cadastro de Email, e os dados de um segundo
        // responsavel

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(alunosRepositorio.save(aluno), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(alunosRepositorio.save(aluno), HttpStatus.OK);
        }
    }

    // Remover aluno
    public ResponseEntity<RespostaModelo> remover(Long id) {
        if (!alunosRepositorio.existsById(id)) {
            resposta.setMensagem("Aluno não encontrado!");
            return new ResponseEntity<>(resposta, HttpStatus.NOT_FOUND);
        }

        alunosRepositorio.deleteById(id);
        resposta.setMensagem("Aluno excluído com sucesso!");
        return new ResponseEntity<>(resposta, HttpStatus.OK);
    }
}
