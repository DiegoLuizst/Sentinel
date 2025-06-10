import { useRef } from 'react';
import useDataTable from './hooks/useDataTable';

function Tabela({ vetor, selecionar }) {
    const tableRef = useRef(null);
    useDataTable(tableRef, vetor);
    return (
        <table ref={tableRef} className="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Permissão</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map((obj, indice) => (
                    <tr key={obj.id} onClick={() => selecionar && selecionar(indice)}>
                        <td>{indice + 1}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.email}</td>
                        <td>{obj.permissaoGrupo.nome}</td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
