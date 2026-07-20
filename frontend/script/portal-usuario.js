const usuarioSalvo = localStorage.getItem("usuarioLogado");

if (!usuarioSalvo) {
    window.location.href = "login.html";
}

const usuario = JSON.parse(usuarioSalvo);

document.getElementById("nomeUsuario").textContent = usuario.nome;
document.getElementById("tipoUsuario").textContent = usuario.tipoUsuario;
document.getElementById("statusUsuario").textContent = usuario.ativo ? "Ativo" : "Inativo";
document.getElementById("tipoUsuarioPerfil").textContent = usuario.tipoUsuario;
document.getElementById("statusUsuarioPerfil").textContent = usuario.ativo ? "Ativo" : "Inativo";

const botaoSair = document.getElementById("botaoSair");

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});

function carregarTipo() {
    const tipo = usuario.tipoUsuario;

    if (tipo !== "ADMIN") {
        document.querySelector("[data-admin]").style.display = "none";
    }
}
