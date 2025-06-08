
import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import { UserName } from "../components/UserName";
import { usePermissao } from "../components/usePermissao";

function DefaultLayout() {
    // Verifica permissão GET para mostrar menu 
    const podeVerUsuarios = usePermissao("/listar-user", "GET");
    const podeVerPermissoes = usePermissao("/listar-permissoes-grupo", "GET");
    const podeVerDisciplinas = usePermissao("/listar-disciplinas", "GET");
    const podeVerCargos = usePermissao("/listar-cargos", "GET");
    const podeVerTurmas = usePermissao("/listar-turmas", "GET");
    const podeVerAlunos = usePermissao("/listar-alunos", "GET");


    const [submenuAberto, setSubmenuAberto] = useState(false);



    return (
        <div className="wrapper">
            {/* Sidebar */}
            <div className="sidebar" data-background-color="dark">
                <div className="sidebar-logo">
                    <div
                        className="logo-header d-flex justify-content-center"
                        data-background-color="dark"
                    >
                        <a href="/" className="logo">
                            <img
                                src="/assets/img/kaiadmin/sentinelLogoComp.png"
                                alt="navbar brand"
                                className="navbar-brand"
                                height="85"
                            />
                        </a>
                        <div className="nav-toggle">
                            <button className="btn btn-toggle toggle-sidebar">
                                <i className="gg-menu-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sidebar-wrapper scrollbar scrollbar-inner">
                    <div className="sidebar-content">
                        <ul className="nav nav-secondary">
                            <li className="nav-item active">
                                <a
                                    data-bs-toggle="collapse"
                                    href="/home"
                                    className="collapsed"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-home"></i>
                                    <p>Início</p>
                                </a>
                            </li>





                            <li className="nav-item active">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSubmenuAberto(!submenuAberto);
                                    }}
                                >
                                    <i className="fa-solid fa-folder-open"></i>
                                    <p>Cadastro e Consulta</p>
                                    <span className="caret"></span>
                                </a>
                                <div className={`collapse ${submenuAberto ? 'show' : ''}`} id="submenu">
                                    <ul className="nav nav-collapse">
                                        {podeVerUsuarios && (
                                            <li>
                                                <a href="/usuarios">
                                                    <span className="sub-item">Usuários</span>
                                                </a>
                                            </li>
                                        )}
                                        {podeVerPermissoes && (
                                            <li>
                                                <a href="/permissao">
                                                    <span className="sub-item">Permissões</span>
                                                </a>
                                            </li>
                                        )}
                                        {podeVerDisciplinas && (
                                            <li>
                                                <a href="/disciplinas">
                                                    <span className="sub-item">Disciplinas</span>
                                                </a>
                                            </li>
                                        )}
                                        {podeVerCargos && (
                                            <li>
                                                <a href="/cargos">
                                                    <span className="sub-item">Cargos</span>
                                                </a>
                                            </li>
                                        )}

                                        {podeVerTurmas && (
                                            <li>
                                                <a href="/turmas">
                                                    <span className="sub-item">Turmas</span>
                                                </a>
                                            </li>
                                        )}

                                        {podeVerAlunos && (
                                            <li>
                                                <a href="/alunos">
                                                    <span className="sub-item">Alunos</span>
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </li>







                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Panel */}
            <div className="main-panel">
                {/* Topbar */}
                <div className="main-header">
                    <div className="main-header-logo">
                        <div className="logo-header" data-background-color="dark">
                            <a href="/" className="logo">
                                <img
                                    src="/assets/img/kaiadmin/sentinelLogo.svg"
                                    alt="navbar brand"
                                    className="navbar-brand"
                                    height="20"
                                />
                            </a>
                        </div>
                    </div>

                    <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
                        <div className="container-fluid">
                            <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                                <li className="nav-item topbar-user dropdown hidden-caret">
                                    <a
                                        className="dropdown-toggle profile-pic"
                                        data-bs-toggle="dropdown"
                                        href="#"
                                        aria-expanded="false"
                                    >
                                        <div className="avatar-sm">
                                            <img
                                                src="/assets/img/logoUser.png"
                                                alt="..."
                                                className="avatar-img rounded-circle"
                                            />
                                        </div>
                                        <span className="profile-username">
                                            <span className="op-7">Olá,</span>
                                            <UserName />
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Conteúdo Principal */}
                <div className="content">
                    <div className="page-inner">
                        <Outlet />
                    </div>
                </div>

                {/* Footer */}
                <footer className="footer">
                    <div className="container-fluid d-flex justify-content-between">
                        <div className="copyright">© JM Soluções, 2025</div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default DefaultLayout;
