# Checklist de Testes - Helix Health

## Estado salvo

- [x] Unificar CSS do frontend.
- [x] Melhorar visual geral do sistema.
- [x] Testar telas principais com CSS unico.

- [x] Projeto enviado para o GitHub.
- [x] Backend compilando com `mvn test`.
- [x] Usuario inicial Isabella criado automaticamente ao iniciar o Spring Boot.
- [x] Login simplificado para sempre abrir o seletor de portal.

## Dashboard admin

- [x] Criar tela de dashboard admin.
- [x] Abrir dashboard pelo portal admin.
- [x] Mostrar totais de pacientes, profissionais, agendamentos, leitos, exames e triagens.
- [x] Mostrar status do dia.
- [x] Mostrar proximos agendamentos, triagens urgentes e exames pendentes.
- [x] Mostrar resumo de leitos.

## Login e portal seletor

- [x] Entrar com `isabella@helixhealth.com` e senha `123456`.
- [x] Verificar se aparecem as opcoes Admin, Paciente e Profissional.
- [x] Entrar no portal Admin.
- [x] Entrar no portal Paciente.
- [x] Entrar no portal Profissional.
- [x] Clicar em Sair e confirmar se volta para o login.

## Meu perfil

- [x] Abrir tela Meu perfil.
- [x] Botao Voltar retorna para o portal correto.
- [x] Trocar portal abre o seletor.
- [x] Mostra dados do usuario.
- [x] Mostra paciente vinculado.
- [x] Mostra profissional vinculado.
- [x] Mostra sexo e genero do paciente.

## Paciente

- [x] Listar pacientes.
- [x] Cadastrar paciente.
- [x] Editar paciente.
- [x] Deletar paciente.
- [x] Conferir sexo e genero na tela.
- [x] Criar tela de detalhes do paciente.
- [x] Ver historico completo do paciente por ID.
- [x] Ver agendamentos, atendimentos, prontuarios, exames, prescricoes, internacoes e triagens nos detalhes.

## Profissional

- [x] Listar profissionais.
- [x] Cadastrar profissional.
- [x] Editar profissional.
- [x] Deletar profissional.
- [x] Conferir especialidade como enum.

## Usuario

- [x] Listar usuarios.
- [x] Cadastrar usuario com um perfil.
- [x] Cadastrar usuario com mais de um perfil.
- [x] Vincular usuario a paciente.
- [x] Vincular usuario a profissional.
- [x] Editar usuario.
- [x] Deletar usuario.

## Agendamento

- [x] Listar agendamentos.
- [x] Cadastrar agendamento.
- [x] Editar agendamento.
- [x] Deletar agendamento.
- [x] Ver agendamento no portal do paciente.
- [x] Ver agendamento no portal do profissional.
- [x] Filtrar agendamentos por paciente.
- [x] Filtrar agendamentos por profissional.
- [x] Filtrar agendamentos por status.
- [x] Filtrar agendamentos por data.
- [x] Bloquear conflito de horario para o mesmo profissional.
- [x] Permitir novo agendamento no horario se o antigo estiver cancelado.
- [x] Cancelar agendamento pela listagem.

## Prontuario

- [x] Cadastrar prontuario pelo admin.
- [x] Cadastrar prontuario pelo portal profissional.
- [x] Listar prontuarios.
- [x] Ver prontuario no portal do paciente.

## Exames

- [x] Criar backend de exames.
- [x] Cadastrar exame.
- [x] Listar exames.
- [x] Editar exame.
- [x] Deletar exame.
- [x] Filtrar exames por paciente.
- [x] Filtrar exames por profissional.
- [x] Filtrar exames por status.
- [x] Ver exames no portal do paciente.
- [x] Ver exames no portal do profissional.

## Prescricoes

- [x] Criar backend de prescricoes.
- [x] Cadastrar prescricao.
- [x] Listar prescricoes.
- [x] Editar prescricao.
- [x] Deletar prescricao.
- [x] Filtrar prescricoes por paciente.
- [x] Filtrar prescricoes por profissional.
- [x] Ver prescricoes no portal do paciente.
- [x] Ver prescricoes no portal do profissional.

## Medicamentos

- [x] Criar entidade Medicamento.
- [x] Criar enum StatusMedicamento.
- [x] Criar repository de medicamento.
- [x] Criar service de medicamento.
- [x] Criar controller de medicamento.
- [x] Cadastrar medicamento.
- [x] Listar medicamentos.
- [x] Editar medicamento.
- [x] Deletar medicamento.
- [x] Filtrar medicamentos por nome.
- [x] Filtrar medicamentos por fornecedor.
- [x] Filtrar medicamentos por status.
- [x] Calcular status automaticamente por estoque e validade.
- [x] Mostrar resumo de disponiveis, baixo estoque, vencidos e indisponiveis.

## Almoxarifado

- [x] Criar entidade Almoxarifado.
- [x] Criar enum StatusAlmoxarifado.
- [x] Criar repository de almoxarifado.
- [x] Criar service de almoxarifado.
- [x] Criar controller de almoxarifado.
- [x] Cadastrar material.
- [x] Listar materiais.
- [x] Editar material.
- [x] Deletar material.
- [x] Filtrar materiais por nome.
- [x] Filtrar materiais por categoria.
- [x] Filtrar materiais por fornecedor.
- [x] Filtrar materiais por setor.
- [x] Filtrar materiais por status.
- [x] Mostrar resumo de disponiveis, baixo estoque, vencidos e indisponiveis.

## Leitos

- [x] Criar backend de leitos.
- [x] Cadastrar leito.
- [x] Listar leitos.
- [x] Editar leito.
- [x] Deletar leito.
- [x] Filtrar leitos por status.
- [x] Filtrar leitos por setor.

## Internacoes

- [x] Criar backend de internacoes.
- [x] Cadastrar internacao.
- [x] Listar internacoes.
- [x] Editar internacao.
- [x] Deletar internacao.
- [x] Filtrar internacoes por paciente.
- [x] Filtrar internacoes por profissional.
- [x] Filtrar internacoes por leito.
- [x] Filtrar internacoes por status.
- [x] Internacao ativa ocupa leito.
- [x] Alta, transferencia ou cancelamento libera leito.
## Triagem

- [x] Criar backend de triagens.
- [x] Cadastrar triagem.
- [x] Listar triagens.
- [x] Deletar triagem.
- [x] Filtrar triagens por paciente.
- [x] Filtrar triagens por profissional.
- [x] Filtrar triagens por prioridade.
- [x] Filtrar triagens por status.
- [x] Iniciar atendimento pela listagem de triagens.
- [x] Finalizar atendimento pela listagem de triagens.
- [x] Iniciar atendimento pelo portal profissional.
- [x] Finalizar atendimento pelo portal profissional.

## Atendimento medico

- [x] Criar entidade AtendimentoMedico.
- [x] Criar enum StatusAtendimentoMedico.
- [x] Criar repository de atendimento medico.
- [x] Criar service de atendimento medico.
- [x] Criar controller de atendimento medico.
- [x] Cadastrar atendimento medico.
- [x] Listar atendimentos medicos.
- [x] Editar atendimento medico.
- [x] Deletar atendimento medico.
- [x] Filtrar atendimentos por paciente.
- [x] Filtrar atendimentos por profissional.
- [x] Filtrar atendimentos por status.
- [x] Integrar atendimento medico com prontuario.
- [x] Abrir atendimento medico pela listagem de triagens.
- [x] Abrir atendimento medico pelo portal profissional.
- [x] Ver atendimentos medicos no portal do paciente.

