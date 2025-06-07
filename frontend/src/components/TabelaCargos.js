import { useState } from "react";

function Tabela({ vetor, selecionar }) {
    const [cargoSelecionado, setCargoSelecionado] = useState(null);

    const abrirModal = (cargo) => {
        setCargoSelecionado(cargo);
        if (window.$) {
            window.$("#modalVisualizarCargo").modal("show");
        }
    };

    return (
        <>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Lista de Cargos</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table
                                id="tabela"
                                key={vetor.length}
                                className="display table table-striped table-hover"
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Ações</th>

                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Ações</th>

                                    </tr>
                                </tfoot>
                                <tbody>
                                    {vetor.map((obj, indice) => (
                                        <tr key={obj.id} onClick={() => { selecionar(indice); }} style={{ cursor: 'pointer' }}>
                                            <td>{indice + 1}</td>
                                            <td>{obj.nome}</td>


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

        <div className="modal fade" id="modalVisualizarCargo" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="fa fa-briefcase me-2"></i>Detalhes do Cargo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div className="modal-body">
                        {cargoSelecionado && (
                            <p><strong>Nome:</strong> {cargoSelecionado.nome}</p>
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
