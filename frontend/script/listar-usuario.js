if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const tabelaUsuarios = document.getElementById("tabelaUsuarios");
const totalUsuarios = document.getElementById("totalUsuarios");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

function listarTiposUsuario(usuario) {
    return Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario.join(", ")
        : usuario.tipoUsuario;
}

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
                    <td colspan="7" class="empty">Nenhum usuario cadastrado.</td>
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
                <td>${listarTiposUsuario(usuario)}</td>
                <td>${usuario.ativo ? "Ativo" : "Inativo"}</td>
                <td>
                    <a href="cadastro-usuario.html?id=${usuario.id}">Editar</a>
                    <button type="button" onclick="deletarUsuario(${usuario.id})">Excluir</button>
                </td>
            `;

            tabelaUsuarios.appendChild(linha);
        });

    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function deletarUsuario(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este usuario?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel excluir usuario");
        }

        mensagem.textContent = "Usuario excluido com sucesso.";
        carregarUsuarios();
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
