import { useEffect, useState } from "react";

function Tabela({ vetor, selecionar }) {
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);

    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
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
                    tabela.DataTable().destroy();
                }
            }
        };
    }, [vetor]);

    const abrirModal = (turma) => {
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
                                className="display table table-striped table-hover"
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
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Ano</th>
                                        <th>Turno</th>
                                        <th>Sala</th>
                                        <th>Nivel de Ensino</th>
                                        <th>Ações</th>

                                    </tr>
                                </tfoot>
                                <tbody>
                                    {vetor.map((obj, indice) => (
                                        <tr key={indice} onClick={() => { selecionar(indice); }} style={{ cursor: 'pointer' }}>
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
