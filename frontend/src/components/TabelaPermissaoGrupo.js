function Tabela({ vetor }) {
    return (
        <table className="table">
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
                    <tr key={grupo.id}>
                        <td>{index + 1}</td>
                        <td>{grupo.nome}</td>
                        <td>
                            {grupo.permissoes && grupo.permissoes.length > 0
                                ? grupo.permissoes.map((p) => p.nome).join(', ')
                                : 'Nenhuma'}
                        </td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
