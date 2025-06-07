import { useEffect, useState } from "react";

function Tabela({ vetor, selecionar }) {
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = false;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        // Carrega todos os scripts na ordem necessária
        async function loadScriptsAndInitTable() {
            try {
                if (!window.$ || !window.$.fn.DataTable) {
                    await loadScript("/assets/js/core/jquery-3.7.1.min.js");
                    await loadScript("/assets/js/core/popper.min.js");
                    await loadScript("/assets/js/core/bootstrap.min.js");
                    await loadScript("/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js");
                    await loadScript("/assets/js/plugin/datatables/datatables.min.js");
                    await loadScript("/assets/js/kaiadmin.min.js");
                    await loadScript("/assets/js/setting-demo2.js");
                }

                // Aguarda renderizar DOM antes de aplicar o DataTable
                setTimeout(() => {
                    if (window.$ && window.$.fn.DataTable) {
                        const tabela = window.$("#tabela");
                        if (window.$.fn.DataTable.isDataTable(tabela)) {
                            tabela.DataTable().destroy();
                        }
                        tabela.DataTable({
                            language: {
                                sEmptyTable: "Nenhum registro encontrado",
                                sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                                sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
                                sInfoFiltered: "(Filtrados de _MAX_ registros)",
                                sLengthMenu: "_MENU_ resultados por página",
                                sLoadingRecords: "Carregando...",
                                sProcessing: "Processando...",
                                sZeroRecords: "Nenhum registro encontrado",
                                sSearch: "Pesquisar",
                                oPaginate: {
                                    sNext: "Próximo",
                                    sPrevious: "Anterior",
                                    sFirst: "Primeiro",
                                    sLast: "Último",
                                },
                                oAria: {
                                    sSortAscending: ": Ordenar colunas de forma ascendente",
                                    sSortDescending: ": Ordenar colunas de forma descendente",
                                },
                            },
                        });
                    }
                }, 0);
            } catch (err) {
                console.error("Erro ao carregar scripts:", err);
            }
        }

        loadScriptsAndInitTable();

        return () => {
            if (window.$ && window.$.fn.DataTable) {
                const tabela = window.$("#tabela");
                if (window.$.fn.DataTable.isDataTable(tabela)) {
                    tabela.DataTable().destroy(true);
                }
            }
        };
    }, [vetor]);

    const abrirModal = (usuario) => {
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
                                className="display table table-striped table-hover"
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
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Permissão</th>
                                        <th>Ações</th>
                                    </tr>
                                </tfoot>
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
