import Pagination from './Pagination';
import useTableControls from './hooks/useTableControls';

function Tabela({ vetor }) {
    const {
        search,
        setSearch,
        requestSort,
        sortConfig,
        paginated,
        page,
        changePage,
        pageCount,
    } = useTableControls(vetor, { keys: ['nome', 'carga_horaria'] });

    const getArrow = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' \u25B2' : ' \u25BC';
    };

    return (
        <div>
            <div className="d-flex justify-content-end mb-2">
                <input
                    type="text"
                    className="form-control w-auto"
                    placeholder="Buscar"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); changePage(1); }}
                />
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => requestSort('nome')}>Nome{getArrow('nome')}</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => requestSort('carga_horaria')}>Carga Horaria{getArrow('carga_horaria')}</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{(page - 1) * 5 + indice + 1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.carga_horaria}</td>
                            <td><button className="btn"> Selecionar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} pageCount={pageCount} changePage={changePage} />
        </div>
    );
}

export default Tabela;
