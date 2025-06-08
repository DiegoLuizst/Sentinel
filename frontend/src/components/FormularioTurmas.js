function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, excluir, alterar }) {

    return (
        <form>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Turmas</div>
                        </div>
                        <div className="card-body">
                            <div className="row g-3"> {/* g-3 dá espaçamento entre os campos */}

                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        value={obj.nome}
                                        className="form-control"
                                        id="nome"
                                        placeholder="Nome"
                                        onChange={eventoTeclado}
                                        name="nome"
                                    />
                                </div>

                                <div className="col-md-2">
                                    <input
                                        type="text"
                                        value={obj.sala}
                                        className="form-control"
                                        id="sala"
                                        placeholder="Sala"
                                        onChange={eventoTeclado}
                                        name="sala"
                                    />
                                </div>



                                <div className="col-md-2">
                                    <select
                                        className="form-select"
                                        id="turno"
                                        name="turno"
                                        onChange={eventoTeclado}
                                        value={obj.turno || ''}
                                    >
                                        <option value="">Selecione o Turno</option>
                                        <option value="Manha">Manhã</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Noite">Noite</option>
                                    </select>
                                </div>



                                <div className="col-md-2 mt-3">
                                    <select
                                        className="form-select"
                                        id="nivel"
                                        name="nivel"
                                        onChange={eventoTeclado}
                                        value={obj.nivel || ''}
                                    >
                                        <option value="">Selecione o Nível de Ensino</option>
                                        <option value="Educação Infantil">Educação Infantil</option>
                                        <option value="Ensino Fundamental">Ensino Fundamental</option>
                                        <option value="Ensino Médio">Ensino Médio</option>
                                    </select>
                                </div>

                                <div className="col-md-2">
                                    <input
                                        type="text"
                                        value={obj.ano}
                                        className="form-control"
                                        id="ano"
                                        placeholder="Ano"
                                        onChange={eventoTeclado}
                                        name="ano"
                                    />
                                </div>






                                {
                                    botao
                                        ?
                                        <div className="card-action d-flex gap-2">
                                            <button type="button" className="btn btn-warning" onClick={cadastrar}><i className="fa fa-solid fa-plus"></i> Cadastrar</button>
                                        </div>
                                        :
                                        <div className="card-action d-flex gap-2">
                                            <button type="button" onClick={alterar} className="btn btn-warning" ><i className="fa fa-solid fa-pen"></i> Alterar</button>
                                            <button type="button" onClick={excluir} className="btn btn-danger" ><i className="fa fa-solid fa-trash"></i> Excluir</button>
                                            <button type="button" onClick={cancelar} className="btn btn-black" ><i className="fa fa-solid fa-ban"></i> Cancelar</button>


                                        </div>
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
