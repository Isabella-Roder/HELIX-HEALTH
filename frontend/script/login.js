const API_URL = "http://localhost:8080";

const form = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const login = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    try {
        const resposta = await fetch(`${API_URL}/usuarios/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        });

        if (!resposta.ok) {
            throw new Error("Email ou senha invalidos.");
        }

        const usuario = await resposta.json();

        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        if (usuario.tipoUsuario === "PACIENTE") {
            window.location.href = "portal-paciente.html";
        } else if (usuario.profissional) {
            window.location.href = "portal-profissional.html";
        } else {
            window.location.href = "portal-usuario.html";
        }
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});