import { useEffect, useState, useCallback, useRef } from "react";
import Formulario from "../components/FormularioAlunos";
import Tabela from "../components/TabelaAlunos";
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';

function Alunos() {
    const alunoInicial = {
        id: null,
        nome: '',
        data: '',
        genero: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        telefone: '',
        email: '',
        nome_resp1: '',
        telefone_resp1: '',
        email_resp1: '',
        cpf_resp1: '',
        cep_resp1: '',
        rua_resp1: '',
        numero_resp1: '',
        complemento_resp1: '',
        bairro_resp1: '',
        cidade_resp1: '',
        estado_resp1: '',
        parentesco_resp1: '',
        nome_resp2: '',
        telefone_resp2: '',
        email_resp2: '',
        cpf_resp2: '',
        cep_resp2: '',
        rua_resp2: '',
        numero_resp2: '',
        complemento_resp2: '',
        bairro_resp2: '',
        cidade_resp2: '',
        estado_resp2: '',
        parentesco_resp2: '',
        turma: null,

        // controles de sincronização de dados do responsável 1 com o aluno
        mesmoTelefoneAluno: false,
        mesmoEmailAluno: false,
        mesmoEnderecoAluno: false,

        // controles de sincronização de dados do responsável 2 com o aluno
        mesmoTelefoneAlunoResp2: false,
        mesmoEmailAlunoResp2: false,
        mesmoEnderecoAlunoResp2: false
    };


    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [alunos, setAlunos] = useState([]);
    const [objAlunos, setObjAlunos] = useState(alunoInicial);
    const [sincronizarResp1, setSincronizarResp1] = useState(false);
    const [desabilitarResp2, setDesabilitarResp2] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");
    const confirmAction = useRef(() => {});

    useEffect(() => {
        buscarAlunos();
    }, [buscarAlunos]);

    useEffect(() => {
        if (sincronizarResp1) {
            setObjAlunos((prev) => ({
                ...prev,
                nome_resp2: prev.nome_resp1,
                telefone_resp2: prev.telefone_resp1,
                email_resp2: prev.email_resp1,
                cpf_resp2: prev.cpf_resp1,
                cep_resp2: prev.cep_resp1,
                rua_resp2: prev.rua_resp1,
                numero_resp2: prev.numero_resp1,
                complemento_resp2: prev.complemento_resp1,
                bairro_resp2: prev.bairro_resp1,
                cidade_resp2: prev.cidade_resp1,
                estado_resp2: prev.estado_resp1,
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
        objAlunos.cep_resp1,
        objAlunos.rua_resp1,
        objAlunos.numero_resp1,
        objAlunos.complemento_resp1,
        objAlunos.bairro_resp1,
        objAlunos.cidade_resp1,
        objAlunos.estado_resp1,
        objAlunos.parentesco_resp1,
    ]);

    const buscarCEP = async (cep) => {
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (resp.ok) {
            const data = await resp.json();
            if (!data.erro) return data;
        }
        return null;
    };

    const preencherEndereco = (sufixo, dados) => {
        const final = sufixo ? `_${sufixo}` : '';
        setObjAlunos(prev => ({
            ...prev,
            [`rua${final}`]: dados.logradouro || '',
            [`bairro${final}`]: dados.bairro || '',
            [`cidade${final}`]: dados.localidade || '',
            [`estado${final}`]: dados.uf || ''
        }));
    };

    const aoDigitar = async (e) => {
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
                atualizado.cep_resp1 = prev.cep;
                atualizado.rua_resp1 = prev.rua;
                atualizado.numero_resp1 = prev.numero;
                atualizado.complemento_resp1 = prev.complemento;
                atualizado.bairro_resp1 = prev.bairro;
                atualizado.cidade_resp1 = prev.cidade;
                atualizado.estado_resp1 = prev.estado;
            }

            if (name === "mesmoTelefoneAlunoResp2" && checked) {
                atualizado.telefone_resp2 = prev.telefone;
            }
            if (name === "mesmoEmailAlunoResp2" && checked) {
                atualizado.email_resp2 = prev.email;
            }
            if (name === "mesmoEnderecoAlunoResp2" && checked) {
                atualizado.cep_resp2 = prev.cep;
                atualizado.rua_resp2 = prev.rua;
                atualizado.numero_resp2 = prev.numero;
                atualizado.complemento_resp2 = prev.complemento;
                atualizado.bairro_resp2 = prev.bairro;
                atualizado.cidade_resp2 = prev.cidade;
                atualizado.estado_resp2 = prev.estado;
            }

            return atualizado;
        });

        if (name.startsWith('cep') && value.replace(/\D/g, '').length === 8) {
            let sufixo = '';
            if (name === 'cep_resp1') sufixo = 'resp1';
            else if (name === 'cep_resp2') sufixo = 'resp2';
            const dados = await buscarCEP(value.replace(/\D/g, ''));
            if (dados) preencherEndereco(sufixo, dados);
        }
    };

    const showConfirm = (action, message) => {
        confirmAction.current = action;
        setConfirmMsg(message);
        window.$('#confirmAluno').modal('show');
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
                    setAlertMsg(data.mensagem);
                } else {
                    setAlertMsg("Aluno cadastrado com sucesso!");
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
                    setAlertMsg(data.mensagem);
                } else {
                    setAlertMsg("Aluno alterado com sucesso!");
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
                setAlertMsg(data.mensagem);
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

    const buscarAlunos = useCallback(() => {
        fetchWithAuth("/listar-alunos")
            .then(data => setAlunos(data))
            .catch(error => console.error("Erro ao buscar alunos:", error));
    }, []);

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
            <Alert message={alertMsg} onClose={() => setAlertMsg("")} />
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
                        cadastrar={() => showConfirm(cadastrar, 'Deseja cadastrar o aluno?')}
                        obj={objAlunos}
                        cancelar={limparForm}
                        excluir={() => showConfirm(excluir, 'Deseja excluir o aluno?')}
                        alterar={() => showConfirm(alterar, 'Deseja alterar o aluno?')}
                        sincronizarResp1={() => setSincronizarResp1(!sincronizarResp1)}
                        setSincronizarResp1={setSincronizarResp1}
                        desabilitarResp2={desabilitarResp2}
                        setDesabilitarResp2={setDesabilitarResp2}
                    />


                    <Tabela vetor={alunos} selecionar={selecionarAluno} />
                    <ConfirmModal id="confirmAluno" title="Confirmação" message={confirmMsg} onConfirm={() => confirmAction.current()} />
                </div>
            </div>
        </>
    );
}

export default Alunos;
