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

function classeStatus(status) {
    if (!status) {
        return "";
    }

    return "status-" + status.toLowerCase().replaceAll("_", "-");
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
        mostrarMensagem(mensagem, "Erro ao carregar pacientes.", "error");
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
        mostrarMensagem(mensagem, "Erro ao carregar profissionais.", "error");
    }
}

async function carregarAgendamentos() {
    try {
        mostrarMensagem(mensagem, "Carregando agendamentos...", "loading");

        const resposta = await fetch(`${API_URL}/agendamentos`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar agendamentos.");
        }

        agendamentosCarregados = await resposta.json();

        renderizarAgendamentos(agendamentosCarregados);
        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro ao carregar agendamentos.", "error");
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
            <td><span class="status-badge ${classeStatus(agendamento.statusAgendamento)}">${formatarEnum(agendamento.statusAgendamento)}</span></td>
            <td class="text-long">${agendamento.observacao || "-"}</td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-agendamento.html?id=${agendamento.id}">Editar</a>

                    ${
                        agendamento.statusAgendamento !== "CANCELADO"
                            ? `<button type="button" onclick="cancelarAgendamento(${agendamento.id})">Cancelar</button>`
                            : ""
                    }

                    <button type="button" onclick="deletarAgendamento(${agendamento.id})">Excluir</button>
                </div>
            </td>
        `;

        tabelaAgendamentos.appendChild(linha);
    });
}

async function cancelarAgendamento(id) {
    const confirmar = confirm("Deseja cancelar este agendamento?");

    if (!confirmar) {
        return;
    }

    try {
        mostrarMensagem(mensagem, "Cancelando agendamentos...", "loading");

        const resposta = await fetch(`${API_URL}/agendamentos/${id}/cancelar`, {
            method: "PUT"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cancelar agendamento.");
        }

        mostrarMensagem(mensagem, "Agendamento cancelado com sucesso.", "success");
        await carregarAgendamentos();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
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

        mostrarMensagem(mensagem, "Agendamento deletado com sucesso.", "success");
        await carregarAgendamentos();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
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
