if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const campoBusca = document.getElementById("campoBusca");
const botaoBuscar = document.getElementById("botaoBuscar");
const botaoLimparBusca = document.getElementById("botaoLimparBusca");
const botaoSair = document.getElementById("botaoSair");
const mensagem = document.getElementById("mensagem");

const totalResultados = document.getElementById("totalResultados");
const totalPacientesBusca = document.getElementById("totalPacientesBusca");
const totalProfissionaisBusca = document.getElementById("totalProfissionaisBusca");
const totalRegistrosBusca = document.getElementById("totalRegistrosBusca");

const resultadoPacientes = document.getElementById("resultadoPacientes");
const resultadoProfissionais = document.getElementById("resultadoProfissionais");
const resultadoUsuarios = document.getElementById("resultadoUsuarios");
const resultadoAgendamentos = document.getElementById("resultadoAgendamentos");
const resultadoExames = document.getElementById("resultadoExames");
const resultadoPrescricoes = document.getElementById("resultadoPrescricoes");
const resultadoInternacoes = document.getElementById("resultadoInternacoes");
const resultadoProntuarios = document.getElementById("resultadoProntuarios");

let pacientes = [];
let profissionais = [];
let usuarios = [];
let agendamentos = [];
let exames = [];
let prescricoes = [];
let internacoes = [];
let prontuarios = [];

function normalizarTexto(valor) {
    if (!valor) {
        return "";
    }

    return String(valor).toLowerCase();
}

function itemCombina(item, termo) {
    return JSON.stringify(item).toLowerCase().includes(termo);
}

function mostrarVazio(elemento, texto) {
    elemento.innerHTML = `<p class="empty">${texto}</p>`;
}

async function buscarJson(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar dados.");
    }

    return await resposta.json();
}

async function carregarDados() {
    try {
        mostrarMensagem(mensagem, "Carregando dados da busca...", "loading");

        pacientes = await buscarJson(`${API_URL}/pacientes`);
        profissionais = await buscarJson(`${API_URL}/profissionais`);
        usuarios = await buscarJson(`${API_URL}/usuarios`);
        agendamentos = await buscarJson(`${API_URL}/agendamentos`);
        exames = await buscarJson(`${API_URL}/exames`);
        prescricoes = await buscarJson(`${API_URL}/prescricoes-medicas`);
        internacoes = await buscarJson(`${API_URL}/internacoes`);
        prontuarios = await buscarJson(`${API_URL}/prontuarios`);

        limparMensagem(mensagem);
    } catch (erro) {
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

function renderizarPacientes(lista) {
    resultadoPacientes.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoPacientes, "Nenhum paciente encontrado.");
        return;
    }

    lista.slice(0, 5).forEach((paciente) => {
        resultadoPacientes.innerHTML += `
            <article class="search-result-item">
                <h3>${paciente.nome || "Paciente"}</h3>
                <p><strong>CPF:</strong> ${paciente.cpf || "-"}</p>
                <p><strong>Telefone:</strong> ${paciente.telefone || "-"}</p>
                <p><strong>Convênio:</strong> ${paciente.convenio || "-"}</p>
                <div class="search-result-actions">
                    <a href="detalhes-paciente.html?id=${paciente.id}">Detalhes</a>
                    <a href="cadastro-paciente.html?id=${paciente.id}">Editar</a>
                </div>
            </article>
        `;
    });
}

function renderizarProfissionais(lista) {
    resultadoProfissionais.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoProfissionais, "Nenhum profissional encontrado.");
        return;
    }

    lista.slice(0, 5).forEach((profissional) => {
        resultadoProfissionais.innerHTML += `
            <article class="search-result-item">
                <h3>${profissional.nome || "Profissional"}</h3>
                <p><strong>Tipo:</strong> ${profissional.tipoProfissional || "-"}</p>
                <p><strong>CRM/COREN:</strong> ${profissional.registroProfissional || "-"}</p>
                <p><strong>Telefone:</strong> ${profissional.telefone || "-"}</p>
                <div class="search-result-actions">
                    <a href="cadastro-profissional.html?id=${profissional.id}">Editar</a>
                </div>
            </article>
        `;
    })
}

