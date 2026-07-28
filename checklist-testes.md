# Checklist de Testes - Helix Health

## Estado salvo

- [x] Unificar CSS do frontend.
- [x] Melhorar visual geral do sistema.
- [x] Testar telas principais com CSS unico.

- [x] Projeto enviado para o GitHub.
- [x] Backend compilando com `mvn test`.
- [x] Usuario inicial Isabella criado automaticamente ao iniciar o Spring Boot.
- [x] Login simplificado para sempre abrir o seletor de portal.

## Login e portal seletor

- [x] Entrar com `isabella@helixhealth.com` e senha `123456`.
- [x] Verificar se aparecem as opcoes Admin, Paciente e Profissional.
- [x] Entrar no portal Admin.
- [x] Entrar no portal Paciente.
- [x] Entrar no portal Profissional.
- [ ] Clicar em Sair e confirmar se volta para o login.

## Meu perfil

- [x] Abrir tela Meu perfil.
- [x] Botao Voltar retorna para o portal correto.
- [x] Trocar portal abre o seletor.
- [x] Mostra dados do usuario.
- [x] Mostra paciente vinculado.
- [x] Mostra profissional vinculado.
- [x] Mostra sexo e genero do paciente.

## Paciente

- [ ] Listar pacientes.
- [ ] Cadastrar paciente.
- [ ] Editar paciente.
- [ ] Deletar paciente.
- [ ] Conferir sexo e genero na tela.

## Profissional

- [ ] Listar profissionais.
- [ ] Cadastrar profissional.
- [ ] Editar profissional.
- [ ] Deletar profissional.
- [ ] Conferir especialidade como enum.

## Usuario

- [ ] Listar usuarios.
- [ ] Cadastrar usuario com um perfil.
- [ ] Cadastrar usuario com mais de um perfil.
- [ ] Vincular usuario a paciente.
- [ ] Vincular usuario a profissional.
- [ ] Editar usuario.
- [ ] Deletar usuario.

## Agendamento

- [x] Listar agendamentos.
- [ ] Cadastrar agendamento.
- [ ] Editar agendamento.
- [x] Deletar agendamento.
- [ ] Ver agendamento no portal do paciente.
- [ ] Ver agendamento no portal do profissional.
- [x] Filtrar agendamentos por paciente.
- [x] Filtrar agendamentos por profissional.
- [x] Filtrar agendamentos por status.
- [x] Filtrar agendamentos por data.
- [x] Bloquear conflito de horario para o mesmo profissional.
- [x] Permitir novo agendamento no horario se o antigo estiver cancelado.
- [x] Cancelar agendamento pela listagem.

## Prontuario

- [ ] Cadastrar prontuario pelo admin.
- [ ] Cadastrar prontuario pelo portal profissional.
- [ ] Listar prontuarios.
- [ ] Ver prontuario no portal do paciente.

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

- [ ] Criar entidade AtendimentoMedico.
- [ ] Criar enum StatusAtendimentoMedico.
- [ ] Criar repository de atendimento medico.
- [ ] Criar service de atendimento medico.
- [ ] Criar controller de atendimento medico.
- [ ] Cadastrar atendimento medico.
- [ ] Listar atendimentos medicos.
- [ ] Editar atendimento medico.
- [ ] Deletar atendimento medico.
- [ ] Filtrar atendimentos por paciente.
- [ ] Filtrar atendimentos por profissional.
- [ ] Filtrar atendimentos por status.
- [ ] Integrar atendimento medico com prontuario.

