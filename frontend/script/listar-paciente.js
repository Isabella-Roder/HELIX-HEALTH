const API_URL = "http://localhost:8080";

const tabelaPacientes = document.getElementById("tabelaPacientes");
const totalPacientes = document.getElementById("totalPacientes");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

async function carregarPaciente() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/pacientes`)

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar pacientes");
        }

        const pacientes = await resposta.json();

        totalPacientes.textContent = `${pacientes.length} pacientes encontrados`;

        tabelaPacientes.innerHTML = "";

        if (pacientes.length === 0) {
            tabelaPacientes.innerHTML = `
                <tr>
                    <td colspan="7" class="empty">Nenhum paciente cadastrado.</td>
                </tr>
            `;
            return;
        }

        pacientes.forEach(function (paciente) {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.nome}</td>
                <td>${paciente.nomeSocial || "-"}</td>
                <td>${paciente.cpf}</td>
                <td>${paciente.telefone}</td>
                <td>${paciente.convenio || "-"}</td>
                <td>${paciente.dataNascimento || "-"}</td>
                <a href="cadastro-paciente.html?id=${paciente.id}">Editar</a>
            `;

            tabelaPacientes.appendChild(linha);
        });

    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

botaoAtualizar.addEventListener("click", carregarPaciente);

botaoSair.addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});

carregarPaciente();