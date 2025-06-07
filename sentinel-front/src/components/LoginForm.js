import React, { useState } from "react";
import "../css/login.css";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                alert("Usuário ou senha inválidos");
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token); // salva o JWT

            // Redireciona, por exemplo:
            window.location.href = "/home";

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro de conexão");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="overlay">
                <div className="login-card shadow-lg">
                    <div className="login-card-header">
                        <img src="./assets/img/kaiadmin/sentinelLogoComp.png" alt="Sentinel" className="login-logo" />
                    </div>

                    <h3 className="text-center mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3 input-icon">
                            <i className="fas fa-envelope icon"></i>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4 input-icon">
                            <i className="fas fa-lock icon"></i>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-warning w-100">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
