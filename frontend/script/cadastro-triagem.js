if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formTriagem");
const mensagem = document.getElementById("mensagem");

const parametros = new URLSearchParams(window.location.search);
const triagemId = parametros.get("id");

async function extrairMensagemErro(resposta) {
    try {
        const dadoErro = await resposta.json();

        return dadoErro.message || dadoErro.error || "Erro ao salvar triagem.";
    } catch (erro) {
        return "Erro ao salvar triagem.";
    }
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const triagem = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        profissional: {
            id: Number(document.getElementById("profissional").value)
        },
        sintomas: document.getElementById("sintomas").value,
        pressaoArterial: document.getElementById("pressaoArterial").value,
        temperatura: Number(document.getElementById("temperatura").value),
        frequenciaCardiaca: Number(document.getElementById("frequenciaCardiaca").value),
        saturacao: document.getElementById("saturacao").value,
        prioridadeTriagem: document.getElementById("prioridadeTriagem").value,
        statusTriagem: document.getElementById("statusTriagem").value,
        observacao: document.getElementById("observacao").value
    };

    try {
        const url = triagemId
            ? `${API_URL}/triagens/${triagemId}`
            : `${API_URL}/triagens/cadastrar`;

        const metodo = triagemId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(triagem)
        });

        if (!resposta.ok) {
            const mensagemErro = await extrairMensagemErro(resposta);
            throw new Error(mensagemErro);
        }

        await resposta.json();

        mostrarMensagem(mensagem, triagemId ? "Triagem atualizada com sucesso." : "Triagem cadastrada com sucesso.", "success");

        if (!triagemId) {
            form.reset();
        }
    } catch (erro) {
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
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
    const selectProfissional = document.getElementById("profissional");

    try {
        const resposta = await fetch(`${API_URL}/profissionais`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar profissionais");
        }

        const profissionais = await resposta.json();

        selectProfissional.innerHTML = `
            <option value="">Selecione um profissional</option>
        `;

        if (profissionais.length === 0) {
            mostrarMensagem(mensagem, "Nenhum profissional cadastrado.", "warning");
            return;
        }

        profissionais.forEach(function (profissional) {
            const option = document.createElement("option");
            option.value = profissional.id;
            option.textContent = profissional.nome;

            selectProfissional.appendChild(option);
        });
    } catch (erro) {
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarTriagemParaEdicao() {
    if (!triagemId) {
        return;
    }

    document.getElementById("modoPagina").textContent = "Edição";
    document.getElementById("tituloPagina").textContent = "Editar Triagem";
    document.getElementById("descricaoPagina").textContent = "Altere os dados da triagem.";
    document.getElementById("botaoSalvar").textContent = "Salvar alterações";

    try {
        const resposta = await fetch(`${API_URL}/triagens/${triagemId}`);

        if (!resposta.ok) {
            throw new Error("Triagem não encontrado.");
        }

        const triagem = await resposta.json();

        document.getElementById("paciente").value = triagem.paciente ? triagem.paciente.id : "";
        document.getElementById("profissional").value = triagem.profissional ? triagem.profissional.id : "";
        document.getElementById("sintomas").value = triagem.sintomas || "";
        document.getElementById("pressaoArterial").value = triagem.pressaoArterial || "";
        document.getElementById("temperatura").value = triagem.temperatura || "";
        document.getElementById("frequenciaCardiaca").value = triagem.frequenciaCardiaca || "";
        document.getElementById("saturacao").value = triagem.saturacao || "";
        document.getElementById("prioridadeTriagem").value = triagem.prioridadeTriagem || "";
        document.getElementById("statusTriagem").value = triagem.statusTriagem || "";
        document.getElementById("observacao").value = triagem.observacao || ""; 
    } catch (erro) {
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function iniciarPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    await carregarTriagemParaEdicao();
}

iniciarPagina();
