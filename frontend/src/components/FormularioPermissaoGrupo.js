function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, excluir, alterar, paginas }) {

    // Função auxiliar para gerar rótulo amigável
    const getLabel = (rota, metodo) => {
        let acao = "";
        switch (metodo) {
            case "GET": acao = "Visualizar"; break;
            case "POST": acao = "Inserir"; break;
            case "PUT": acao = "Alterar"; break;
            case "DELETE": acao = "Deletar"; break;
            default: acao = metodo;
        }

        // Capitaliza a primeira letra do recurso
        const recurso = rota.charAt(0).toUpperCase() + rota.slice(1);
        return `${acao} ${recurso}`;
    };

    // Lidar com mudança no checkbox
    const handleCheckboxChange = (e, pagina) => {
        const { checked } = e.target;
        const novasPermissoes = obj.permissoes ? [...obj.permissoes] : [];

        if (checked) {
            // Adiciona se ainda não existe
            if (!novasPermissoes.find(p => p.id === pagina.id)) {
                novasPermissoes.push({ id: pagina.id });
            }
        } else {
            // Remove se desmarcado
            const index = novasPermissoes.findIndex(p => p.id === pagina.id);
            if (index !== -1) novasPermissoes.splice(index, 1);
        }

        eventoTeclado({ target: { name: "permissoes", value: novasPermissoes } });
    };

    return (
        <form>
            <div className="card">
                <div className="card-header">Permissões do Grupo</div>
                <div className="card-body">
                    <div className="mb-3">
                        <label>Nome do Grupo</label>
                        <input
                            type="text"
                            value={obj.nome}
                            className="form-control"
                            onChange={eventoTeclado}
                            name="nome"
                        />
                    </div>

                    <div className="mb-3">
                        <label>Permissões</label>
                        <div className="row">
                            {paginas.map((p) => (
                                <div key={p.id} className="col-md-6">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`perm-${p.id}`}
                                            checked={obj.permissoes.some(perm => perm.id === p.id)}
                                            onChange={(e) => handleCheckboxChange(e, p)}
                                        />
                                        <label className="form-check-label" htmlFor={`perm-${p.id}`}>
                                            {getLabel(p.rota, p.metodoHttp)}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {botao ? (
                        <button type="button" className="btn btn-warning" onClick={cadastrar}>Cadastrar</button>
                    ) : (
                        <div className="card-action d-flex gap-2">
                            <button type="button" onClick={alterar} className="btn btn-warning" ><i className="fa fa-solid fa-pen"></i> Alterar</button>
                            <button type="button" onClick={excluir} className="btn btn-danger" ><i className="fa fa-solid fa-trash"></i> Excluir</button>
                            <button type="button" onClick={cancelar} className="btn btn-black" ><i className="fa fa-solid fa-ban"></i> Cancelar</button>


                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}

export default Formulario;
