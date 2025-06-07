package br.com.api.sentinel.controle;

import br.com.api.sentinel.modelo.PermissaoGrupo;
import br.com.api.sentinel.modelo.RespostaModelo;
import br.com.api.sentinel.servico.PermissaoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class PermissaoControle {

    @Autowired
    private PermissaoServico permissaoServico;

    // Listar todos os grupos de permissão
    @GetMapping("/listar-permissoes-grupo")
    public Iterable<PermissaoGrupo> listar() {
        return permissaoServico.listar();
    }

    // Cadastrar novo grupo de permissão
    @PostMapping("/cadastrar-permissao-grupo")
    public ResponseEntity<?> cadastrar(@RequestBody PermissaoGrupo grupo) {
        return permissaoServico.cadastrarAlterar(grupo, "cadastrar");
    }

    // Alterar grupo de permissão existente
    @PutMapping("/alterar-permissao-grupo")
    public ResponseEntity<?> alterar(@RequestBody PermissaoGrupo grupo) {
        return permissaoServico.cadastrarAlterar(grupo, "alterar");
    }

    // Remover grupo de permissão por ID
    @DeleteMapping("/remover-permissao-grupo/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return permissaoServico.remover(id);
    }
}
