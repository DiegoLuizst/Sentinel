import { render, screen } from '@testing-library/react';
import TabelaDisciplinas from '../TabelaDisciplinas';

beforeEach(() => {
  global.window.$ = jest.fn(() => ({
    DataTable: jest.fn(() => ({ destroy: jest.fn() }))
  }));
  global.window.$.fn = { DataTable: { isDataTable: jest.fn(() => false) } };
});

test('renderiza tabela de disciplinas', () => {
  const disciplinas = [
    { id: 1, nome: 'Matematica', carga_horaria: '40' },
    { id: 2, nome: 'Historia', carga_horaria: '30' }
  ];
  render(<TabelaDisciplinas vetor={disciplinas} selecionar={() => {}} />);
  expect(screen.getByText('Matematica')).toBeInTheDocument();
  expect(screen.getByText('Historia')).toBeInTheDocument();
});

test('atualiza ao adicionar e remover disciplinas', () => {
  const { rerender } = render(<TabelaDisciplinas vetor={[]} selecionar={() => {}} />);
  const getRows = () => Array.from(document.querySelectorAll('tbody tr')).filter(row => !row.querySelector('.dt-empty'));
  expect(getRows()).toHaveLength(0);

  const disciplinas = [{ id: 1, nome: 'Matematica', carga_horaria: '40' }];
  rerender(<TabelaDisciplinas vetor={disciplinas} selecionar={() => {}} />);
  expect(getRows()).toHaveLength(1);

  const disciplinas2 = [...disciplinas, { id: 2, nome: 'Historia', carga_horaria: '30' }];
  rerender(<TabelaDisciplinas vetor={disciplinas2} selecionar={() => {}} />);
  expect(getRows()).toHaveLength(2);

  rerender(<TabelaDisciplinas vetor={disciplinas} selecionar={() => {}} />);
  expect(screen.queryByText('Historia')).not.toBeInTheDocument();
  expect(getRows()).toHaveLength(1);
});
