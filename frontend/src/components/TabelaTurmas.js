function Tabela({ vetor }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Ano</th>
                    <th>Turno</th>
                    <th>Sala</th>
                    <th>Nivel de Ensino</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map((obj, indice) => (
                    <tr key={obj.id}>
                        <td>{indice + 1}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.ano}</td>
                        <td>{obj.turno}</td>
                        <td>{obj.sala}</td>
                        <td>{obj.nivel}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
