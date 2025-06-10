function Pagination({ page, pageCount, changePage }) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>\
<button className="page-link" onClick={() => changePage(page - 1)}>Anterior</button></li>
        {pages.map(p => (
          <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>\
<button className="page-link" onClick={() => changePage(p)}>{p}</button></li>
        ))}
        <li className={`page-item ${page === pageCount ? 'disabled' : ''}`}>\
<button className="page-link" onClick={() => changePage(page + 1)}>Próximo</button></li>
      </ul>
    </nav>
  );
}

export default Pagination;
