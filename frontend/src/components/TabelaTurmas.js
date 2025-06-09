import { useRef, useEffect } from "react";
import useDataTable from "./hooks/useDataTable";

function Tabela({ vetor, selecionar }) {
    const tableRef = useRef(null);
    useDataTable(tableRef, vetor);

    useEffect(() => {
        console.log('TabelaTurmas - vetor atualizado:', vetor);
    }, [vetor]);


    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Lista de Turmas</h4>
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
                                            <th>Ano</th>
                                            <th>Turno</th>
                                            <th>Sala</th>
                                            <th>Nivel de Ensino</th>
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
                                                <td>{obj.ano}</td>
                                                <td>{obj.turno}</td>
                                                <td>{obj.sala}</td>
                                                <td>{obj.nivel}</td>


                                                <td>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            abrirModal(obj);
                                                        }}
                                                        className="btn btn-info"
                                                        title="Visualizar"
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </button>
                                                </td>
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
