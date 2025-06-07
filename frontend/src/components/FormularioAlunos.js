import React from "react";
import { IMaskInput } from 'react-imask';

function Formulario({
    botao, eventoTeclado, cadastrar, obj, cancelar, excluir, alterar,
    desabilitarResp2, setDesabilitarResp2
}) {

    const DivisaoEstilizada = ({ titulo }) => (
        <div className="text-center my-4 position-relative">
            <hr />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 fw-bold">
                {titulo}
            </span>
        </div>
    );

    return (
        <form>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Cadastro de Aluno</div>
                        </div>
                        <div className="card-body">

                            {/* DADOS DO ALUNO */}
                            <h5>Dados do Aluno</h5>
                            <div className="row g-3">

                                <div className="col-md-3">
                                    <input type="text" className="form-control" name="nome"
                                        value={obj.nome} placeholder="Nome do Aluno" onChange={eventoTeclado} />
                                </div>

                                <div className="col-md-3">
                                    <input type="text" className="form-control" name="genero"
                                        value={obj.genero} placeholder="Gênero do Aluno" onChange={eventoTeclado} />
                                </div>

                                <div className="col-md-3">
                                    <input type="date" className="form-control" name="data"
                                        value={obj.data} onChange={eventoTeclado} />
                                </div>

                                <div className="col-md-3">
                                    <input type="text" className="form-control" name="endereco"
                                        value={obj.endereco} placeholder="Endereço" onChange={eventoTeclado} />
                                </div>

                                <div className="col-md-3">
                                    <IMaskInput
                                        mask="(00) 00000-0000"
                                        className="form-control"
                                        name="telefone"
                                        value={obj.telefone}
                                        placeholder="Telefone"
                                        onAccept={(value) => eventoTeclado({ target: { name: 'telefone', value } })}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <input type="email" className="form-control" name="email"
                                        value={obj.email} placeholder="Email" onChange={eventoTeclado} />
                                </div>
                            </div>

                            <DivisaoEstilizada titulo="Responsável 1" />

                            {/* RESPONSÁVEL 1 */}
                            <h5 className="mt-4">Dados do Responsável 1</h5>
                            <div className="row g-3">

                                <div className="col-md-3">
                                    <input type="text" className="form-control" name="nome_resp1"
                                        value={obj.nome_resp1} placeholder="Nome" onChange={eventoTeclado} />
                                </div>

                                <div className="col-md-3">
                                    <IMaskInput
                                        mask="000.000.000-00"
                                        className="form-control"
                                        name="cpf_resp1"
                                        value={obj.cpf_resp1}
                                        placeholder="CPF"
                                        onAccept={(value) => eventoTeclado({ target: { name: 'cpf_resp1', value } })}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <IMaskInput
                                        mask="(00) 00000-0000"
                                        className="form-control"
                                        name="telefone_resp1"
                                        value={obj.mesmoTelefoneAluno ? obj.telefone : obj.telefone_resp1}
                                        placeholder="Telefone"
                                        onAccept={(value) => eventoTeclado({ target: { name: 'telefone_resp1', value } })}
                                        disabled={obj.mesmoTelefoneAluno}
                                    />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="mesmoTelefoneAluno"
                                            name="mesmoTelefoneAluno"
                                            checked={obj.mesmoTelefoneAluno}
                                            onChange={eventoTeclado}
                                        />
                                        <label className="form-check-label" htmlFor="mesmoTelefoneAluno">
                                            Mesmo telefone do aluno
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email_resp1"
                                        value={obj.mesmoEmailAluno ? obj.email : obj.email_resp1}
                                        placeholder="Email"
                                        onChange={eventoTeclado}
                                        disabled={obj.mesmoEmailAluno}
                                    />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="mesmoEmailAluno"
                                            name="mesmoEmailAluno"
                                            checked={obj.mesmoEmailAluno}
                                            onChange={eventoTeclado}
                                        />
                                        <label className="form-check-label" htmlFor="mesmoEmailAluno">
                                            Mesmo email do aluno
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="endereco_resp1"
                                        value={obj.mesmoEnderecoAluno ? obj.endereco : obj.endereco_resp1}
                                        placeholder="Endereço"
                                        onChange={eventoTeclado}
                                        disabled={obj.mesmoEnderecoAluno}
                                    />
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="mesmoEnderecoAluno"
                                            name="mesmoEnderecoAluno"
                                            checked={obj.mesmoEnderecoAluno}
                                            onChange={eventoTeclado}
                                        />
                                        <label className="form-check-label" htmlFor="mesmoEnderecoAluno">
                                            Mesmo endereço do aluno
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="parentesco_resp1"
                                        value={obj.parentesco_resp1}
                                        placeholder="Parentesco"
                                        onChange={eventoTeclado}
                                    />
                                </div>
                            </div>

                            <DivisaoEstilizada titulo="Responsável 2" />

                            {/* RESPONSÁVEL 2 */}
                            <h5 className="mt-4">Dados do Responsável 2</h5>
                            <div className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="naoPossuiResp2"
                                    checked={desabilitarResp2}
                                    onChange={() => setDesabilitarResp2(!desabilitarResp2)}
                                />
                                <label className="form-check-label" htmlFor="naoPossuiResp2">
                                    Não possui responsável 2
                                </label>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nome_resp2"
                                        value={obj.nome_resp2}
                                        placeholder="Nome"
                                        onChange={eventoTeclado}
                                        disabled={desabilitarResp2}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <IMaskInput
                                        mask="(00) 00000-0000"
                                        className="form-control"
                                        name="telefone_resp2"
                                        value={obj.telefone_resp2}
                                        placeholder="Telefone"
                                        onAccept={(value) => eventoTeclado({ target: { name: 'telefone_resp2', value } })}
                                        disabled={desabilitarResp2}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email_resp2"
                                        value={obj.email_resp2}
                                        placeholder="Email"
                                        onChange={eventoTeclado}
                                        disabled={desabilitarResp2}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="parentesco_resp2"
                                        value={obj.parentesco_resp2}
                                        placeholder="Parentesco"
                                        onChange={eventoTeclado}
                                        disabled={desabilitarResp2}
                                    />
                                </div>
                            </div>

                            {/* AÇÕES */}
                            <div className="card-action d-flex gap-2 mt-4">
                                {
                                    botao ? (
                                        <button type="button" className="btn btn-warning" onClick={cadastrar}>
                                            <i className="fa fa-plus"></i> Cadastrar
                                        </button>
                                    ) : (
                                        <>
                                            <button type="button" className="btn btn-warning" onClick={alterar}>
                                                <i className="fa fa-pen"></i> Alterar
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={excluir}>
                                                <i className="fa fa-trash"></i> Excluir
                                            </button>
                                            <button type="button" className="btn btn-black" onClick={cancelar}>
                                                <i className="fa fa-ban"></i> Cancelar
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Formulario;
