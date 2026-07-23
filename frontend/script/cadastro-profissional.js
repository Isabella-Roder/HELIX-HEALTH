if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formProfissional");
const mensagem = document.getElementById("mensagem");
const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const profissionalId = parametros.get("id");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const profissional = {
        nome: document.getElementById("nome").value,
        nomeSocial: document.getElementById("nomeSocial").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        tipoProfissional: document.getElementById("tipoProfissional").value,
        especialidadeProfissional: document.getElementById("especialidade").value || null,
        registroProfissional: document.getElementById("registroProfissional").value,
        ativo: document.getElementById("ativo").value === "true"
    };

    try {
        const url = profissionalId
            ? `${API_URL}/profissionais/${profissionalId}`
            : `${API_URL}/profissionais/cadastrar`;

        const metodo = profissionalId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profissional)
        });

        if (!resposta.ok) {
            const textoErro = await resposta.text();
            throw new Error(textoErro || "Erro ao salvar profissional");
        }

        await resposta.json();

        mensagem.textContent = profissionalId
            ? "Profissional atualizado com sucesso."
            : "Profissional cadastrado com sucesso.";

        if (!profissionalId) {
            form.reset();
        }
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});

async function carregarProfissionalParaEdicao() {
    if (!profissionalId) {
        return;
    }

    modoPagina.textContent = "Edição";
    tituloPagina.textContent = "Editar profissional";
    descricaoPagina.textContent = "Altere os dados do profissional";
    botaoSalvar.textContent = "Salvar alterações";

    try {
        const resposta = await fetch(`${API_URL}/profissionais/${profissionalId}`);

        if (!resposta.ok) {
            throw new Error("Profissional não encontrado");
        }

        const profissional = await resposta.json();

        document.getElementById("nome").value = profissional.nome || "";
        document.getElementById("nomeSocial").value = profissional.nomeSocial || "";
        document.getElementById("cpf").value = profissional.cpf || "";
        document.getElementById("telefone").value = profissional.telefone || "";
        document.getElementById("email").value = profissional.email || "";
        document.getElementById("tipoProfissional").value = profissional.tipoProfissional || "";
        document.getElementById("especialidade").value = profissional.especialidadeProfissional || "";
        document.getElementById("registroProfissional").value = profissional.registroProfissional || "";
        document.getElementById("ativo").value = String(profissional.ativo);
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function carregarPacienteOrigem() {
    const resposta = await fetch(`${API_URL}/pacientes`);
    const pacientes = await resposta.json();

    const selectPacienteOrigem = document.getElementById("pacienteOrigem");

    pacientes.forEach(function (paciente) {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = `${paciente.nome} - ${paciente.cpf}`;
        selectPacienteOrigem.appendChild(option);
    });
}

document.getElementById("pacienteOrigem").addEventListener("change", async function () {
    const pacienteId = document.getElementById("pacienteOrigem").value;

    if (!pacienteId) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/pacientes/${pacienteId}`);

        if (!resposta.ok) {
            throw new Error("Paciente não encontrado.");
        }

        const paciente = await resposta.json();

        document.getElementById("nome").value = paciente.nome || "";
        document.getElementById("nomeSocial").value = paciente.nomeSocial || "";
        document.getElementById("cpf").value = paciente.cpf || "";
        document.getElementById("telefone").value = paciente.telefone || "";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});

carregarPacienteOrigem();
carregarProfissionalParaEdicao();
