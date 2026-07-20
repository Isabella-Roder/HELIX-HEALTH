const API_URL = "http://localhost:8080";

const form = document.getElementById("formUsuario");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById("nome").value,
        nomeSocial: document.getElementById("nomeSocial").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        tipoUsuario: document.getElementById("tipoUsuario").value,
        ativo: true
    };

    try {
        const resposta = await fetch(`${API_URL}/usuarios/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar usuario");
        }

        const usuarioSalvo = await resposta.json();

        mensagem.textContent = "Usuario cadastrado com sucesso.";
        form.reset();

    }catch (erro) {
        mensagem.textContent = "Erro: " +erro.message;
    }
})