if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const tabelaAgendamentos = document.getElementById("tabelaAgendamentos");
const totalAgendamentos = document.getElementById("totalAgendamentos");
const mensagem = document.getElementById("mensagem");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroProfissional = document.getElementById("filtroProfissional");
const filtroStatus = document.getElementById("filtroStatus");
const filtroData = document.getElementById("filtroData");

const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

let agendamentosCarregados = [];
let pacientesCarregados = [];
let profissionaisCarregados = [];

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    });
}

async function carregarPacientes() {
    try {
        const resposta = await fetch(`${API_URL}/pacientes`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar pacientes.");
        }

        pacientesCarregados = await resposta.json();

        pacientesCarregados.forEach(function (paciente) {
            const option = document.createElement("option");
            option.value = paciente.id;
            option.textContent = paciente.nome;

            filtroPaciente.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao carregar pacientes.";
    }
}

async function carregarProfissionais() {
    try {
        const resposta = await fetch(`${API_URL}/profissionais`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar profissionais.");
        }

        profissionaisCarregados = await resposta.json();

        profissionaisCarregados.forEach(function (profissional) {
            const option = document.createElement("option");
            option.value = profissional.id;
            option.textContent = profissional.nome;
            filtroProfissional.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao carregar profissionais.";
    }
}

async function carregarAgendamentos() {
    try {
        mensagem.textContent = "Carregando agendamentos...";

        const resposta = await fetch(`${API_URL}/agendamentos`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar agendamentos.");
        }

        agendamentosCarregados = await resposta.json();

        renderizarAgendamentos(agendamentosCarregados);
        mensagem.textContent = "";
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao carregar agendamentos.";
    }
}

function renderizarAgendamentos(agendamentos) {
    tabelaAgendamentos.innerHTML = "";

    totalAgendamentos.textContent = `${agendamentos.length} agendamentos encontrados`;

    if (agendamentos.length === 0) {
        tabelaAgendamentos.innerHTML = `
            <tr>
                <td colspan="8" class="empty">Nenhum agendamento encontrado.</td>
            </tr>
        `;
        return;
    }

    agendamentos.forEach(function (agendamento) {
        const paciente = agendamento.paciente ? agendamento.paciente.nome : "Sem paciente";
        const profissional = agendamento.profissional ? agendamento.profissional.nome : "Sem profissional";

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${agendamento.id}</td>
            <td>${paciente}</td>
            <td>${profissional}</td>
            <td>${agendamento.dataConsulta || "-"}</td>
            <td>${agendamento.horaConsulta || "-"}</td>
            <td><span class="status-badge">${formatarEnum(agendamento.statusAgendamento)}</span></td>
            <td class="text-long">${agendamento.observacao || "-"}</td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-agendamento.html?id=${agendamento.id}">Editar</a>
                    <button type="button" onclick="deletarAgendamento(${agendamento.id})">Excluir</button>
                </div>
            </td>
        `;

        tabelaAgendamentos.appendChild(linha);
    });
}

function filtrarAgendamentos() {
    const pacienteId = filtroPaciente.value;
    const profissionalId = filtroProfissional.value;
    const status = filtroStatus.value;
    const data = filtroData.value;

    const agendamentosFiltrados = agendamentosCarregados.filter(function (agendamento) {
        const pacienteIgual = !pacienteId || (agendamento.paciente && String(agendamento.paciente.id) === pacienteId);
        const profissionalIgual = !profissionalId || (agendamento.profissional && String(agendamento.profissional.id) === profissionalId);
        const statusIgual = !status || agendamento.statusAgendamento === status;
        const dataIgual = !data || agendamento.dataConsulta === data;

        return pacienteIgual && profissionalIgual && statusIgual && dataIgual;
    });

    renderizarAgendamentos(agendamentosFiltrados);
}

async function deletarAgendamento(id) {
    const confirmar = confirm("Deseja deletar este agendamento?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/agendamentos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar agendamento.");
        }

        mensagem.textContent = "Agendamento deletado com sucesso.";
        await carregarAgendamentos();
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro: " + erro.message;
    }
}

botaoFiltrar.addEventListener("click", filtrarAgendamentos);

botaoLimparFiltro.addEventListener("click", function () {
    filtroPaciente.value = "";
    filtroProfissional.value = "";
    filtroStatus.value = "";
    filtroData.value = "";
    renderizarAgendamentos(agendamentosCarregados);
});

botaoAtualizar.addEventListener("click", carregarAgendamentos);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function iniciarPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    await carregarAgendamentos();
}

iniciarPagina();
