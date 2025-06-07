import { useState } from "react";

function Tabela({ vetor, selecionar }) {
    const [grupoSelecionado, setGrupoSelecionado] = useState(null);

    const abrirModal = (grupo) => {
        setGrupoSelecionado(grupo);
        if (window.$) {
            window.$("#modalVisualizarGrupo").modal("show");
        }
    };
    return (
        <>
        <div className="card">
            <div className="card-header">Grupos e Permissões</div>
            <div className="card-body table-responsive">
                <table className="table table-striped table-hover" id="tabela">
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
                            <tr key={index} onClick={() => selecionar(index)} style={{ cursor: 'pointer' }}>
                                <td>{index + 1}</td>
                                <td>{grupo.nome}</td>
                                <td>
                                    {grupo.permissoes && grupo.permissoes.length > 0
                                        ? grupo.permissoes.map(p => p.nome).join(', ')
                                        : 'Nenhuma'}
                                </td>
                                <td>
                                    <button onClick={(e) => { e.stopPropagation(); abrirModal(grupo); }} className="btn btn-sm btn-info" title="Visualizar"><i className="fa fa-eye"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="modal fade" id="modalVisualizarGrupo" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="fa fa-users me-2"></i>Detalhes do Grupo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div className="modal-body">
                        {grupoSelecionado && (
                            <div>
                                <p><strong>Nome:</strong> {grupoSelecionado.nome}</p>
                                <p><strong>Permissões:</strong> {grupoSelecionado.permissoes && grupoSelecionado.permissoes.length > 0 ? grupoSelecionado.permissoes.map(p => p.nome).join(', ') : 'Nenhuma'}</p>
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
