# Helix Health

Helix Health e um sistema hospitalar em desenvolvimento, criado para praticar a construcao de uma aplicacao completa com Java, Spring Boot, HTML, CSS e JavaScript.

O projeto atualmente possui cadastro, listagem, edicao, exclusao e login de usuarios, alem do gerenciamento de pacientes.

## Tecnologias

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database
- Maven
- HTML
- CSS
- JavaScript

## Funcionalidades atuais

### Usuarios

- Cadastro de usuario
- Login de usuario
- Listagem de usuarios
- Edicao de usuario
- Exclusao de usuario
- Controle de status ativo/inativo
- Tipos de usuario, como ADMIN, MEDICO, ENFERMEIRO, RECEPCAO, FINANCEIRO, FARMACIA e ALMOXARIFADO

### Pacientes

- Cadastro de paciente
- Listagem de pacientes
- Edicao de paciente
- Exclusao de paciente
- Registro de CPF, telefone, endereco, convenio, data de nascimento e contato de emergencia

### Portal

- Tela inicial do sistema
- Login com armazenamento do usuario no `localStorage`
- Portal do usuario logado
- Botao de sair
- Atalhos para as telas principais

## Estrutura do projeto

```text
Helix Health/
+-- backend/
|   +-- src/main/java/com/helixhealth/
|       +-- paciente/
|       +-- usuario/
+-- frontend/
|   +-- html/
|   +-- script/
|   +-- style/
+-- requisitos.md
+-- pom.xml
```

## Como rodar o backend

Na raiz do projeto, execute:

```powershell
mvn spring-boot:run -pl backend
```

O backend roda em:

```text
http://localhost:8080
```

## Como abrir o frontend

Abra os arquivos HTML da pasta:

```text
frontend/html
```

Tela inicial:

```text
frontend/html/index.html
```

## Banco de dados

O projeto usa H2 Database com arquivo local.

Console do H2:

```text
http://localhost:8080/h2-console
```

Configuracao principal:

```text
JDBC URL: jdbc:h2:file:./data/helixhealth
User: sa
Password:
```

## Endpoints principais

### Usuarios

- `GET /usuarios`
- `GET /usuarios/{id}`
- `POST /usuarios/cadastrar`
- `POST /usuarios/login`
- `PUT /usuarios/{id}`
- `DELETE /usuarios/{id}`

### Pacientes

- `GET /pacientes`
- `GET /pacientes/{id}`
- `POST /pacientes/cadastrar`
- `PUT /pacientes/{id}`
- `DELETE /pacientes/{id}`

## Proximos passos

- Melhorar validacoes no backend
- Criar relacionamento entre usuario e paciente
- Criar modulo de profissionais
- Criar agendamentos
- Criar prontuario
- Melhorar seguranca do login
- Adicionar testes automatizados
