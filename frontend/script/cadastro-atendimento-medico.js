if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formAtendimentoMedico");
const mensagem = document.getElementById("mensagem");

const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const atendimentoMedicoId = parametros.get("id");
const pacienteId = parametros.get("pacienteId");
const profissionalId = parametros.get("profissionalId");
const triagemId = parametros.get("triagemId");
const agendamentoId = parametros.get("agendamentoId");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const atendimento = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        profissional: {
            id: Number(document.getElementById("profissional").value)
        },
        triagem: document.getElementById("triagem").value ? {
            id: Number(document.getElementById("triagem").value)
        } : null,
        agendamento: document.getElementById("agendamento").value ? {
            id: Number(document.getElementById("agendamento").value)
        } : null,
        dataHoraInicio: document.getElementById("dataHoraInicio").value || null,
        statusAtendimentoMedico: document.getElementById("statusAtendimentoMedico").value,
        queixaPrincipal: document.getElementById("queixaPrincipal").value,
        historiaDoencaAtual: document.getElementById("historiaDoencaAtual").value,
        diagnostico: document.getElementById("diagnostico").value,
        conduta: document.getElementById("conduta").value,
        observacoes: document.getElementById("observacoes").value
    };

    try {
        const url = atendimentoMedicoId
            ? `${API_URL}/atendimentos-medicos/${atendimentoMedicoId}`
            : `${API_URL}/atendimentos-medicos/cadastrar`;

        const metodo = atendimentoMedicoId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atendimento)
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel salvar agendamento");
        }

        await resposta.json();

        mensagem.textContent = atendimentoMedicoId
            ? "Atendimento medico atualizado com sucesso."
            : "Atendimento medico cadastrado com sucesso.";

        if (!atendimentoMedicoId) {
            form.reset();
        }
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro: " + erro.message;
    }
});

async function carregarPacientes() {
    const resposta = await fetch(`${API_URL}/pacientes`);
    const pacientes = await resposta.json();

    const selectPaciente = document.getElementById("paciente");

    pacientes.forEach(function (paciente) {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = paciente.nome;

        selectPaciente.appendChild(option);
    });
}

async function carregarProfissionais() {
    const resposta = await fetch(`${API_URL}/profissionais`);
    const profissionais = await resposta.json();

    const selectProfissional = document.getElementById("profissional");

    profissionais.forEach(function (profissional) {
        const option = document.createElement("option");
        option.value = profissional.id;
        option.textContent = profissional.nome;

        selectProfissional.appendChild(option);
    });
}

async function carregarTriagens() {
    const resposta = await fetch(`${API_URL}/triagens`);
    const triagens = await resposta.json();

    const selectTriagem = document.getElementById("triagem");

    triagens.forEach(function (triagem) {
        const option = document.createElement("option");
        option.value = triagem.id;
        option.textContent = `#${triagem.id} - ${triagem.paciente ? triagem.paciente.nome : "Sem paciente"}`;

        selectTriagem.appendChild(option);
    });
}

async function carregarAgendamentos() {
    const resposta = await fetch(`${API_URL}/agendamentos`);
    const agendamentos = await resposta.json();

    const selectAgendamento = document.getElementById("agendamento");

    agendamentos.forEach(function (agendamento) {
        const option = document.createElement("option");
        option.value = agendamento.id;
        option.textContent = `#${agendamento.id} - ${agendamento.paciente ? agendamento.paciente.nome : "Sem paciente"}`;

        selectAgendamento.appendChild(option);
    });
}

async function carregarAtendimentoMedicoParaEdicao() {
    if (!atendimentoMedicoId) {
        return;
    }

    modoPagina.textContent = "Edição";
    tituloPagina.textContent = "Editar atendimento medico";
    descricaoPagina.textContent = "Altere as informações do atendimento medico.";
    botaoSalvar.textContent = "Salvar alterações";

    try {
        const resposta = await fetch(`${API_URL}/atendimentos-medicos/${atendimentoMedicoId}`);

        if (!resposta.ok) {
            throw new Error("Atendimento medico nao encontrado.");
        }

        const atendimento = await resposta.json();

        document.getElementById("paciente").value = atendimento.paciente ? atendimento.paciente.id : "";
        document.getElementById("profissional").value = atendimento.profissional ? atendimento.profissional.id : "";
        document.getElementById("triagem").value = atendimento.triagem ? atendimento.triagem.id : "";
        document.getElementById("agendamento").value = atendimento.agendamento ? atendimento.agendamento.id : "";
        document.getElementById("dataHoraInicio").value = atendimento.dataHoraInicio || "";
        document.getElementById("statusAtendimentoMedico").value = atendimento.statusAtendimentoMedico || "";
        document.getElementById("queixaPrincipal").value = atendimento.queixaPrincipal || "";
        document.getElementById("historiaDoencaAtual").value = atendimento.historiaDoencaAtual || "";
        document.getElementById("diagnostico").value = atendimento.diagnostico || "";
        document.getElementById("conduta").value = atendimento.conduta || "";
        document.getElementById("observacoes").value = atendimento.observacoes || "";
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro: " + erro.message;
    }
}

function carregarDadosVinculos() {
    if (atendimentoMedicoId) {
        return;
    }

    if (pacienteId) {
        document.getElementById("paciente").value = pacienteId;
    }

    if (profissionalId) {
        document.getElementById("profissional").value = profissionalId;
    }

    if (triagemId) {
        document.getElementById("triagem").value = triagemId;
    }

    if (agendamentoId) {
        document.getElementById("agendamento").value = agendamentoId;
    }
}

async function iniciarPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    await carregarTriagens();
    await carregarAgendamentos();
    await carregarAtendimentoMedicoParaEdicao();
    carregarDadosVinculos();
}

iniciarPagina();