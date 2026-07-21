const API_URL = "http://localhost:8080";

const tabelaProntuarios = document.getElementById("tabelaProntuarios");
const totalProntuarios = document.getElementById("totalProntuarios");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

function limitarTexto(texto) {
    if (!texto) {
        return "-";
    }

    if (texto.length <= 70) {
        return texto;
    }

    return texto.substring(0, 70) + "...";
}

async function carregarProntuarios() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/prontuarios`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar prontuarios");
        }

        const prontuarios = await resposta.json();

        totalProntuarios.textContent = `${prontuarios.length} prontuarios encontrados`;
        tabelaProntuarios.innerHTML = "";

        if (prontuarios.length === 0) {
            tabelaProntuarios.innerHTML = `
                <tr>
                    <td colspan="7" class="empty">Nenhum prontuario cadastrado.</td>
                </tr>
            `;
            return;
        }

        prontuarios.forEach(function (prontuario) {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${prontuario.id}</td>
                <td>${prontuario.paciente ? prontuario.paciente.nome : "-"}</td>
                <td>${prontuario.profissional ? prontuario.profissional.nome : "-"}</td>
                <td>${prontuario.dataAtendimento || "-"}</td>
                <td>${limitarTexto(prontuario.sintomas)}</td>
                <td>${limitarTexto(prontuario.diagnostico)}</td>
                <td>
                    <a href="cadastro-prontuario.html?id=${prontuario.id}">Editar</a>
                    <button type="button" onclick="deletarProntuario(${prontuario.id})">Excluir</button>
                </td>
            `;

            tabelaProntuarios.appendChild(linha);
        });
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function deletarProntuario(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este prontuario?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/prontuarios/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel excluir prontuario");
        }

        mensagem.textContent = "Prontuario excluido com sucesso.";
        carregarProntuarios();
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

botaoAtualizar.addEventListener("click", carregarProntuarios);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});

carregarProntuarios();
