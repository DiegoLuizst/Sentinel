function Tabela({ vetor }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Responsável</th>
                    <th>Tel Resp1</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map((obj, indice) => (
                    <tr key={obj.id}>
                        <td>{indice + 1}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.nome_resp1} ({obj.parentesco_resp1})</td>
                        <td>{obj.telefone_resp1}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
