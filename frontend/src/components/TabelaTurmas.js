import { useState, useRef, useEffect } from "react";
import useDataTable from "./hooks/useDataTable";

function Tabela({ vetor, selecionar }) {
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const tableRef = useRef(null);
    useDataTable(tableRef, vetor);

    useEffect(() => {
        console.log('TabelaTurmas - vetor atualizado:', vetor);
    }, [vetor]);

    const abrirModal = (turma) => {
        console.log('TabelaTurmas - abrirModal:', turma);
        setTurmaSelecionada(turma);
        if (window.$) {
            window.$("#modalVisualizarTurma").modal("show");
        }
    };

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
                                        <tr key={obj.id} onClick={() => { selecionar(indice); }} style={{ cursor: 'pointer' }}>
                                            <td>{indice + 1}</td>
                                            <td>{obj.nome}</td>
                                            <td>{obj.ano}</td>
                                            <td>{obj.turno}</td>
                                            <td>{obj.sala}</td>
                                            <td>{obj.nivel}</td>


                                            <td>
                                                <button onClick={(e) => { e.stopPropagation(); abrirModal(obj); }} className="btn btn-info" title="Visualizar"><i className="fa fa-eye"></i></button>
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

        <div className="modal fade" id="modalVisualizarTurma" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="fa fa-users me-2"></i>Detalhes da Turma</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div className="modal-body">
                        {turmaSelecionada && (
                            <div>
                                <p><strong>Nome:</strong> {turmaSelecionada.nome}</p>
                                <p><strong>Ano:</strong> {turmaSelecionada.ano}</p>
                                <p><strong>Turno:</strong> {turmaSelecionada.turno}</p>
                                <p><strong>Sala:</strong> {turmaSelecionada.sala}</p>
                                <p><strong>Nível de Ensino:</strong> {turmaSelecionada.nivel}</p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Tabela;
