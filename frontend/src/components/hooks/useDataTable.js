import { useLayoutEffect } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';

// jQuery já é utilizado internamente pelo DataTables através dos módulos
// importados acima, portanto não é necessário registrá-lo manualmente com o
// objeto `window`, o que causava erro em alguns ambientes.

export default function useDataTable(ref, data) {
  useLayoutEffect(() => {
    if (process.env.NODE_ENV === 'test') return;
    if (!ref.current) return;
    const $table = $(ref.current);
    if ($.fn.DataTable.isDataTable($table)) {
      $table.DataTable().destroy();
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
        $table.DataTable().destroy();
      }
    };
  }, [ref, data]);
}
