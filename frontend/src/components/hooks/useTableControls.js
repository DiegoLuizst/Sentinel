import { useState, useMemo } from 'react';

export default function useTableControls(data, options = {}) {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(1);
  const pageSize = options.pageSize || 5;

  const keys = options.keys || (data[0] ? Object.keys(data[0]) : []);

  const filtered = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter(item =>
      keys.some(k => String(item[k]).toLowerCase().includes(lower))
    );
  }, [data, search, keys]);

  const sorted = useMemo(() => {
    if (!sortConfig.key) return filtered;
    const sortedData = [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortedData;
  }, [filtered, sortConfig]);

  const pageCount = Math.ceil(sorted.length / pageSize) || 1;

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  function requestSort(key) {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  function changePage(newPage) {
    if (newPage < 1 || newPage > pageCount) return;
    setPage(newPage);
  }

  return {
    search,
    setSearch,
    sortConfig,
    requestSort,
    page,
    changePage,
    pageCount,
    pageSize,
    paginated,
  };
}
