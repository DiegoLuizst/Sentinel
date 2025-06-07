function Formulario({ botao, eventoTeclado, cadastrar, obj, cancelar, excluir, alterar }) {

    return (
        <form>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Cargos</div>
                        </div>
                        <div className="card-body">
                            <div className="row g-3"> {/* g-3 dá espaçamento entre os campos */}

                                <div className="col-md-12">
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






                                {
                                    botao
                                        ?
                                        <div class="card-action d-flex gap-2">
                                            <button type="button" class="btn btn-warning" onClick={cadastrar}><i class="fa fa-solid fa-plus"></i> Cadastrar</button>
                                        </div>
                                        :
                                        <div class="card-action d-flex gap-2">
                                            <button type="button" onClick={alterar} class="btn btn-warning" ><i class="fa fa-solid fa-pen"></i> Alterar</button>
                                            <button type="button" onClick={excluir} class="btn btn-danger" ><i class="fa fa-solid fa-trash"></i> Excluir</button>
                                            <button type="button" onClick={cancelar} class="btn btn-black" ><i class="fa fa-solid fa-ban"></i> Cancelar</button>


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
