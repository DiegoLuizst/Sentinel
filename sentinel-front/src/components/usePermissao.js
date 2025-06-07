import { useState, useEffect } from "react";

/**
 * Verifica se o usuário tem permissão para a rota e método HTTP fornecidos.
 * @param {string} rota - Rota da página (ex: "/usuarios")
 * @param {string} metodoHttp - Método HTTP (ex: "GET", "POST", "PUT", "DELETE")
 * @returns {[boolean, boolean]} [temPermissao, carregando]
 */
export function usePermissao(rota, metodoHttp = "GET") {
    const [temPermissao, setTemPermissao] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setTemPermissao(false);
            setCarregando(false);
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const permissoes = payload.permissoes || [];

            const temAcesso = permissoes.some(
                (p) =>
                    p.rota.toLowerCase() === rota.toLowerCase() &&
                    p.metodoHttp.toUpperCase() === metodoHttp.toUpperCase()
            );

            setTemPermissao(temAcesso);
        } catch (error) {
            console.error("Erro ao verificar permissões:", error);
            setTemPermissao(false);
        } finally {
            setCarregando(false);
        }
    }, [rota, metodoHttp]);

    return [temPermissao, carregando];
}
