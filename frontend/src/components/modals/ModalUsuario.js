import React from 'react';

function ModalUsuario({ usuario }) {
  if (!usuario) return null;
  return (
    <div className="modal fade" id="modalVisualizarUsuario" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fa fa-user me-2"></i>Detalhes do Usuário</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <div>
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Permissão:</strong> {usuario.permissaoGrupo?.nome}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUsuario;
