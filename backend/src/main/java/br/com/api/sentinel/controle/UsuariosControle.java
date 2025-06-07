package br.com.api.sentinel.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.sentinel.modelo.RespostaModelo;
import br.com.api.sentinel.modelo.UsuariosModelo;
import br.com.api.sentinel.servico.UsuariosServico;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "*")
public class UsuariosControle {

    @Autowired
    private UsuariosServico us;

    @GetMapping("/listar-users")
    public Iterable<UsuariosModelo> listar() {
        return us.listar();
    }

    @DeleteMapping("/remover-user/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return us.remover(id);

    }

    @PutMapping("/alterar-user")
    public ResponseEntity<?> alterar(@RequestBody UsuariosModelo um) {
        return us.cadastrarAlterar(um, "alterar");
    }

    @PostMapping("/cadastrar-user")
    public ResponseEntity<?> cadastrar(@RequestBody UsuariosModelo um) {
        return us.cadastrarAlterar(um, "cadastrar");
    }

}
