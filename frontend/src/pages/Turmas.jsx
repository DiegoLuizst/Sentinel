import { useEffect, useState, useRef } from 'react';

import Formulario from '../components/FormularioTurmas';
import Tabela from '../components/TabelaTurmas';
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';

function Turmas() {

    //Objeto 
    const turma = {
        id: null,
        nome: '',
        ano: '',
        turma: '',
        sala: '',
        nivel: '',

    }

    //UseState
    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [turmas, setTurmas] = useState([]);
    const [objTurmas, setObjTurmas] = useState(turma);
    const [alertMsg, setAlertMsg] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");
    const confirmAction = useRef(() => {});





    //Dados Formulário
    const aoDigitar = (e) => {
        setObjTurmas({ ...objTurmas, [e.target.name]: e.target.value });


    }

    const showConfirm = (action, message) => {
        confirmAction.current = action;
        setConfirmMsg(message);
        window.$('#confirmTurma').modal('show');
    }


    //Cadastrar
    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar-turma", {
            method: 'post',
            body: JSON.stringify(objTurmas),
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
                    fetch("http://localhost:8080/listar-turmas", {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(retorno => retorno.json())
                        .then(retorno_convertido => {
                            setTurmas(retorno_convertido);
                            setAlertMsg("Turma Cadastrada com sucesso!");
                            limparForm();
                        });
                }
            });
    };


    //Alterar
    const alterar = () => {
        fetch("http://localhost:8080/alterar-turma", {
            method: 'put',
            body: JSON.stringify(objTurmas),
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

                    setAlertMsg("Turma Alterada com sucesso!");

                    //copia Vetor
                    let vetorTemp = [...turmas];

                    //indice

                    let indice = vetorTemp.findIndex((t) => {
                        return t.id === objTurmas.id;
                    });

                    //alteração vetorTemp

                    vetorTemp[indice] = objTurmas;

                    //Atualiza vetor principal

                    setTurmas(vetorTemp);
                    limparForm();

                }
            })
    }


    //Excluir
    const excluir = () => {
        fetch("http://localhost:8080/remover-turma/" + objTurmas.id, {
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
                let vetorTemp = [...turmas];

                //indice

                let indice = vetorTemp.findIndex((t) => {
                    return t.id === objTurmas.id;
                });

                //exclusão vetorTemp

                vetorTemp.splice(indice, 1);

                //Atualiza vetor principal

                setTurmas(vetorTemp);

                //Limpa formulario
                limparForm();


            })
    }

    // Função para limpar formulário
    const limparForm = () => {
        setObjTurmas(turma);
        setBtnCadastrar(true);
    }

    useEffect(() => {
        fetchWithAuth("/listar-turmas")
            .then(data => {
                console.log("Dados recebidos de /listar-turmas:", data);
                setTurmas(data);
            })
            .catch(error => console.error("Erro ao buscar turmas:", error));
    }, []);



    //Selecionar
    const selecionarTurma = (indice) => {
        const turmaSelecionado = turmas[indice];


        setObjTurmas({
            id: turmaSelecionado.id,
            nome: turmaSelecionado.nome,
            ano: turmaSelecionado.ano,
            turno: turmaSelecionado.turno,
            sala: turmaSelecionado.sala,
            nivel: turmaSelecionado.nivel
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
                    <h3 className="fw-bold mb-3">Cadastro de Turmas</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Formulario
                        botao={btnCadastrar}
                        eventoTeclado={aoDigitar}
                        cadastrar={() => showConfirm(cadastrar, 'Deseja cadastrar a turma?')}
                        obj={objTurmas}
                        cancelar={limparForm}
                        excluir={() => showConfirm(excluir, 'Deseja excluir a turma?')}
                        alterar={() => showConfirm(alterar, 'Deseja alterar a turma?')}

                    />
                    <Tabela vetor={turmas} selecionar={selecionarTurma} />
                    <ConfirmModal id="confirmTurma" title="Confirmação" message={confirmMsg} onConfirm={() => confirmAction.current()} />
                </div>
            </div>
        </>
    );
}

export default Turmas;
