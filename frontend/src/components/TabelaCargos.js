function Tabela({ vetor }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map((obj, indice) => (
                    <tr key={obj.id}>
                        <td>{indice + 1}</td>
                        <td>{obj.nome}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
