import React from 'react';

function InfoItem({ icon, label, value }) {
  return (
    <div className="mb-2">
      <strong><i className={`fas fa-${icon} me-2`}></i>{label}:</strong> {value || "-"}
    </div>
  );
}

function formatarData(dataStr) {
  if (!dataStr) return "-";
  const data = new Date(dataStr);
  return data.toLocaleDateString("pt-BR");
}

function ModalAluno({ aluno }) {
  if (!aluno) return null;
  return (
    <div className="modal fade" id="modalVisualizarAluno" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="fas fa-user-graduate me-2"></i>Detalhes do Aluno</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-tabs mb-3" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#tabAluno" type="button" role="tab">Aluno</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tabResp1" type="button" role="tab">Responsável 1</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tabResp2" type="button" role="tab">Responsável 2</button>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tabAluno" role="tabpanel">
                <InfoItem icon="user" label="Nome" value={aluno.nome} />
                <InfoItem icon="calendar" label="Data de Nascimento" value={formatarData(aluno.data)} />
                <InfoItem icon="venus-mars" label="Gênero" value={aluno.genero} />
                <InfoItem icon="home" label="Endereço" value={`${aluno.rua}, ${aluno.numero} - ${aluno.bairro} - ${aluno.cidade}/${aluno.estado}`} />
                <InfoItem icon="phone" label="Telefone" value={aluno.telefone} />
                <InfoItem icon="envelope" label="Email" value={aluno.email} />
                <InfoItem icon="chalkboard-teacher" label="Turma" value={aluno.turma?.nome} />
              </div>
              <div className="tab-pane fade" id="tabResp1" role="tabpanel">
                <InfoItem icon="user" label="Nome" value={aluno.nome_resp1} />
                <InfoItem icon="phone" label="Telefone" value={aluno.telefone_resp1} />
                <InfoItem icon="envelope" label="Email" value={aluno.email_resp1} />
                <InfoItem icon="id-card" label="CPF" value={aluno.cpf_resp1} />
                <InfoItem icon="map-marker-alt" label="Endereço" value={`${aluno.rua_resp1}, ${aluno.numero_resp1} - ${aluno.bairro_resp1} - ${aluno.cidade_resp1}/${aluno.estado_resp1}`} />
                <InfoItem icon="users" label="Parentesco" value={aluno.parentesco_resp1} />
              </div>
              <div className="tab-pane fade" id="tabResp2" role="tabpanel">
                <InfoItem icon="user" label="Nome" value={aluno.nome_resp2} />
                <InfoItem icon="phone" label="Telefone" value={aluno.telefone_resp2} />
                <InfoItem icon="envelope" label="Email" value={aluno.email_resp2} />
                <InfoItem icon="id-card" label="CPF" value={aluno.cpf_resp2} />
                <InfoItem icon="map-marker-alt" label="Endereço" value={`${aluno.rua_resp2}, ${aluno.numero_resp2} - ${aluno.bairro_resp2} - ${aluno.cidade_resp2}/${aluno.estado_resp2}`} />
                <InfoItem icon="users" label="Parentesco" value={aluno.parentesco_resp2} />
              </div>
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

export default ModalAluno;
