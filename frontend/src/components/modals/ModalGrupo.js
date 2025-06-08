import React from 'react';

function ModalGrupo({ grupo }) {
  if (!grupo) return null;
  return (
    <div className="modal fade" id="modalVisualizarGrupo" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fa fa-users me-2"></i>Detalhes do Grupo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <div>
              <p><strong>Nome:</strong> {grupo.nome}</p>
              <p><strong>Permissões:</strong> {grupo.permissoes && grupo.permissoes.length > 0 ? grupo.permissoes.map(p => p.nome).join(', ') : 'Nenhuma'}</p>
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

export default ModalGrupo;
