import { useEffect, useState, useRef } from 'react';
import Formulario from '../components/FormularioPermissaoGrupo';
import Tabela from '../components/TabelaPermissaoGrupo';
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';

function PermissoesGrupo() {
    const permissaoGrupoInicial = {
        id: null,
        nome: '',
        permissoes: [] // array de objetos { id: number }
    };

    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [grupos, setGrupos] = useState([]);
    const [paginas, setPaginas] = useState([]);
    const [objPermissaoGrupo, setObjPermissaoGrupo] = useState(permissaoGrupoInicial);
    const [alertMsg, setAlertMsg] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");
    const confirmAction = useRef(() => {});

    // Carregar grupos e páginas
    useEffect(() => {
        fetch("http://localhost:8080/listar-permissoes-grupo", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("Dados recebidos de /listar-permissoes-grupo:", data);
                setGrupos(data);
            });

        fetch("http://localhost:8080/listar-permissoes-pagina", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("Dados recebidos de /listar-permissoes-pagina:", data);
                setPaginas(data);
            });
    }, []);

    const aoDigitar = (e) => {
        const { name, value } = e.target;

        if (name === "permissoes") {
            // Aqui value já é um array (setado manualmente no handleCheckboxChange)
            setObjPermissaoGrupo({
                ...objPermissaoGrupo,
                permissoes: value
            });
        } else {
            setObjPermissaoGrupo({
                ...objPermissaoGrupo,
                [name]: value
            });
        }
    };

    const showConfirm = (action, message) => {
        confirmAction.current = action;
        setConfirmMsg(message);
        window.$('#confirmGrupo').modal('show');
    };


    const limparForm = () => {
        setObjPermissaoGrupo(permissaoGrupoInicial);
        setBtnCadastrar(true);
    };

    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar-permissao-grupo", {
            method: 'POST',
            body: JSON.stringify(objPermissaoGrupo),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(r => {
                setAlertMsg("Grupo cadastrado!");
                setGrupos([...grupos, r]);
                limparForm();
            });
    };

    const alterar = () => {
        fetch("http://localhost:8080/alterar-permissao-grupo", {
            method: 'PUT',
            body: JSON.stringify(objPermissaoGrupo),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(r => {
                setAlertMsg("Grupo alterado!");
                const copia = [...grupos];
                const i = copia.findIndex(g => g.id === objPermissaoGrupo.id);
                copia[i] = objPermissaoGrupo;
                setGrupos(copia);
                limparForm();
            });
    };

    const excluir = () => {
        fetch("http://localhost:8080/remover-permissao-grupo/" + objPermissaoGrupo.id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                setAlertMsg(data.mensagem);
                if (data.mensagem === "Permissão removida com sucesso!") {
                    const novaLista = grupos.filter(g => g.id !== objPermissaoGrupo.id);
                    setGrupos(novaLista);
                    limparForm();
                }
            })
            .catch(error => {
                setAlertMsg(error.mensagem || "Erro ao excluir permissão");
            });
    };

    const selecionarPermissao = (indice) => {
        setObjPermissaoGrupo(grupos[indice]);
        setBtnCadastrar(false);
    };

    return (
        <>
            <Alert message={alertMsg} onClose={() => setAlertMsg("")} />
            <h3>Cadastro de Permissões por Grupo</h3>
            <Formulario
                botao={btnCadastrar}
                eventoTeclado={aoDigitar}
                cadastrar={() => showConfirm(cadastrar, 'Deseja cadastrar o grupo?')}
                obj={objPermissaoGrupo}
                paginas={paginas}
                cancelar={limparForm}
                excluir={() => showConfirm(excluir, 'Deseja excluir o grupo?')}
                alterar={() => showConfirm(alterar, 'Deseja alterar o grupo?')}
            />
            <Tabela vetor={grupos} selecionar={selecionarPermissao} />
            <ConfirmModal id="confirmGrupo" title="Confirmação" message={confirmMsg} onConfirm={() => confirmAction.current()} />
        </>
    );
}

export default PermissoesGrupo;
