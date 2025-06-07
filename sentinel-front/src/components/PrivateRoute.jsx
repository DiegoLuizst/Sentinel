import { Navigate, useLocation } from "react-router-dom";
import { usePermissao } from "./usePermissao";

function PrivateRoute({ children }) {
    const location = useLocation();
    const pathname = location.pathname;

    const token = localStorage.getItem("token");
    const [temPermissao, carregando] = usePermissao(pathname);

    if (!token) {
        console.log("PrivateRoute - sem token");
        return <Navigate to="/" />;
    }

    if (carregando) {
        console.log("PrivateRoute - carregando permissões...");
        return <div>Carregando...</div>; // ou um spinner
    }

    if (!temPermissao) {
        console.log("PrivateRoute - sem permissão:", pathname);
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;
