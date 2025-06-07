import { useEffect, useState } from "react";

function InfoItem({ icon, label, value }) {
    return (
        <div className="mb-2">
            <strong><i className={`fas fa-${icon} me-2`}></i>{label}:</strong> {value || "-"}
        </div>
    );
}

function formatarData(dataStr) {
    if (!dataStr) return "-";
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR");
}

function Tabela({ vetor, selecionar }) {
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);

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

    // Abre o modal e seta o aluno selecionado
    const abrirModal = (aluno) => {
        setAlunoSelecionado(aluno);
        // Abre modal com jQuery Bootstrap
        if (window.$) {
            window.$("#modalVisualizarAluno").modal("show");
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Lista de Alunos</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id="tabela" key={vetor.length} className="display table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Responsável</th>
                                            <th>Tel Resp1</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vetor.map((obj, indice) => (
                                            <tr key={obj.id} onClick={() => selecionar(indice)} style={{ cursor: 'pointer' }}>
                                                <td>{indice + 1}</td>
                                                <td>{obj.nome}</td>
                                                <td>{obj.nome_resp1} ({obj.parentesco_resp1})</td>
                                                <td>{obj.telefone_resp1}</td>
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

            {/* Modal com abas */}
            <div className="modal fade" id="modalVisualizarAluno" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><i className="fas fa-user-graduate me-2"></i>Detalhes do Aluno</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>
                        <div className="modal-body">
                            {alunoSelecionado ? (
                                <>
                                    <ul className="nav nav-tabs mb-3" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#tabAluno" type="button" role="tab">Aluno</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tabResp1" type="button" role="tab">Responsável 1</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tabResp2" type="button" role="tab">Responsável 2</button>
                                        </li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="tabAluno" role="tabpanel">
                                            <InfoItem icon="user" label="Nome" value={alunoSelecionado.nome} />
                                            <InfoItem icon="calendar" label="Data de Nascimento" value={formatarData(alunoSelecionado.data)} />
                                            <InfoItem icon="venus-mars" label="Gênero" value={alunoSelecionado.genero} />
                                            <InfoItem icon="home" label="Endereço" value={`${alunoSelecionado.rua}, ${alunoSelecionado.numero} - ${alunoSelecionado.bairro} - ${alunoSelecionado.cidade}/${alunoSelecionado.estado}`} />
                                            <InfoItem icon="phone" label="Telefone" value={alunoSelecionado.telefone} />
                                            <InfoItem icon="envelope" label="Email" value={alunoSelecionado.email} />
                                            <InfoItem icon="chalkboard-teacher" label="Turma" value={alunoSelecionado.turma?.nome} />
                                        </div>

                                        <div className="tab-pane fade" id="tabResp1" role="tabpanel">
                                            <InfoItem icon="user" label="Nome" value={alunoSelecionado.nome_resp1} />
                                            <InfoItem icon="phone" label="Telefone" value={alunoSelecionado.telefone_resp1} />
                                            <InfoItem icon="envelope" label="Email" value={alunoSelecionado.email_resp1} />
                                            <InfoItem icon="id-card" label="CPF" value={alunoSelecionado.cpf_resp1} />
                                            <InfoItem icon="map-marker-alt" label="Endereço" value={`${alunoSelecionado.rua_resp1}, ${alunoSelecionado.numero_resp1} - ${alunoSelecionado.bairro_resp1} - ${alunoSelecionado.cidade_resp1}/${alunoSelecionado.estado_resp1}`} />
                                            <InfoItem icon="users" label="Parentesco" value={alunoSelecionado.parentesco_resp1} />
                                        </div>

                                        <div className="tab-pane fade" id="tabResp2" role="tabpanel">
                                            <InfoItem icon="user" label="Nome" value={alunoSelecionado.nome_resp2} />
                                            <InfoItem icon="phone" label="Telefone" value={alunoSelecionado.telefone_resp2} />
                                            <InfoItem icon="envelope" label="Email" value={alunoSelecionado.email_resp2} />
                                            <InfoItem icon="id-card" label="CPF" value={alunoSelecionado.cpf_resp2} />
                                            <InfoItem icon="map-marker-alt" label="Endereço" value={`${alunoSelecionado.rua_resp2}, ${alunoSelecionado.numero_resp2} - ${alunoSelecionado.bairro_resp2} - ${alunoSelecionado.cidade_resp2}/${alunoSelecionado.estado_resp2}`} />
                                            <InfoItem icon="users" label="Parentesco" value={alunoSelecionado.parentesco_resp2} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p>Carregando...</p>
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
