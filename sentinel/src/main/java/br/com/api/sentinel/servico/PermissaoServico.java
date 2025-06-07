package br.com.api.sentinel.servico;

import br.com.api.sentinel.modelo.PermissaoGrupo;
import br.com.api.sentinel.modelo.RespostaModelo;
import br.com.api.sentinel.modelo.UsuariosModelo;
import br.com.api.sentinel.repositorio.PermissaoRepositorio;
import br.com.api.sentinel.repositorio.UsuariosRepositorio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PermissaoServico {

    @Autowired
    private PermissaoRepositorio permissaoRepositorio;

    @Autowired
    private RespostaModelo respostaModelo;

    @Autowired
    private UsuariosRepositorio usuariosRepositorio;

    // Listar todas as permissões cadastradas
    public Iterable<PermissaoGrupo> listar() {
        return permissaoRepositorio.findAll();
    }

    // Cadastrar ou alterar uma permissão
    public ResponseEntity<?> cadastrarAlterar(PermissaoGrupo grupo, String acao) {
        if (grupo.getNome() == null || grupo.getNome().trim().isEmpty()) {
            respostaModelo.setMensagem("O nome da permissão é obrigatório.");
            return new ResponseEntity<>(respostaModelo, HttpStatus.BAD_REQUEST);
        }

        // Aqui, assumimos que o frontend já envia as páginas selecionadas vinculadas no
        // objeto grupo
        if (acao.equalsIgnoreCase("cadastrar")) {
            return new ResponseEntity<>(permissaoRepositorio.save(grupo), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(permissaoRepositorio.save(grupo), HttpStatus.OK);
        }
    }

    // Remover uma permissão por ID
    public ResponseEntity<RespostaModelo> remover(long id) {
        // Verifica se existem usuários vinculados a este grupo
        List<UsuariosModelo> usuariosVinculados = usuariosRepositorio.findByPermissaoGrupoId(id);

        if (!usuariosVinculados.isEmpty()) {
            respostaModelo.setMensagem("Não foi possível excluir a permissão. Existem usuários vinculados a ela.");
            return new ResponseEntity<>(respostaModelo, HttpStatus.BAD_REQUEST);
        }

        try {
            permissaoRepositorio.deleteById(id);
            respostaModelo.setMensagem("Permissão removida com sucesso!");
            return new ResponseEntity<>(respostaModelo, HttpStatus.OK);
        } catch (Exception e) {
            respostaModelo.setMensagem("Erro ao remover permissão: " + e.getMessage());
            return new ResponseEntity<>(respostaModelo, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
