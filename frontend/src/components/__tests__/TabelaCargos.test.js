import { render, screen } from '@testing-library/react';
import TabelaCargos from '../TabelaCargos';

beforeEach(() => {
  global.window.$ = jest.fn(() => ({
    DataTable: jest.fn(() => ({ destroy: jest.fn() }))
  }));
  global.window.$.fn = { DataTable: { isDataTable: jest.fn(() => false) } };
});

test('renderiza tabela de cargos', () => {
  const cargos = [
    { id: 1, nome: 'Professor' },
    { id: 2, nome: 'Coordenador' }
  ];
  render(<TabelaCargos vetor={cargos} selecionar={() => {}} />);
  expect(screen.getByText('Professor')).toBeInTheDocument();
  expect(screen.getByText('Coordenador')).toBeInTheDocument();
});

test('atualiza ao adicionar e remover cargos', () => {
  const { rerender } = render(<TabelaCargos vetor={[]} selecionar={() => {}} />);
  const getRows = () => Array.from(document.querySelectorAll('tbody tr')).filter(row => !row.querySelector('.dt-empty'));
  expect(getRows()).toHaveLength(0);

  const cargos = [{ id: 1, nome: 'Professor' }];
  rerender(<TabelaCargos vetor={cargos} selecionar={() => {}} />);
  expect(getRows()).toHaveLength(1);

  const cargos2 = [...cargos, { id: 2, nome: 'Coordenador' }];
  rerender(<TabelaCargos vetor={cargos2} selecionar={() => {}} />);
  expect(getRows()).toHaveLength(2);

  rerender(<TabelaCargos vetor={cargos} selecionar={() => {}} />);
  expect(screen.queryByText('Coordenador')).not.toBeInTheDocument();
  expect(getRows()).toHaveLength(1);
});
