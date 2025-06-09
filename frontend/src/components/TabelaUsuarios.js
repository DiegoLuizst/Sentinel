import { useRef, useEffect } from "react";
import useDataTable from "./hooks/useDataTable";

function Tabela({ vetor, selecionar }) {
    const tableRef = useRef(null);
    useDataTable(tableRef, vetor);

    useEffect(() => {
        console.log('TabelaUsuarios - vetor atualizado:', vetor);
    }, [vetor]);


    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Lista de Usuários</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table
                                    id="tabela"
                                    key={vetor.length}
                                    className="table table-striped table-hover"
                                    ref={tableRef}
                                >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Permissão</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vetor.map((obj, indice) => (
                                            <tr
                                                key={obj.id}
                                                onClick={() => {
                                                    selecionar(indice);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <td>{indice + 1}</td>
                                                <td>{obj.nome}</td>
                                                <td>{obj.email}</td>
                                                <td>{obj.permissaoGrupo.nome}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Tabela;
