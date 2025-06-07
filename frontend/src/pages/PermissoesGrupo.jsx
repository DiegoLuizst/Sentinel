import { useEffect, useState } from 'react';
import Formulario from '../components/FormularioPermissaoGrupo';
import Tabela from '../components/TabelaPermissaoGrupo';

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

    // Carregar grupos e páginas
    useEffect(() => {
        fetch("http://localhost:8080/listar-permissoes-grupo", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(resp => resp.json())
            .then(data => setGrupos(data));

        fetch("http://localhost:8080/listar-permissoes-pagina", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(resp => resp.json())
            .then(data => setPaginas(data));
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
                alert("Grupo cadastrado!");
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
                alert("Grupo alterado!");
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
                alert(data.mensagem);
                if (data.mensagem === "Permissão removida com sucesso!") {
                    const novaLista = grupos.filter(g => g.id !== objPermissaoGrupo.id);
                    setGrupos(novaLista);
                    limparForm();
                }
            })
            .catch(error => {
                alert(error.mensagem || "Erro ao excluir permissão");
            });
    };

    const selecionarPermissao = (indice) => {
        setObjPermissaoGrupo(grupos[indice]);
        setBtnCadastrar(false);
    };

    return (
        <>
            <h3>Cadastro de Permissões por Grupo</h3>
            <Formulario
                botao={btnCadastrar}
                eventoTeclado={aoDigitar}
                cadastrar={cadastrar}
                obj={objPermissaoGrupo}
                paginas={paginas}
                cancelar={limparForm}
                excluir={excluir}
                alterar={alterar}
            />
            <Tabela vetor={grupos} selecionar={selecionarPermissao} />
        </>
    );
}

export default PermissoesGrupo;
