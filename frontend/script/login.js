const API_URL = "http://localhost:8080";

const form = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

function temTipo(usuario, tipoUsuario) {
    const tipos = Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario
        : [usuario.tipoUsuario];

    return tipos.includes(tipoUsuario);
}

function contarPortaisDisponiveis(usuario) {
    let total = 0;

    if (temTipo(usuario, "PACIENTE") && usuario.paciente) {
        total++;
    }

    if (usuario.profissional) {
        total++;
    }

    if (temTipo(usuario, "ADMIN")) {
        total++;
    }

    return total;
}

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
        localStorage.removeItem("perfilSelecionado");

        if (contarPortaisDisponiveis(usuario) > 1) {
            window.location.href = "portal-seletor.html";
        } else if (temTipo(usuario, "PACIENTE") && usuario.paciente) {
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
