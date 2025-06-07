import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Equipamentos from './pages/Equipamentos';
import Testes from './pages/Testes';
import Responsaveis from './pages/Responsaveis';
import Agendamento from './pages/Agendamento';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/clientes" element={<Layout><Clientes /></Layout>} />
        <Route path="/equipamentos" element={<Layout><Equipamentos /></Layout>} />
        <Route path="/testes" element={<Layout><Testes /></Layout>} />
        <Route path="/agendamento" element={<Layout><Agendamento /></Layout>} />
        <Route path="/responsaveis" element={<Layout><Responsaveis /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;