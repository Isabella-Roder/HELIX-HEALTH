if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const formPrescricao = document.getElementById("formPrescricao");
const mensagem = document.getElementById("mensagem");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const prescricaoId = parametros.get("id");

async function carregarPaciente() {
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

formPrescricao.addEventListener("submit", async function (event) {
    event.preventDefault();

    const prescricao = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        profissional: {
            id: Number(document.getElementById("profissional").value)
        },
        medicamento: document.getElementById("medicamento").value,
        dosagem: document.getElementById("dosagem").value,
        frequencia: document.getElementById("frequencia").value,
        duracao: document.getElementById("duracao").value,
        dataPrescricao: document.getElementById("dataPrescricao").value,
        orientacoes: document.getElementById("orientacoes").value,
    };

    try {
        const url = prescricaoId
            ? `${API_URL}/prescricoes-medicas/${prescricaoId}`
            : `${API_URL}/prescricoes-medicas/cadastrar`;

        const metodo = prescricaoId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(prescricao)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar prescricao.");
        }

        mensagem.textContent = prescricaoId
            ? "Prescrição atualizada com sucesso."
            : "Prescrição cadastrada com sucesso.";

        if (!prescricaoId) {
            formPrescricao.reset();
        }
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});

async function carregarPrescricaoParaEdicao() {
    if (!prescricaoId) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/prescricoes-medicas/${prescricaoId}`);

        if (!resposta.ok) {
            throw new Error("Prescrição não encontrada.");
        }

        const prescricao = await resposta.json();

        document.getElementById("paciente").value = prescricao.paciente ? prescricao.paciente.id : "";
        document.getElementById("profissional").value = prescricao.profissional ? prescricao.profissional.id : "";
        document.getElementById("medicamento").value = prescricao.medicamento || "";
        document.getElementById("dosagem").value = prescricao.dosagem || "";
        document.getElementById("frequencia").value = prescricao.frequencia || "";
        document.getElementById("duracao").value = prescricao.duracao || "";
        document.getElementById("dataPrescricao").value = prescricao.dataPrescricao || "";
        document.getElementById("orientacoes").value = prescricao.orientacoes || "";
        
        document.getElementById("modoPagina").textContent = "Edição";
        document.getElementById("tituloPagina").textContent = "Editar prescrição medica";
        document.getElementById("descricaoPagina").textContent = "Atualize as informações da prescrição medica";
        botaoSalvar.textContent = "Salvar alterações";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function iniciarPagina() {
    await carregarPaciente();
    await carregarProfissionais();
    await carregarPrescricaoParaEdicao();
}

iniciarPagina();