import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import DefaultLayout from "./Layout/DefaultLayout";
import SimpleLayout from "./Layout/SimpleLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Permissoes from "./pages/PermissoesGrupo";
import Disciplinas from "./pages/Disciplinas";
import Cargos from "./pages/Cargos";
import Turmas from "./pages/Turmas";
import Alunos from "./pages/Alunos";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas com layout padrão, protegidas por autenticação */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Usuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/permissao"
            element={
              <PrivateRoute>
                <Permissoes />
              </PrivateRoute>
            }
          />


          <Route
            path="/disciplinas"
            element={
              <PrivateRoute>
                <Disciplinas />
              </PrivateRoute>
            }
          />

          <Route
            path="/cargos"
            element={
              <PrivateRoute>
                <Cargos />
              </PrivateRoute>
            }
          />

          <Route
            path="/turmas"
            element={
              <PrivateRoute>
                <Turmas />
              </PrivateRoute>
            }
          />

          <Route
            path="/alunos"
            element={
              <PrivateRoute>
                <Alunos />
              </PrivateRoute>
            }
          />




        </Route>



        {/* Rota pública */}
        <Route element={<SimpleLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;
