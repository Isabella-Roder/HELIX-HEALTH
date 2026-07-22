const API_URL = "http://localhost:8080";

const formPaciente = document.getElementById("formPacienteAcesso");
const mensagem = document.getElementById("mensagem");

formPaciente.addEventListener("submit", async function (event) {
    event.preventDefault();

    const pacientes = {
        nome: document.getElementById("nome").value,
        nomeSocial: document.getElementById("nomeSocial").value,
        cpf: document.getElementById("cpf").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        sexo: document.getElementById("sexo").value,
        genero: document.getElementById("genero").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        convenio: document.getElementById("convenio").value,
        contatoEmergencia: document.getElementById("contatoEmergencia").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    try {
        const resposta = await fetch(`${API_URL}/pacientes/cadastrar-com-usuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pacientes)
        });

        if (!resposta.ok) {
            throw new Error("Não foi possivel cadastrar paciente.");
        }

        await resposta.json();

        mensagem.textContent = "Paciente cadastrado com sucesso.";
        formPaciente.reset();
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});