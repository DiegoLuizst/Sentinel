

function Tabela({ vetor }) {





    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Carga Horaria</th>
                    <th>Ações</th>
                </tr>
            </thead>


            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice + 1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.carga_horaria}</td>
                            <td><button className="btn"> Selecionar</button></td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Tabela;
