if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formProntuario");
const mensagem = document.getElementById("mensagem");
const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const prontuarioId = parametros.get("id");
const pacienteId = parametros.get("pacienteId");
const profissionalId = parametros.get("profissionalId");
const dataAtendimento = parametros.get("dataAtendimento");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const prontuario = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        profissional: {
            id: Number(document.getElementById("profissional").value)
        },
        dataAtendimento: document.getElementById("dataAtendimento").value,
        sintomas: document.getElementById("sintomas").value,
        diagnostico: document.getElementById("diagnostico").value,
        prescricao: document.getElementById("prescricao").value,
        observacoes: document.getElementById("observacoes").value
    };

    try {
        const url = prontuarioId
            ? `${API_URL}/prontuarios/${prontuarioId}`
            : `${API_URL}/prontuarios/cadastrar`;

        const metodo = prontuarioId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prontuario)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar prontuario");
        }

        await resposta.json();

        mensagem.textContent = prontuarioId
            ? "Prontuario atualizado com sucesso."
            : "Prontuario cadastrado com sucesso.";

        if (!prontuarioId) {
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

async function carregarProntuarioParaEdicao() {
    if (!prontuarioId) {
        return;
    }

    modoPagina.textContent = "Edicao";
    tituloPagina.textContent = "Editar Prontuario";
    descricaoPagina.textContent = "Altere as informacoes registradas no atendimento.";
    botaoSalvar.textContent = "Salvar alteracoes";

    try {
        const resposta = await fetch(`${API_URL}/prontuarios/${prontuarioId}`);

        if (!resposta.ok) {
            throw new Error("Prontuario nao encontrado");
        }

        const prontuario = await resposta.json();

        document.getElementById("paciente").value = prontuario.paciente ? prontuario.paciente.id : "";
        document.getElementById("profissional").value = prontuario.profissional ? prontuario.profissional.id : "";
        document.getElementById("dataAtendimento").value = prontuario.dataAtendimento || "";
        document.getElementById("sintomas").value = prontuario.sintomas || "";
        document.getElementById("diagnostico").value = prontuario.diagnostico || "";
        document.getElementById("prescricao").value = prontuario.prescricao || "";
        document.getElementById("observacoes").value = prontuario.observacoes || "";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

function carregarDadosVindosDaConsulta() {
    if (prontuarioId) {
        return;
    }

    if (pacienteId) {
        document.getElementById("paciente").value = pacienteId;
    }

    if (profissionalId) {
        document.getElementById("profissional").value = profissionalId;
    }

    if (dataAtendimento) {
        document.getElementById("dataAtendimento").value = dataAtendimento;
    }
}

async function iniciarPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    carregarDadosVindosDaConsulta();
    await carregarProntuarioParaEdicao();
}

iniciarPagina();
