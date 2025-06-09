<<<<<<< HEAD
test('basic test environment works', () => {
  expect(true).toBe(true);
=======
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renderiza a tela de login ao acessar '/'", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // Altere o texto abaixo conforme o que aparece na tela de login real
  const elementoLogin = screen.getByText(/login/i);
  expect(elementoLogin).toBeInTheDocument();
>>>>>>> Descreva o que você alterou
});