function renderizarUsuarios(lista) {
    resultadoUsuarios.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoUsuarios, "Nenhum usuário encontrado.");
        return;
    }

    lista.slice(0, 5).forEach((usuario) => {
        resultadoUsuarios.innerHTML += `
            <article class="search-result-item">
                <h3>${usuario.nome || "Usuário"}</h3>
                <p><strong>Email:</strong> ${usuario.email || "-"}</p>
                <p><strong>Tipo:</strong> ${Array.isArray(usuario.tipoUsuario) ? usuario.tipoUsuario.join(", ") : usuario.tipoUsuario}</p>
                <p><strong>Status:</strong> ${usuario.ativo ? "Ativo" : "Inativo"}</p>
                <div class="search-result-actions">
                    <a href="cadastro-usuario.html?id=${usuario.id}">Editar</a>
                </div>
            </article>
        `;
    });
}

function renderizarAgendamentos(lista) {
    resultadoAgendamentos.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoAgendamentos, "Nenhum agendamento encontrado.");
        return;
    }

    lista.slice(0, 5).forEach((agendamento) => {
        resultadoAgendamentos.innerHTML += `
            <article class="search-result-item">
                <h3>${agendamento.dataConsulta || "-"} às ${agendamento.horaConsulta || "-"}</h3>
                <p><strong>Paciente:</strong> ${agendamento.paciente ? agendamento.paciente.nome : "-"}</p>
                <p><strong>Profissional:</strong> ${agendamento.profissional ? agendamento.profissional.nome : "-"}</p>
                <p><strong>Status:</strong> ${agendamento.statusAgendamento || "-"}</p>
                <div class="search-result-actions">
                    <a href="cadastro-agendamento.html?id=${agendamento.id}">Editar</a>
                </div>
            </article>
        `;
    });
}

function renderizarExames(lista) {
    resultadoExames.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoExames, "Nenhum exame encontrado.");
        return;
    }

    lista.slice(0, 5).forEach((exame) => {
        resultadoExames.innerHTML += `
            <article class="search-result-item">
                <h3>${exame.tipoExame || "Exame"}</h3>
                <p><strong>Paciente:</strong> ${exame.paciente ? exame.paciente.nome : "-"}</p>
                <p><strong>Profissional:</strong> ${exame.profissional ? exame.profissional.nome : "-"}</p>
                <p><strong>Status:</strong> ${exame.statusExame || "-"}</p>
                <div class="search-result-actions">
                    <a href="cadastro-exame.html?id=${exame.id}">Editar</a>
                </div>
            </article>
        `;
    });
}

function renderizarPrescricoes(lista) {
    resultadoPrescricoes.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoPrescricoes, "Nenhuma prescrição médica encontrada.");
        return;
    }

    lista.slice(0, 5).forEach((prescricao) => {
        resultadoPrescricoes.innerHTML += `
            <article class="search-result-item">
                <h3>${prescricao.medicamento || "Prescrição"}</h3>
                <p><strong>Paciente:</strong> ${prescricao.paciente ? prescricao.paciente.nome : "-"}</p>
                <p><strong>Profissional:</strong> ${prescricao.profissional ? prescricao.profissional.nome : "-"}</p>
                <p><strong>Dosagem:</strong> ${prescricao.dosagem || "-"}</p>
                <div class="search-result-actions">
                    <a href="cadastro-prescricao.html?id=${prescricao.id}">Editar</a>
                </div>
            </article>
        `;
    });
}

function renderizarInternacoes(lista) {
    resultadoInternacoes.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoInternacoes, "Nenhuma internação encontrada.");
        return;
    }

    lista.slice(0, 5).forEach((internacao) => {
        resultadoInternacoes.innerHTML += `
            <article class="search-result-item">
                <h3>${internacao.statusInternacao || "Internação"}</h3>
                <p><strong>Paciente:</strong> ${internacao.paciente ? internacao.paciente.nome : "-"}</p>
                <p><strong>Profissional:</strong> ${internacao.profissional ? internacao.profissional.nome : "-"}</p>
                <p><strong>Entrada:</strong> ${internacao.dataEntrada || "-"}</p>
                <div class="search-result-actions">
                    <a href="cadastro-internacao.html?id=${internacao.id}">Editar</a>
                </div>
            </article>
        `;
    });
}

