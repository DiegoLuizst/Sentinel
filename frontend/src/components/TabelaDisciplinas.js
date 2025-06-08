import { useState } from "react";

function Tabela({ vetor, selecionar }) {
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

    const abrirModal = (disciplina) => {
        setDisciplinaSelecionada(disciplina);
        if (window.$) {
            window.$("#modalVisualizarDisciplina").modal("show");
        }
    };

    return (
        <>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Lista de Disciplinas</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table
                                id="tabela"
                                key={vetor.length}
                                className="table table-striped table-hover"
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Carga Horaria</th>
                                        <th>Ações</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {vetor.map((obj, indice) => (
                                        <tr key={obj.id} onClick={() => { selecionar(indice); }} style={{ cursor: 'pointer' }}>
                                            <td>{indice + 1}</td>
                                            <td>{obj.nome}</td>
                                            <td>{obj.carga_horaria}</td>

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

        <div className="modal fade" id="modalVisualizarDisciplina" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="fa fa-book me-2"></i>Detalhes da Disciplina</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div className="modal-body">
                        {disciplinaSelecionada && (
                            <div>
                                <p><strong>Nome:</strong> {disciplinaSelecionada.nome}</p>
                                <p><strong>Carga Horária:</strong> {disciplinaSelecionada.carga_horaria}</p>
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
