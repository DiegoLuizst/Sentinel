import { useState, useEffect } from "react";

function Tabela({ vetor, selecionar }) {
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    useEffect(() => {
        console.log('TabelaUsuarios - vetor atualizado:', vetor);
    }, [vetor]);

    const abrirModal = (usuario) => {
        console.log('TabelaUsuarios - abrirModal:', usuario);
        setUsuarioSelecionado(usuario);
        if (window.$) {
            window.$("#modalVisualizarUsuario").modal("show");
        }
    };

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
                                        <tr key={obj.id} onClick={() => { selecionar(indice); }} style={{ cursor: 'pointer' }}>
                                            <td>{indice + 1}</td>
                                            <td>{obj.nome}</td>
                                            <td>{obj.email}</td>
                                            <td>{obj.permissaoGrupo.nome}</td>
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

        {/* Modal de visualização */}
        <div className="modal fade" id="modalVisualizarUsuario" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="fa fa-user me-2"></i>Detalhes do Usuário</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div className="modal-body">
                        {usuarioSelecionado && (
                            <div>
                                <p><strong>Nome:</strong> {usuarioSelecionado.nome}</p>
                                <p><strong>Email:</strong> {usuarioSelecionado.email}</p>
                                <p><strong>Permissão:</strong> {usuarioSelecionado.permissaoGrupo?.nome}</p>
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