function renderizarProntuarios(lista) {
    resultadoProntuarios.innerHTML = "";

    if (lista.length === 0) {
        mostrarVazio(resultadoProntuarios, "Nenhum prontuário encontrado.");
        return;
    }

    lista.slice(0, 5).forEach((prontuario) => {
        resultadoProntuarios.innerHTML += `
            <article class="search-result-item">
                <h3>${prontuario.dataAtendimento || "Prontuário"}</h3>
                <p><strong>Paciente:</strong> ${prontuario.paciente ? prontuario.paciente.nome : "-"}</p>
                <p><strong>Profissional:</strong> ${prontuario.profissional ? prontuario.profissional.nome : "-"}</p>
                <p><strong>Diagnóstico:</strong> ${prontuario.diagnostico || "-"}</p>
                <div class="search-result-actions">
                    <a href="cadastro-prontuario.html?id=${prontuario.id}">Editar</a>
                </div>
            </article>
        `;
    });
}

function executarBusca() {
    const termo = normalizarTexto(campoBusca.value.trim());

    if (!termo) {
        mostrarVazio(mensagem, "Digite algo para buscar.", "warning");
        return;
    }

    const pacientesFiltrados = pacientes.filter((item) => itemCombina(item, termo));
    const profissionaisFiltrados = profissionais.filter((item) => itemCombina(item, termo));
    const usuariosFiltrados = usuarios.filter((item) => itemCombina(item, termo));
    const agendamentosFiltrados = agendamentos.filter((item) => itemCombina(item, termo));
    const examesFiltrados = exames.filter((item) => itemCombina(item, termo));
    const prescricoesFiltradas = prescricoes.filter((item) => itemCombina(item, termo));
    const internacoesFiltradas = internacoes.filter((item) => itemCombina(item, termo));
    const prontuariosFiltrados = prontuarios.filter((item) => itemCombina(item, termo));

    renderizarPacientes(pacientesFiltrados);
    renderizarProfissionais(profissionaisFiltrados);
    renderizarUsuarios(usuariosFiltrados);
    renderizarAgendamentos(agendamentosFiltrados);
    renderizarExames(examesFiltrados);
    renderizarPrescricoes(prescricoesFiltradas);
    renderizarInternacoes(internacoesFiltradas);
    renderizarProntuarios(prontuariosFiltrados);

    const totalRegistro = 
        agendamentosFiltrados.length +
        examesFiltrados.length +
        prescricoesFiltradas.length +
        internacoesFiltradas.length +
        prontuariosFiltrados.length;

    const total = 
        pacientesFiltrados.length +
        profissionaisFiltrados.length +
        usuariosFiltrados.length +
        totalRegistro;

    totalResultados.textContent = total;
    totalPacientesBusca.textContent = pacientesFiltrados.length;
    totalProfissionaisBusca.textContent = profissionaisFiltrados.length;
    totalRegistrosBusca.textContent = totalRegistro;

    mostrarMensagem(mensagem, `${total} resultado(s) encontrado(s).`, "sucess");
}

botaoBuscar.addEventListener("click", executarBusca);

campoBusca.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        executarBusca();
    }
});

function limparBusca() {
    campoBusca.value = "";

    totalResultados.textContent = "0";
    totalPacientesBusca.textContent = "0";
    totalProfissionaisBusca.textContent = "0";
    totalRegistrosBusca.textContent = "0";

    mostrarVazio(resultadoPacientes, "Digite um termo para pesquisar.");
    mostrarVazio(resultadoProfissionais, "Digite um termo para pesquisar.");
    mostrarVazio(resultadoUsuarios, "Digite um termo para pesquisar.");
    mostrarVazio(resultadoAgendamentos, "Digite um termo para pesquisar.");
    mostrarVazio(resultadoExames, "Digite um termo para pesquisar.");
    mostrarVazio(resultadoPrescricoes, "Digite um termo para pesquisar.");
    mostrarVazio(resultadoInternacoes, "Digite um termo para pesquisar.");
    mostrarVazio(resultadoProntuarios, "Digite um termo para pesquisar.");

    limparMensagem(mensagem);
    campoBusca.focus();
}

botaoLimparBusca.addEventListener("click", limparBusca);

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

carregarDados();