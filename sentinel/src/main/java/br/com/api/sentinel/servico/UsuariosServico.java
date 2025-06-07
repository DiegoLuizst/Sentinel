package br.com.api.sentinel.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.sentinel.modelo.RespostaModelo;
import br.com.api.sentinel.modelo.UsuariosModelo;
import br.com.api.sentinel.repositorio.UsuariosRepositorio;

@Service
public class UsuariosServico {

    @Autowired
    private UsuariosRepositorio ur;

    @Autowired
    private RespostaModelo rm;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Listar todos os usuários
    public Iterable<UsuariosModelo> listar() {
        return ur.findAll();
    }

    // Cadastrar ou alterar usuário
    public ResponseEntity<?> cadastrarAlterar(UsuariosModelo um, String acao) {
        if (um.getNome() == null || um.getNome().isEmpty()) {
            rm.setMensagem("O nome do usuário é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getEmail() == null || um.getEmail().isEmpty()) {
            rm.setMensagem("O email do usuário é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getSenha() == null || um.getSenha().isEmpty()) {
            rm.setMensagem("A senha do usuário é obrigatória!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getPermissaoGrupo() == null || um.getPermissaoGrupo().getId() == null) {
            rm.setMensagem("O grupo de permissões do usuário é obrigatório!");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        // Criptografa a senha antes de salvar (mesmo em alterações)
        String senhaHash = passwordEncoder.encode(um.getSenha());
        um.setSenha(senhaHash);

        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(ur.save(um), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(ur.save(um), HttpStatus.OK);
        }
    }

    // Remover usuário
    public ResponseEntity<RespostaModelo> remover(long id) {
        if (!ur.existsById(id)) {
            rm.setMensagem("Usuário não encontrado!");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        ur.deleteById(id);
        rm.setMensagem("Usuário excluído com sucesso!");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }
}
