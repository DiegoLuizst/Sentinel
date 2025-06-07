function Tabela({ vetor, selecionar }) {
    return (
        <div className="card">
            <div className="card-header">Grupos e Permissões</div>
            <div className="card-body table-responsive">
                <table className="table table-striped table-hover" id="tabela">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome do Grupo</th>
                            <th>Permissões</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vetor.map((grupo, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{grupo.nome}</td>
                                <td>
                                    {grupo.permissoes && grupo.permissoes.length > 0
                                        ? grupo.permissoes.map(p => p.nome).join(", ")
                                        : 'Nenhuma'}
                                </td>
                                <td>
                                    <button onClick={() => selecionar(index)} className="btn btn-sm btn-warning">Selecionar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tabela;
