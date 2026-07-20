const API_URL = "http://localhost:8080";

const form = document.getElementById("formPaciente");
const mensagem = document.getElementById("mensagem");

const parametros = new URLSearchParams(window.location.search);
const pacienteId = parametros.get("id");

const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const paciente = {
        nome: document.getElementById("nome").value,
        nomeSocial: document.getElementById("nomeSocial").value,
        cpf: document.getElementById("cpf").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        convenio: document.getElementById("convenio").value,
        contatoEmergencia: document.getElementById("contatoEmergencia").value
    };

    try {
        const url = pacienteId
            ? `${API_URL}/pacientes/${pacienteId}`
            : `${API_URL}/pacientes/cadastrar`;

        const metodo = pacienteId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paciente)
        })

        if (!resposta.ok) {
            throw new Error("Nao foi possivel cadastrar paciente");
        }

        await resposta.json();

        mensagem.textContent = pacienteId
            ? "Paciente atualizado com sucesso."
            : "Paciente cadastrado com sucesso.";
        form.reset();
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});

async function carregarPacienteParaEdicao() {
    if (!pacienteId) {
        return;
    }

    modoPagina.textContent = "Edição";
    tituloPagina.textContent = "Editar Paciente";
    descricaoPagina.textContent = "Altere as informações do paciente";
    botaoSalvar.textContent = "Salvar alterações";

    try {
        const resposta = await fetch(`${API_URL}/pacientes/${pacienteId}`);

        if (!resposta.ok) {
            throw new Error("Paciente nao encontrado");
        }

        const paciente = await resposta.json();

        document.getElementById("nome").value = paciente.nome || "";
        document.getElementById("nomeSocial").value = paciente.nomeSocial || "";
        document.getElementById("cpf").value = paciente.cpf || "";
        document.getElementById("dataNascimento").value = paciente.dataNascimento || "";
        document.getElementById("telefone").value = paciente.telefone || "";
        document.getElementById("endereco").value = paciente.endereco || "";
        document.getElementById("convenio").value = paciente.convenio || "";
        document.getElementById("contatoEmergencia").value = paciente.contatoEmergencia || "";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

carregarPacienteParaEdicao();
