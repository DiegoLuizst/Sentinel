import React from 'react';

function ModalTurma({ turma }) {
  if (!turma) return null;
  return (
    <div className="modal fade" id="modalVisualizarTurma" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fa fa-users me-2"></i>Detalhes da Turma</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <div>
              <p><strong>Nome:</strong> {turma.nome}</p>
              <p><strong>Ano:</strong> {turma.ano}</p>
              <p><strong>Turno:</strong> {turma.turno}</p>
              <p><strong>Sala:</strong> {turma.sala}</p>
              <p><strong>Nível de Ensino:</strong> {turma.nivel}</p>
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

export default ModalTurma;
