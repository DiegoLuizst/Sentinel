package br.com.api.sentinel.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.sentinel.modelo.CargosModelo;
import br.com.api.sentinel.modelo.RespostaModelo;

import br.com.api.sentinel.servico.CargosServico;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "*")
public class CargosControle {

    @Autowired
    private CargosServico cs;

    @GetMapping("/listar-cargos")
    public Iterable<CargosModelo> listar() {
        return cs.listar();
    }

    @DeleteMapping("/remover-cargo/{id}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long id) {
        return cs.remover(id);

    }

    @PutMapping("/alterar-cargo")
    public ResponseEntity<?> alterar(@RequestBody CargosModelo cm) {
        return cs.cadastrarAlterar(cm, "alterar");
    }

    @PostMapping("/cadastrar-cargo")
    public ResponseEntity<?> cadastrar(@RequestBody CargosModelo cm) {
        return cs.cadastrarAlterar(cm, "cadastrar");
    }

}
