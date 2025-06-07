import { useEffect, useState, useRef } from 'react';

import Formulario from '../components/FormularioUsuarios';
import Tabela from '../components/TabelaUsuarios';
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';

function Usuarios() {

    //Objeto 
    const usuario = {
        id: null,
        nome: '',
        email: '',
        senha: '',
        permissaoGrupo: null
    }

    //UseState
    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [objUsuarios, setObjUsuarios] = useState(usuario);
    const [gruposPermissao, setGruposPermissao] = useState([]);
    const [alertMsg, setAlertMsg] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");
    const confirmActionRef = useRef(() => {});


    //UseEfect
    useEffect(() => {

        fetch("http://localhost:8080/listar-users", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(retorno => retorno.json())
            .then(retorno_convertido => setUsuarios(retorno_convertido))

    }, []);


    //Dados Formulário
    const aoDigitar = (e) => {
        const { name, value } = e.target;

        if (name === "permissaoGrupo") {
            setObjUsuarios({
                ...objUsuarios,
                permissaoGrupo: {
                    id: parseInt(value) // Converta para número, pois vem como string
                }
            });
        } else {
            setObjUsuarios({
                ...objUsuarios,
                [name]: value
            });
        }
    };

    const showConfirm = (action, message) => {
        confirmActionRef.current = action;
        setConfirmMsg(message);
        window.$('#confirmUsuario').modal('show');
    };


    //Cadastrar
    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar-user", {
            method: 'post',
            body: JSON.stringify(objUsuarios),
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
                    fetch("http://localhost:8080/listar-users", {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(retorno => retorno.json())
                        .then(retorno_convertido => {
                            setUsuarios(retorno_convertido);
                            setAlertMsg("Usuario Cadastrado com sucesso!");
                            limparForm();
                        });
                }
            });
    };


    //Alterar
    const alterar = () => {
        fetch("http://localhost:8080/alterar-user", {
            method: 'put',
            body: JSON.stringify(objUsuarios),
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

                    setAlertMsg("Usuario Alterado com sucesso!");

                    //copia Vetor
                    let vetorTemp = [...usuarios];

                    //indice

                    let indice = vetorTemp.findIndex((u) => {
                        return u.id === objUsuarios.id;
                    });

                    //alteração vetorTemp

                    vetorTemp[indice] = objUsuarios;

                    //Atualiza vetor principal

                    setUsuarios(vetorTemp);
                    limparForm();

                }
            })
    }


    //Excluir
    const excluir = () => {
        fetch("http://localhost:8080/remover-user/" + objUsuarios.id, {
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
                let vetorTemp = [...usuarios];

                //indice

                let indice = vetorTemp.findIndex((u) => {
                    return u.id === objUsuarios.id;
                });

                //exclusão vetorTemp

                vetorTemp.splice(indice, 1);

                //Atualiza vetor principal

                setUsuarios(vetorTemp);

                //Limpa formulario
                limparForm();


            })
    }

    // Função para limpar formulário
    const limparForm = () => {
        setObjUsuarios(usuario);
        setBtnCadastrar(true);
    }

    useEffect(() => {
        fetchWithAuth("/listar-users")
            .then(data => setUsuarios(data))
            .catch(error => console.error("Erro ao buscar usuários:", error));
    }, []);


    useEffect(() => {
        fetchWithAuth("/listar-permissoes-grupo")
            .then(data => setGruposPermissao(data))
            .catch(error => console.error("Erro ao buscar permissões:", error));
    }, []);
    //Selecionar
    const selecionarUsuario = (indice) => {
        const usuarioSelecionado = usuarios[indice];

        // Garante que permissaoGrupo esteja no formato correto
        setObjUsuarios({
            id: usuarioSelecionado.id,
            nome: usuarioSelecionado.nome,
            email: usuarioSelecionado.email,
            senha: usuarioSelecionado.senha,
            permissaoGrupo: usuarioSelecionado.permissaoGrupo
                ? { id: usuarioSelecionado.permissaoGrupo.id }
                : null
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



    //SelectPErmissoes

    useEffect(() => {
        fetch("http://localhost:8080/listar-permissoes-grupo") // ajuste para sua URL real
            .then(response => response.json())
            .then(data => setGruposPermissao(data))
            .catch(error => console.error("Erro ao buscar permissões:", error));
    }, []);


    //Retorno
    return (
        <>
            <Alert message={alertMsg} onClose={() => setAlertMsg("")} />
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                    <h3 className="fw-bold mb-3">Cadastro de Usuários</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Formulario
                        botao={btnCadastrar}
                        eventoTeclado={aoDigitar}
                        cadastrar={() => showConfirm(cadastrar, 'Deseja cadastrar o usuário?')}
                        obj={objUsuarios}
                        cancelar={limparForm}
                        excluir={() => showConfirm(excluir, 'Deseja excluir o usuário?')}
                        alterar={() => showConfirm(alterar, 'Deseja alterar o usuário?')}
                        gruposPermissao={gruposPermissao}
                    />
                    <Tabela vetor={usuarios} selecionar={selecionarUsuario} />
                    <ConfirmModal id="confirmUsuario" title="Confirmação" message={confirmMsg} onConfirm={() => confirmActionRef.current()} />
                </div>
            </div>
        </>
    );
}

export default Usuarios;
