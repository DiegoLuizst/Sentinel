import React from "react";

export function UserName() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const nome = payload.nome || "Usuário";

        return <span className="fw-bold ms-1">{nome}</span>;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return <span className="fw-bold ms-1">Usuário</span>;
    }
}