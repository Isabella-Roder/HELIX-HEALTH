const usuarioLogado = localStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    window.location.href = "login.html";
} else {
    try {
        JSON.parse(usuarioLogado);
    } catch (erro) {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html";
    }
}
