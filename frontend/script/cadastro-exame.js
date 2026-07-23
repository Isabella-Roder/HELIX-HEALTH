if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const formExame = document.getElementById("formExame");
const mensagem = document.getElementById("mensagem");
const botaoSalvar = document.getElementById("botaoSalvar");

const paramentros = new URLSearchParams(window.location.search);
const exameId = paramentros.get("id");

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

formExame.addEventListener("submit", async function (event) {
    event.preventDefault();

    const exame = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        profissional: {
            id: Number(document.getElementById("profissional").value)
        },
        tipoExame: document.getElementById("tipoExame").value,
        statusExame: document.getElementById("statusExame").value,
        dataSolicitacao: document.getElementById("dataSolicitacao").value,
        dataResultado: document.getElementById("dataResultado").value || null,
        observacao: document.getElementById("observacao").value,
        resultado: document.getElementById("resultado").value
    };

    try {
        const url = exameId
            ? `${API_URL}/exames/${exameId}`
            : `${API_URL}/exames/cadastrar`;

        const metodo = exameId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exame)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar exame.");
        }

        mensagem.textContent = exameId
            ? "Exame atualizado com sucesso."
            : "Exame cadastrado com sucesso.";

        if (!exameId) {
            formExame.reset();
        }
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});

async function carregarExameParaEdicao() {
    if (!exameId) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/exames/${exameId}`);

        if (!resposta.ok) {
            throw new Error("Exame nao encotrado.");
        }

        const exame = await resposta.json();

        document.getElementById("paciente").value = exame.paciente ? exame.paciente.id : "";
        document.getElementById("profissional").value = exame.profissional ? exame.profissional.id : "";
        document.getElementById("tipoExame").value = exame.tipoExame || "";
        document.getElementById("statusExame").value = exame.statusExame || "";
        document.getElementById("dataSolicitacao").value = exame.dataSolicitacao || "";
        document.getElementById("dataResultado").value = exame.dataResultado || "";
        document.getElementById("observacao").value = exame.observacao || "";
        document.getElementById("resultado").value = exame.resultado || "";

        document.getElementById("modoPagina").textContent = "Edição";
        document.getElementById("tituloPagina").textContent = "Editar Exame";
        document.getElementById("descricaoPagina").textContent = "Atualize as informações da solicitação ou resultado do exame.";
        botaoSalvar.textContent = "Salvar alterações";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function iniciarPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    await carregarExameParaEdicao();
}

iniciarPagina();