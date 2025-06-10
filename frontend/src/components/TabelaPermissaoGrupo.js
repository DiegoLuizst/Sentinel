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
    } = useTableControls(vetor, { keys: ['nome'] });

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
                        <th style={{ cursor: 'pointer' }} onClick={() => requestSort('nome')}>Nome do Grupo{getArrow('nome')}</th>
                        <th>Permissões</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((grupo, index) => (
                        <tr key={grupo.id}>
                            <td>{(page - 1) * 5 + index + 1}</td>
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
            <Pagination page={page} pageCount={pageCount} changePage={changePage} />
        </div>
    );
}

export default Tabela;
