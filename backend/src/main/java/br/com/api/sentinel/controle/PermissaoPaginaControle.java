package br.com.api.sentinel.controle;

import br.com.api.sentinel.modelo.PermissaoPagina;
import br.com.api.sentinel.servico.PermissaoPaginaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class PermissaoPaginaControle {

    @Autowired
    private PermissaoPaginaServico servico;

    @GetMapping("/listar-permissoes-pagina")
    public Iterable<PermissaoPagina> listarPermissoes() {
        return servico.listarTodas();
    }
}
