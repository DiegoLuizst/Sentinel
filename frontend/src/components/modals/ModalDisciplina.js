import React from 'react';

function ModalDisciplina({ disciplina }) {
  if (!disciplina) return null;
  return (
    <div className="modal fade" id="modalVisualizarDisciplina" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fa fa-book me-2"></i>Detalhes da Disciplina</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <div>
              <p><strong>Nome:</strong> {disciplina.nome}</p>
              <p><strong>Carga Horária:</strong> {disciplina.carga_horaria}</p>
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

export default ModalDisciplina;
