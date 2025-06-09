import { useRef, useEffect } from "react";
import useDataTable from "./hooks/useDataTable";

// eslint-disable-next-line no-unused-vars
const abrirModal = () => {};

function Tabela({ vetor, selecionar }) {
    const tableRef = useRef(null);
    useDataTable(tableRef, vetor);

    useEffect(() => {
        console.log('TabelaPermissaoGrupo - vetor atualizado:', vetor);
    }, [vetor]);

    return (
        <>
            <div className="card">
                <div className="card-header">Grupos e Permissões</div>
                <div className="card-body table-responsive">
                    <table className="table table-striped table-hover" id="tabela" key={vetor.length} ref={tableRef}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome do Grupo</th>
                                <th>Permissões</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vetor.map((grupo, index) => (
                                <tr
                                    key={grupo.id}
                                    onClick={() => selecionar(index)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{index + 1}</td>
                                    <td>{grupo.nome}</td>
                                    <td>
                                        {grupo.permissoes && grupo.permissoes.length > 0
                                            ? grupo.permissoes.map((p) => p.nome).join(', ')
                                            : 'Nenhuma'}
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default Tabela;
