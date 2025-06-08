import React from 'react';

function ModalCargo({ cargo }) {
  if (!cargo) return null;
  return (
    <div className="modal fade" id="modalVisualizarCargo" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fa fa-briefcase me-2"></i>Detalhes do Cargo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <p><strong>Nome:</strong> {cargo.nome}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCargo;
