# AGENTS.md

Este repositório contém dois projetos:

- `sentinel/` é um backend em Java Spring Boot.
  - Para rodar o backend: `./mvnw spring-boot:run`
  - Usa autenticação JWT

- `sentinel-front/` é um frontend em React.
  - Para rodar: `npm install && npm start` dentro da pasta

Ambos devem estar integrados via chamadas HTTP.
O backend roda em `http://localhost:8080` e o frontend em `http://localhost:3000`.

1. Introdução
A gestão escolar é um processo multifacetado que envolve a administração eficiente de áreas pedagógicas, administrativas e financeiras. Em instituições de ensino fundamental e básico, é comum que essas atividades sejam realizadas de forma manual ou com sistemas fragmentados, o que resulta em retrabalho, lentidão nas tomadas de decisão e falhas na comunicação entre os diversos atores da comunidade escolar.
Diante dessa realidade, este projeto propõe o desenvolvimento de um Sistema de Gestão Escolar Integrado, com o objetivo de centralizar, digitalizar e automatizar os principais processos da rotina escolar. O sistema será desenvolvido com Java Spring Boot no backend, React.js no frontend e MySQL como banco de dados relacional, adotando uma arquitetura moderna e escalável baseada em APIs RESTful e autenticação via JWT.
A plataforma será acessível via navegador, com interface responsiva e adaptada para diferentes perfis de usuários, incluindo diretores, coordenadores, professores, equipe administrativa, responsáveis e alunos. Cada perfil terá acesso a funcionalidades específicas conforme suas atribuições dentro da escola.
Além de funcionalidades acadêmicas, como matrícula, lançamento de notas, controle de faltas e geração de boletins, o sistema também abrangerá áreas críticas como secretaria escolar, comunicação, gestão financeira, e biblioteca, promovendo maior transparência e eficiência em todos os setores da instituição.

2. Funcionalidades Principais
Gestão Acadêmica
Concentra os processos pedagógicos e organizacionais ligados à vida escolar dos alunos.
Funcionalidades:
•	Cadastro de disciplinas e grades curriculares por série.
•	Organização do calendário letivo (feriados, datas de avaliações, conselhos).
•	Controle de diário de classe (conteúdo ministrado, atividades, avaliações).
•	Lançamento e consulta de notas e faltas.
•	Geração de boletins bimestrais e finais.
•	Registro de ocorrências pedagógicas.


Gestão de Alunos
Gerencia o ciclo de vida do aluno dentro da escola.
Funcionalidades:
•	Matrícula, rematrícula, transferência e evasão escolar.
•	Cadastro completo de dados pessoais e escolares.
•	Vinculação a turma, série e responsável.
•	Histórico escolar e documentos do aluno.
•	Acompanhamento de desempenho individual.


Gestão de Professores
Administra as informações e atividades docentes.
Funcionalidades:
•	Cadastro de professores e vinculação a disciplinas/turmas.
•	Controle de carga horária e atribuição de aulas.
•	Acesso ao diário de classe digital.
•	Plano de ensino e cronograma de aulas.
•	Emissão de relatórios pedagógicos.
•	
Secretaria Escolar
Centraliza os serviços burocráticos e administrativos.
Funcionalidades:
•	Emissão de documentos oficiais (declarações, atestados, históricos).
•	Gestão de arquivos e registros escolares.
•	Atendimento às solicitações de alunos e responsáveis.
•	Gestão de protocolo de documentos.
•	Controle de entrada e saída de alunos.


Financeiro
Gerencia as finanças da instituição.
Funcionalidades:
•	Cadastro de planos financeiros e mensalidades.
•	Geração e envio de boletos bancários.
•	Controle de inadimplência e recebimentos.
•	Relatórios de fluxo de caixa.
•	Registro de despesas e receitas diversas.


Gestão Administrativa
Cuida da administração geral da escola.
Funcionalidades:
•	Controle de usuários e permissões de acesso.
•	Cadastro de colaboradores e setores.
•	Gestão de recursos materiais e patrimoniais.
•	Planejamento estratégico e metas institucionais.
•	Controle de contratos (fornecedores, prestadores).

Comunicação Escolar
Facilita a interação entre escola, alunos, professores e responsáveis.
Funcionalidades:
•	Envio de comunicados e mensagens por canal interno.
•	Avisos por email, aplicativo ou SMS.
•	Agenda escolar compartilhada.
•	Canal de dúvidas e atendimento online.
•	Registro de interações entre pais e escola.

Biblioteca
Organiza o acervo literário e acadêmico da escola.
Funcionalidades:
•	Cadastro e catalogação de livros e materiais.
•	Empréstimo e devolução com controle de prazos.
•	Reservas de livros.
•	Histórico de empréstimos por aluno ou professor.
•	Relatórios de uso do acervo.

Relatórios e Indicadores
Disponibiliza informações estratégicas para a gestão.
Funcionalidades:
•	Geração de relatórios por área (acadêmica, financeira, administrativa).
•	Indicadores de desempenho escolar (notas, frequência, aprovação).
•	Relatórios de matrícula, evasão, inadimplência.
•	Gráficos analíticos e dashboards interativos.
•	Exportação em PDF, Excel e outros formatos.

3. Objetivos do Projeto
Desenvolver uma plataforma digital para gestão escolar que atenda às necessidades administrativas, pedagógicas e financeiras de escolas de ensino fundamental e básico, promovendo eficiência na organização, transparência nos processos e melhor comunicação entre escola, alunos e responsáveis.

Qual problema o software resolve?
•	Falta de centralização na gestão escolar (acadêmica, administrativa e financeira).
•	Processos manuais e propensos a erro, como lançamento de notas e controle financeiro.
•	Comunicação ineficiente entre escola, professores, alunos e responsáveis.
Quem usará? (Público-alvo)
•	Gestores escolares (diretor, coordenador)
•	Professores e equipe pedagógica
•	Secretaria e setor financeiro da escola
•	Alunos e seus responsáveis
Qual o objetivo final do sistema?
•	Digitalizar e centralizar a gestão escolar.
•	Aumentar a eficiência dos processos internos.
•	Melhorar a transparência e comunicação entre escola e comunidade escolar.
•	Fornecer relatórios e dados em tempo real para decisões pedagógicas e administrativas.