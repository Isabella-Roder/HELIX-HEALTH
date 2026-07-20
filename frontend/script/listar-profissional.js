const API_URL = "http://localhost:8080";

const tabelaProfissionais = document.getElementById("tabelaProfissionais");
const totalProfissionais = document.getElementById("totalProfissionais");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

async function carregarProfissionais() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/profissionais`);

        if (!resposta.ok) {
            throw new Error("Não foi possivel carregar profissionais");
        }

        const profissionais = await resposta.json();

        totalProfissionais.textContent = `${profissionais.length} profissionais encontrados`;
        tabelaProfissionais.innerHTML = "";

        if (profissionais.length === 0) {
            tabelaProfissionais.innerHTML = `
                <tr>
                    <td colspan="9" class="empty">Nenhum profissional cadastrado.</td>
                </tr>
            `;
            return;
        }

        profissionais.forEach(function (profissional) {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                 <td>${profissional.id}</td>
                <td>${profissional.nome}</td>
                <td>${profissional.cpf}</td>
                <td>${profissional.telefone}</td>
                <td>${profissional.email}</td>
                <td>${profissional.tipoProfissional}</td>
                <td>${profissional.especialidadeProfissional || "-"}</td>
                <td>${profissional.ativo ? "Ativo" : "Inativo"}</td>
                <td>
                    <a href="cadastro-profissional.html?id=${profissional.id}">Editar</a>
                    <button type="button" onclick="deletarProfissional(${profissional.id})">Excluir</button>
                </td>
            `;

            tabelaProfissionais.appendChild(linha);
        });
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function deletarProfissional(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este profissional?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/profissionais/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possivel excluir profissional");
        }

        mensagem.textContent = "Profissional excluido com sucesso.";
        carregarProfissionais();
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

botaoAtualizar.addEventListener("click", carregarProfissionais);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});

carregarProfissionais();