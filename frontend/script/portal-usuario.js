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

function listarTiposUsuario(usuario) {
    return Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario.join(", ")
        : usuario.tipoUsuario;
}

function temTipo(usuario, tipoUsuario) {
    const tipos = Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario
        : [usuario.tipoUsuario];

    return tipos.includes(tipoUsuario);
}

document.getElementById("nomeUsuario").textContent = usuario.nome;
document.getElementById("tipoUsuario").textContent = listarTiposUsuario(usuario);
document.getElementById("statusUsuario").textContent = usuario.ativo ? "Ativo" : "Inativo";
document.getElementById("tipoUsuarioPerfil").textContent = listarTiposUsuario(usuario);
document.getElementById("statusUsuarioPerfil").textContent = usuario.ativo ? "Ativo" : "Inativo";

const botaoSair = document.getElementById("botaoSair");

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.replace("login.html");
});

function carregarTipo() {
    if (!temTipo(usuario, "ADMIN")) {
        document.querySelectorAll("[data-admin]").forEach(function (link) {
            link.style.display = "none";
        });
    }
}

carregarTipo();
