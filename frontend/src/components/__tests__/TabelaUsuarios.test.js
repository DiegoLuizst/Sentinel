import { render, screen } from '@testing-library/react';
import TabelaUsuarios from '../TabelaUsuarios';

beforeEach(() => {
  global.window.$ = jest.fn(() => ({
    DataTable: jest.fn(() => ({ destroy: jest.fn() }))
  }));
  global.window.$.fn = { DataTable: { isDataTable: jest.fn(() => false) } };
});

test('renderiza tabela de usuários', () => {
  const usuarios = [
    { id: 1, nome: 'Alice', email: 'a@example.com', permissaoGrupo: { nome: 'Admin' } },
    { id: 2, nome: 'Bob', email: 'b@example.com', permissaoGrupo: { nome: 'User' } }
  ];
  render(<TabelaUsuarios vetor={usuarios} selecionar={() => {}} />);
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});

test('atualiza ao adicionar e remover usuarios', () => {
  const { rerender } = render(<TabelaUsuarios vetor={[]} selecionar={() => {}} />);
  const getRows = () => document.querySelectorAll('tbody tr');
  expect(getRows()).toHaveLength(0);

  const usuarios = [
    { id: 1, nome: 'Alice', email: 'a@example.com', permissaoGrupo: { nome: 'Admin' } }
  ];
  rerender(<TabelaUsuarios vetor={usuarios} selecionar={() => {}} />);
  expect(getRows()).toHaveLength(1);

  const usuarios2 = [...usuarios, { id: 2, nome: 'Bob', email: 'b@example.com', permissaoGrupo: { nome: 'User' } }];
  rerender(<TabelaUsuarios vetor={usuarios2} selecionar={() => {}} />);
  expect(getRows()).toHaveLength(2);

  rerender(<TabelaUsuarios vetor={usuarios} selecionar={() => {}} />);
  expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  expect(getRows()).toHaveLength(1);
});
