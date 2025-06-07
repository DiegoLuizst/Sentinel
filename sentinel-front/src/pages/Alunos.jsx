import { useEffect, useState } from "react";
import Formulario from "../components/FormularioAlunos";
import Tabela from "../components/TabelaAlunos";

function Alunos() {
    const alunoInicial = {
        id: null,
        nome: '',
        data: '',
        genero: '',
        endereco: '',
        telefone: '',
        email: '',
        nome_resp1: '',
        telefone_resp1: '',
        email_resp1: '',
        cpf_resp1: '',
        endereco_resp1: '',
        parentesco_resp1: '',
        nome_resp2: '',
        telefone_resp2: '',
        email_resp2: '',
        cpf_resp2: '',
        endereco_resp2: '',
        parentesco_resp2: '',
        turma: null,

        // adicione estas 3 propriedades
        mesmoTelefoneAluno: false,
        mesmoEmailAluno: false,
        mesmoEnderecoAluno: false
    };


    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [alunos, setAlunos] = useState([]);
    const [objAlunos, setObjAlunos] = useState(alunoInicial);
    const [sincronizarResp1, setSincronizarResp1] = useState(false);
    const [desabilitarResp2, setDesabilitarResp2] = useState(false);

    useEffect(() => {
        buscarAlunos();
    }, []);

    useEffect(() => {
        if (sincronizarResp1) {
            setObjAlunos((prev) => ({
                ...prev,
                nome_resp2: prev.nome_resp1,
                telefone_resp2: prev.telefone_resp1,
                email_resp2: prev.email_resp1,
                cpf_resp2: prev.cpf_resp1,
                endereco_resp2: prev.endereco_resp1,
                parentesco_resp2: prev.parentesco_resp1,
            }));
            setDesabilitarResp2(true);
        } else {
            setDesabilitarResp2(false);
        }
    }, [
        sincronizarResp1,
        objAlunos.nome_resp1,
        objAlunos.telefone_resp1,
        objAlunos.email_resp1,
        objAlunos.cpf_resp1,
        objAlunos.endereco_resp1,
        objAlunos.parentesco_resp1,
    ]);

    const aoDigitar = (e) => {
        const { name, type, value, checked } = e.target;
        const novoValor = type === "checkbox" ? checked : value;

        setObjAlunos((prev) => {
            const atualizado = { ...prev, [name]: novoValor };

            // Sincronizar telefone/email/endereço do responsável 1 com o aluno
            if (name === "mesmoTelefoneAluno" && checked) {
                atualizado.telefone_resp1 = prev.telefone;
            }
            if (name === "mesmoEmailAluno" && checked) {
                atualizado.email_resp1 = prev.email;
            }
            if (name === "mesmoEnderecoAluno" && checked) {
                atualizado.endereco_resp1 = prev.endereco;
            }

            return atualizado;
        });
    };


    const cadastrar = () => {
        fetch("http://localhost:8080/cadastrar-aluno", {
            method: 'POST',
            body: JSON.stringify(objAlunos),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.mensagem !== undefined) {
                    alert(data.mensagem);
                } else {
                    alert("Aluno cadastrado com sucesso!");
                    buscarAlunos();
                    limparForm();
                }
            });
    };

    const alterar = () => {
        fetch("http://localhost:8080/alterar-aluno", {
            method: 'PUT',
            body: JSON.stringify(objAlunos),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.mensagem !== undefined) {
                    alert(data.mensagem);
                } else {
                    alert("Aluno alterado com sucesso!");
                    const temp = [...alunos];
                    const indice = temp.findIndex(a => a.id === objAlunos.id);
                    temp[indice] = objAlunos;
                    setAlunos(temp);
                    limparForm();
                }
            });
    };

    const excluir = () => {
        fetch(`http://localhost:8080/remover-aluno/${objAlunos.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(resp => resp.json())
            .then(data => {
                alert(data.mensagem);
                const temp = alunos.filter(a => a.id !== objAlunos.id);
                setAlunos(temp);
                limparForm();
            });
    };

    const selecionarAluno = (indice) => {
        const alunoSelecionado = { ...alunos[indice] };
        setObjAlunos(alunoSelecionado);
        setBtnCadastrar(false);
        setSincronizarResp1(false);
        setDesabilitarResp2(false);
    };

    const limparForm = () => {
        setObjAlunos(alunoInicial);
        setBtnCadastrar(true);
        setSincronizarResp1(false);
        setDesabilitarResp2(false);
    };

    const buscarAlunos = () => {
        fetchWithAuth("/listar-alunos")
            .then(data => setAlunos(data))
            .catch(error => console.error("Erro ao buscar alunos:", error));
    };

    const fetchWithAuth = async (url, options = {}) => {
        const response = await fetch(`http://localhost:8080${url}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) window.location.href = "/login";
            throw new Error("Erro na requisição: " + response.status);
        }

        return response.json();
    };

    return (
        <>
            <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                    <h3 className="fw-bold mb-3">Cadastro de Alunos</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <Formulario
                        botao={btnCadastrar}
                        eventoTeclado={aoDigitar}
                        cadastrar={cadastrar}
                        obj={objAlunos}
                        cancelar={limparForm}
                        excluir={excluir}
                        alterar={alterar}
                        sincronizarResp1={() => setSincronizarResp1(!sincronizarResp1)}
                        setSincronizarResp1={setSincronizarResp1}
                        desabilitarResp2={desabilitarResp2}
                        setDesabilitarResp2={setDesabilitarResp2}
                    />


                    <Tabela vetor={alunos} selecionar={selecionarAluno} />
                </div>
            </div>
        </>
    );
}

export default Alunos;
