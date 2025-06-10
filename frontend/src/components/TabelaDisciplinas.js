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
                    <th>Carga Horaria</th>
                    <th>Ações</th>
                </tr>
            </thead>


            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice} onClick={() => selecionar && selecionar(indice)}>
                            <td>{indice + 1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.carga_horaria}</td>
                            <td><button className="btn"> Selecionar</button></td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default Tabela;
