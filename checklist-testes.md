# Checklist de Testes - Helix Health

## Estado salvo

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

- [ ] Listar agendamentos.
- [ ] Cadastrar agendamento.
- [ ] Editar agendamento.
- [ ] Deletar agendamento.
- [ ] Ver agendamento no portal do paciente.
- [ ] Ver agendamento no portal do profissional.

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
