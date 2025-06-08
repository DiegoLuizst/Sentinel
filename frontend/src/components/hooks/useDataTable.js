import { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';

if (!window.$) {
  window.$ = $;
  window.jQuery = $;
}

export default function useDataTable(ref, data) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    if (!ref.current) return;
    const $table = $(ref.current);
    if ($.fn.DataTable.isDataTable($table)) {
      $table.DataTable().destroy(true);
    }
    $table.DataTable({
      destroy: true,
      responsive: true,
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50, 100],
      language: {
        sEmptyTable: 'Nenhum registro encontrado',
        sInfo: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
        sInfoEmpty: 'Mostrando 0 até 0 de 0 registros',
        sInfoFiltered: '(Filtrados de _MAX_ registros)',
        sLengthMenu: '_MENU_ resultados por página',
        sLoadingRecords: 'Carregando...',
        sProcessing: 'Processando...',
        sZeroRecords: 'Nenhum registro encontrado',
        sSearch: 'Buscar',
        oPaginate: {
          sNext: 'Próximo',
          sPrevious: 'Anterior',
          sFirst: 'Primeiro',
          sLast: 'Último',
        },
        oAria: {
          sSortAscending: ': Ordenar colunas de forma ascendente',
          sSortDescending: ': Ordenar colunas de forma descendente',
        },
      },
    });
    return () => {
      if ($.fn.DataTable.isDataTable($table)) {
        $table.DataTable().destroy(true);
      }
    };
  }, [ref, data]);
}
