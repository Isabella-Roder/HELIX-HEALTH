const API_URL = "http://localhost:8080";

const form = document.getElementById("formUsuario");
const mensagem = document.getElementById("mensagem");
const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const usuarioId = parametros.get("id");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById("nome").value,
        nomeSocial: document.getElementById("nomeSocial").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        tipoUsuario: document.getElementById("tipoUsuario").value,
        ativo: document.getElementById("ativo").value === "true",
        paciente: document.getElementById("paciente").value
            ? { id: Number(document.getElementById("paciente").value)}
            : null
    };

    try {
        const url = usuarioId
            ? `${API_URL}/usuarios/${usuarioId}`
            : `${API_URL}/usuarios/cadastrar`;

        const metodo = usuarioId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar usuario");
        }

        await resposta.json();

        mensagem.textContent = usuarioId
            ? "Usuario atualizado com sucesso."
            : "Usuario cadastrado com sucesso.";

        if (!usuarioId) {
            form.reset();
        }

    }catch (erro) {
        mensagem.textContent = "Erro: " +erro.message;
    }
});

async function carregarUsuarioParaEdicao() {
    if (!usuarioId) {
        return;
    }

    modoPagina.textContent = "Edicao";
    tituloPagina.textContent = "Editar Usuario";
    descricaoPagina.textContent = "Altere os dados da conta de acesso.";
    botaoSalvar.textContent = "Salvar alteracoes";

    try {
        const resposta = await fetch(`${API_URL}/usuarios/${usuarioId}`);

        if (!resposta.ok) {
            throw new Error("Usuario nao encontrado");
        }

        const usuario = await resposta.json();

        document.getElementById("nome").value = usuario.nome || "";
        document.getElementById("nomeSocial").value = usuario.nomeSocial || "";
        document.getElementById("email").value = usuario.email || "";
        document.getElementById("senha").value = usuario.senha || "";
        document.getElementById("tipoUsuario").value = usuario.tipoUsuario || "";
        document.getElementById("ativo").value = String(usuario.ativo);
        document.getElementById("paciente").value = usuario.paciente ? usuario.paciente.id : "";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

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

function controlarCampoPaciente() {
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const campoPaciente = document.getElementById("campoPaciente");

    campoPaciente.style.display = tipoUsuario === "PACIENTE" ? "block" : "none";
}

document.getElementById("tipoUsuario").addEventListener("change", controlarCampoPaciente);

carregarPacientes();
controlarCampoPaciente();
carregarUsuarioParaEdicao();
