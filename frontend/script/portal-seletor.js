if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const usuarioSalvo = localStorage.getItem("usuarioLogado");

function redirecionar(destino) {
    window.acessoBloqueado = true;
    window.location.replace(destino);
    throw new Error("Redirecionando acesso.");
}

if (!usuarioSalvo) {
    redirecionar("login.html");
}

const usuario = JSON.parse(usuarioSalvo);
const listaPerfis = document.getElementById("listaPerfis");
const botaoSair = document.getElementById("botaoSair");

function temTipo(usuario, tipoUsuario) {
    const tipos = Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario
        : [usuario.tipoUsuario];

    return tipos.includes(tipoUsuario);
}

function criarCard(titulo, descricao, perfil, destino) {
    const card = document.createElement("button");

    card.type = "button";
    card.classList.add("profile-card");
    card.innerHTML = `
        <strong>${titulo}</strong>
        <span>${descricao}</span>
    `;

    card.addEventListener("click", function () {
        localStorage.setItem("perfilSelecionado", perfil);
        window.location.href = destino;
    });

    listaPerfis.appendChild(card);
}

function carregarPerfis() {
    listaPerfis.innerHTML = "";

    if (temTipo(usuario, "PACIENTE") && usuario.paciente) {
        criarCard(
            "Paciente",
            "Consultar seus dados, agendamentos e prontuario.",
            "PACIENTE",
            "portal-paciente.html?perfil=PACIENTE"
        );
    }

    if (usuario.profissional) {
        criarCard(
            "Profissional",
            "Acompanhar consultas e registrar prontuarios.",
            "PROFISSIONAL",
            "portal-profissional.html?perfil=PROFISSIONAL"
        );
    }

    if (temTipo(usuario, "ADMIN")) {
        criarCard(
            "Admin",
            "Acessar os cadastros e modulos administrativos.",
            "ADMIN",
            "portal-usuario.html?perfil=ADMIN"
        );
    }

    if (!listaPerfis.children.length) {
        listaPerfis.innerHTML = `
            <p class="empty">Nenhum perfil disponivel para esta conta.</p>
        `;
    }
}

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.replace("login.html");
});

carregarPerfis();
