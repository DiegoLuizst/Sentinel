import { useEffect, useState, useRef } from 'react';

import Formulario from '../components/FormularioCargos';
import Tabela from '../components/TabelaCargos';
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';

function Cargos() {

    //Objeto 
    const cargo = {
        id: null,
        nome: ''

    }

    //UseState
    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [cargos, setCargos] = useState([]);
    const [objCargos, setObjCargos] = useState(cargo);
    const [alertMsg, setAlertMsg] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");
    const confirmAction = useRef(() => {});



    //Dados Formulário
    const aoDigitar = (e) => {
        setObjCargos({ ...objCargos, [e.target.name]: e.target.value });


    }

    const showConfirm = (action, message) => {
        confirmAction.current = action;
        setConfirmMsg(message);
        window.$('#confirmCargo').modal('show');
    }


    //Cadastrar
    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar-cargo", {
            method: 'post',
            body: JSON.stringify(objCargos),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => {
                if (retorno_convertido.mensagem !== undefined) {
                    setAlertMsg(retorno_convertido.mensagem);
                } else {
                    // Atualiza a lista completa
                    fetch("http://localhost:8080/listar-cargos", {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(retorno => retorno.json())
                        .then(retorno_convertido => {
                            setCargos(retorno_convertido);
                            setAlertMsg("Cargo Cadastrado com sucesso!");
                            limparForm();
                        });
                }
            });
    };


    //Alterar
    const alterar = () => {
        fetch("http://localhost:8080/alterar-cargo", {
            method: 'put',
            body: JSON.stringify(objCargos),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }


        })

            .then(retorno => retorno.json())
            .then(retorno_convertido => {
                if (retorno_convertido.mensagem !== undefined) {
                    setAlertMsg(retorno_convertido.mensagem);
                } else {

                    setAlertMsg("Cargo Alterado com sucesso!");

                    //copia Vetor
                    let vetorTemp = [...cargos];

                    //indice

                    let indice = vetorTemp.findIndex((c) => {
                        return c.id === objCargos.id;
                    });

                    //alteração vetorTemp

                    vetorTemp[indice] = objCargos;

                    //Atualiza vetor principal

                    setCargos(vetorTemp);
                    limparForm();

                }
            })
    }


    //Excluir
    const excluir = () => {
        fetch("http://localhost:8080/remover-cargo/" + objCargos.id, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }


        })

            .then(retorno => retorno.json())
            .then(retorno_convertido => {
                //Mensagem

                setAlertMsg(retorno_convertido.mensagem);

                //copia Vetor
                let vetorTemp = [...cargos];

                //indice

                let indice = vetorTemp.findIndex((c) => {
                    return c.id === objCargos.id;
                });

                //exclusão vetorTemp

                vetorTemp.splice(indice, 1);

                //Atualiza vetor principal

                setCargos(vetorTemp);

                //Limpa formulario
                limparForm();


            })
    }

    // Função para limpar formulário
    const limparForm = () => {
        setObjCargos(cargo);
        setBtnCadastrar(true);
    }

    useEffect(() => {
        fetchWithAuth("/listar-cargos")
            .then(data => {
                console.log("Dados recebidos de /listar-cargos:", data);
                setCargos(data);
            })
            .catch(error => console.error("Erro ao buscar cargos:", error));
    }, []);



    //Selecionar
    const selecionarCargo = (indice) => {
        const cargoSelecionado = cargos[indice];


        setObjCargos({
            id: cargoSelecionado.id,
            nome: cargoSelecionado.nome
        });

        setBtnCadastrar(false);
    };

    const fetchWithAuth = async (url, options = {}) => {
        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(`http://localhost:8080${url}`, {
            ...defaultOptions,
            ...options
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Token inválido/expirado - redireciona para login
                window.location.href = "/login";
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    };






    //Retorno
    return (
        <>
            <Alert message={alertMsg} onClose={() => setAlertMsg("")} />
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                    <h3 className="fw-bold mb-3">Cadastro de Cargos</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Formulario
                        botao={btnCadastrar}
                        eventoTeclado={aoDigitar}
                        cadastrar={() => showConfirm(cadastrar, 'Deseja cadastrar o cargo?')}
                        obj={objCargos}
                        cancelar={limparForm}
                        excluir={() => showConfirm(excluir, 'Deseja excluir o cargo?')}
                        alterar={() => showConfirm(alterar, 'Deseja alterar o cargo?')}

                    />
                    <Tabela vetor={cargos} selecionar={selecionarCargo} />
                    <ConfirmModal id="confirmCargo" title="Confirmação" message={confirmMsg} onConfirm={() => confirmAction.current()} />
                </div>
            </div>
        </>
    );
}

export default Cargos;
