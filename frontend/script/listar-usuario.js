const API_URL = "http://localhost:8080";

const tabelaUsuarios = document.getElementById("tabelaUsuarios");
const totalUsuarios = document.getElementById("totalUsuarios");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

async function carregarUsuarios() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/usuarios`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar usuarios");
        }

        const usuarios = await resposta.json();

        totalUsuarios.textContent = `${usuarios.length} usuarios encontrados`;

        tabelaUsuarios.innerHTML = "";

        if (usuarios.length === 0) {
            tabelaUsuarios.innerHTML = `
                <tr>
                    <td colspan="6" class="empty">Nenhum usuario cadastrado.</td>
                </tr>
            `;  
            return;
        }

        usuarios.forEach(function (usuario) {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.nomeSocial || "-"}</td>
                <td>${usuario.email}</td>
                <td>${usuario.tipoUsuario}</td>
                <td>${usuario.ativo ? "Ativo" : "Inativo"}</td>

            `;

            tabelaUsuarios.appendChild(linha);
        });

    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

botaoAtualizar.addEventListener("click", carregarUsuarios);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});

carregarUsuarios();
