const API_URL = "http://localhost:8080";

const form = document.getElementById("formAgendamento");
const mensagem = document.getElementById("mensagem");
const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const agendamentoId = parametros.get("id");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const agendamento = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        profissional: {
            id: Number(document.getElementById("profissional").value)
        },
        dataConsulta: document.getElementById("dataConsulta").value,
        horaConsulta: document.getElementById("horaConsulta").value,
        statusAgendamento: document.getElementById("statusAgendamento").value,
        observacao: document.getElementById("observacao").value
    };

    try {
        const url = agendamentoId
            ? `${API_URL}/agendamentos/${agendamentoId}`
            : `${API_URL}/agendamentos/cadastrar`;

        const metodo = agendamentoId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamento)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar agendamento");
        }

        await resposta.json();

        mensagem.textContent = agendamentoId
            ? "Agendamento atualizado com sucesso."
            : "Agendamento cadastrado com sucesso.";

        if (!agendamentoId) {
            form.reset();
        }
    } catch (erro) {
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
        option.textContent = `${profissional.nome} - ${profissional.tipoProfissional}`;
        selectProfissional.appendChild(option);
    });
}

async function carregarAgendamentoParaEdicao() {
    if (!agendamentoId) {
        return;
    }

    modoPagina.textContent = "Edição";
    tituloPagina.textContent = "Editar Agendamento";
    descricaoPagina.textContent = "Altere os dados da consulta agendada.";
    botaoSalvar.textContent = "Salvar alterações";

    try {
        const resposta = await fetch(`${API_URL}/agendamentos/${agendamentoId}`);

        if (!resposta.ok) {
            throw new Error("Agendamento nao encotrado");
        }

        const agendamento = await resposta.json();

        document.getElementById("paciente").value = agendamento.paciente ? agendamento.paciente.id : "";
        document.getElementById("profissional").value = agendamento.profissional ? agendamento.profissional.id : "";
        document.getElementById("dataConsulta").value = agendamento.dataConsulta || "";
        document.getElementById("horaConsulta").value = agendamento.horaConsulta || "";
        document.getElementById("statusAgendamento").value = agendamento.statusAgendamento || "AGENDADO";
        document.getElementById("observacao").value = agendamento.observacao || "";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function iniciarPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    await carregarAgendamentoParaEdicao();
}

iniciarPagina();