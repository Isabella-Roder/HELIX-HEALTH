const API_URL = "http://localhost:8080";

const tabelaAgendamentos = document.getElementById("tabelaAgendamentos");
const totalAgendamentos = document.getElementById("totalAgendamentos");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

async function carregarAgendamentos() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/agendamentos`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar agendamentos");
        }

        const agendamentos = await resposta.json();

        totalAgendamentos.textContent = `${agendamentos.length} agendamentos encontrados`;
        tabelaAgendamentos.innerHTML = "";

        if (agendamentos.length === 0) {
            tabelaAgendamentos.innerHTML = `
                <tr>
                    <td colspan="8" class="empty">Nenhum agendamento cadastrado.</td>
                </tr>
            `;
            return;
        }

        agendamentos.forEach(function (agendamento) {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${agendamento.id}</td>
                <td>${agendamento.paciente ? agendamento.paciente.nome : "-"}</td>
                <td>${agendamento.profissional ? agendamento.profissional.nome : "-"}</td>
                <td>${agendamento.dataConsulta || "-"}</td>
                <td>${agendamento.horaConsulta || "-"}</td>
                <td>${agendamento.statusAgendamento || "-"}</td>
                <td>${agendamento.observacao || "-"}</td>
                <td>
                    <a href="cadastro-agendamento.html?id=${agendamento.id}">Editar</a>
                    <button type="button" onclick="deletarAgendamento(${agendamento.id})">Excluir</button>
                </td>
            `;

            tabelaAgendamentos.appendChild(linha);
        });
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function deletarAgendamento(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este agendamento?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/agendamentos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel excluir agendamento");
        }

        mensagem.textContent = "Agendamento excluido com sucesso.";
        carregarAgendamentos();
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

botaoAtualizar.addEventListener("click", carregarAgendamentos);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});

carregarAgendamentos();