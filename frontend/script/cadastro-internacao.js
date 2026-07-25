if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const formInternacao = document.getElementById("formInternacao");
const mensagem = document.getElementById("mensagem");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const internacaoId = parametros.get("id");

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

async function carregarLeitos() {
    const resposta = await fetch(`${API_URL}/leitos`);
    const leitos = await resposta.json();

    const selectLeito = document.getElementById("leito");

    leitos.forEach(function (leito) {
        const option = document.createElement("option");
        option.value = leito.id;
        option.textContent = leito.numero;

        selectLeito.appendChild(option);
    });
}

formInternacao.addEventListener("submit", async function (event) {
    event.preventDefault();

    const internacao = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        profissional: {
            id: Number(document.getElementById("profissional").value)
        },
        leito: {
            id: Number(document.getElementById("leito").value)
        },
        statusInternacao: document.getElementById("statusInternacao").value,
        dataEntrada: document.getElementById("dataEntrada").value,
        dataAlta: document.getElementById("dataAlta").value || null,
        motivo: document.getElementById("motivo").value,
        observacoes: document.getElementById("observacoes").value
    };

    try {
        const url = internacaoId
            ? `${API_URL}/internacoes/${internacaoId}`
            : `${API_URL}/internacoes/cadastrar`;

        const metodo = internacaoId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(internacao)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar internacao.");
        }

        mensagem.textContent = internacaoId
            ? "Internação atualizada com sucesso."
            : "Internação cadastrada com sucesso.";

        if (!internacaoId) {
            formInternacao.reset();
        }
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});

async function carregarInternacaoParaEdicao() {
    if (!internacaoId) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/internacoes/${internacaoId}`);

        if (!resposta.ok) {
            throw new Error("Internacao nao encontrada.");
        }

        const internacao = await resposta.json();

        document.getElementById("paciente").value = internacao.paciente ? internacao.paciente.id : "";
        document.getElementById("profissional").value = internacao.profissional ? internacao.profissional.id : "";
        document.getElementById("leito").value = internacao.leito ? internacao.leito.id : "";
        document.getElementById("statusInternacao").value = internacao.statusInternacao || "";
        document.getElementById("dataEntrada").value = internacao.dataEntrada || "";
        document.getElementById("dataAlta").value = internacao.dataAlta || "";
        document.getElementById("motivo").value = internacao.motivo || "";
        document.getElementById("observacoes").value = internacao.observacoes || "";

        document.getElementById("modoPagina").textContent = "Edição";
        document.getElementById("tituloPagina").textContent = "Editar Internação";
        document.getElementById("descricaoPagina").textContent = "Atualize as informações da internação.";
        botaoSalvar.textContent = "Salvar alterações";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function inicioPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    await carregarLeitos();
    await carregarInternacaoParaEdicao();
}

inicioPagina();