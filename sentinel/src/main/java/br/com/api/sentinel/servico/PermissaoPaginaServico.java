package br.com.api.sentinel.servico;

import br.com.api.sentinel.modelo.PermissaoPagina;
import br.com.api.sentinel.repositorio.PermissaoPaginaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PermissaoPaginaServico {

    @Autowired
    private PermissaoPaginaRepositorio repositorio;

    public Iterable<PermissaoPagina> listarTodas() {
        return repositorio.findAll();
    }
}
