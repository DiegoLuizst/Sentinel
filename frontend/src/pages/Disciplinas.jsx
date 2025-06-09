import { useEffect, useState, useRef } from 'react';

import Formulario from '../components/FormularioDisciplinas';
import Tabela from '../components/TabelaDisciplinas';
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';

function Disciplinas() {

    //Objeto 
    const disciplina = {
        id: null,
        nome: '',
        carga_horaria: ''

    }

    //UseState
    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [disciplinas, setDisciplinas] = useState([]);
    const [objDisciplinas, setObjDisciplinas] = useState(disciplina);
    const [alertMsg, setAlertMsg] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");
    const confirmAction = useRef(() => {});

    const aoDigitar = (e) => {
        setObjDisciplinas({ ...objDisciplinas, [e.target.name]: e.target.value });
    };




    const showConfirm = (action, message) => {
        confirmAction.current = action;
        setConfirmMsg(message);
        window.$('#confirmDisciplina').modal('show');
    }


    //Cadastrar
    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar-disciplina", {
            method: 'post',
            body: JSON.stringify(objDisciplinas),
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
                    fetch("http://localhost:8080/listar-disciplinas", {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(retorno => retorno.json())
                        .then(retorno_convertido => {
                            setDisciplinas(retorno_convertido);
                            setAlertMsg("Disciplina Cadastrada com sucesso!");
                            limparForm();
                        });
                }
            });
    };


    //Alterar
    const alterar = () => {
        fetch("http://localhost:8080/alterar-disciplina", {
            method: 'put',
            body: JSON.stringify(objDisciplinas),
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

                    setAlertMsg("Disciplina Alterada com sucesso!");

                    //copia Vetor
                    let vetorTemp = [...disciplinas];

                    //indice

                    let indice = vetorTemp.findIndex((d) => {
                        return d.id === objDisciplinas.id;
                    });

                    //alteração vetorTemp

                    vetorTemp[indice] = objDisciplinas;

                    //Atualiza vetor principal

                    setDisciplinas(vetorTemp);
                    limparForm();

                }
            })
    }


    //Excluir
    const excluir = () => {
        fetch("http://localhost:8080/remover-disciplina/" + objDisciplinas.id, {
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
                let vetorTemp = [...disciplinas];

                //indice

                let indice = vetorTemp.findIndex((d) => {
                    return d.id === objDisciplinas.id;
                });

                //exclusão vetorTemp

                vetorTemp.splice(indice, 1);

                //Atualiza vetor principal

                setDisciplinas(vetorTemp);

                //Limpa formulario
                limparForm();


            })
    }

    // Função para limpar formulário
    const limparForm = () => {
        setObjDisciplinas(disciplina);
        setBtnCadastrar(true);
    }

    useEffect(() => {
        fetchWithAuth("/listar-disciplinas")
            .then(data => {
                console.log("Dados recebidos de /listar-disciplinas:", data);
                setDisciplinas(data);
            })
            .catch(error => console.error("Erro ao buscar disciplinas:", error));
    }, []);



    //Selecionar
    const selecionarDisciplina = (indice) => {
        const disciplinaSelecionado = disciplinas[indice];


        setObjDisciplinas({
            id: disciplinaSelecionado.id,
            nome: disciplinaSelecionado.nome,
            carga_horaria: disciplinaSelecionado.carga_horaria
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
                    <h3 className="fw-bold mb-3">Cadastro de Disciplinas</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Formulario
                        botao={btnCadastrar}
                        eventoTeclado={aoDigitar}
                        cadastrar={() => showConfirm(cadastrar, 'Deseja cadastrar a disciplina?')}
                        obj={objDisciplinas}
                        cancelar={limparForm}
                        excluir={() => showConfirm(excluir, 'Deseja excluir a disciplina?')}
                        alterar={() => showConfirm(alterar, 'Deseja alterar a disciplina?')}

                    />
                    <Tabela vetor={disciplinas} selecionar={selecionarDisciplina} />
                    <ConfirmModal id="confirmDisciplina" title="Confirmação" message={confirmMsg} onConfirm={() => confirmAction.current()} />
                </div>
            </div>
        </>
    );
}

export default Disciplinas;
