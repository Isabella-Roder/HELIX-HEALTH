if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const tabelaPrescricoes = document.getElementById("tabelaPrescricoes");
const totalPrescricoes = document.getElementById("totalPrescricoes");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroProfissional = document.getElementById("filtroProfissional");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

let prescricoesCarregadas = [];

function filtrarPrescricoes() {
    const pacienteId = filtroPaciente.value;
    const profissionalId = filtroProfissional.value;

    const prescricoesFiltradas = prescricoesCarregadas.filter(function (prescricao) {
        const pacienteIgual = !pacienteId || (prescricao.paciente && String(prescricao.paciente.id) === pacienteId);
        const profissionalIgual = !profissionalId || (prescricao.profissional && String(prescricao.profissional.id) === profissionalId);

        return pacienteIgual && profissionalIgual;
    });

    renderizarPrescricoes(prescricoesFiltradas);
}

function renderizarPrescricoes(prescricoes) {
    totalPrescricoes.textContent = `${prescricoes.length} prescrições encontradas.`;
    tabelaPrescricoes.innerHTML = "";

    if (prescricoes.length === 0) {
        tabelaPrescricoes.innerHTML = `
            <tr>
                <td colspan="10" class="empty">Nenhuma prescrição cadastrada.</td>
            </tr>
        `;
        return;
    }

    prescricoes.forEach(function (prescricao) {
        const linha = document.createElement("tr");

        const paciente = prescricao.paciente;
        const profissional = prescricao.profissional;

        linha.innerHTML = `
            <td>${prescricao.id}</td>
            <td>${paciente ? paciente.nome : "-"}</td>
            <td>${profissional ? profissional.nome : "-"}</td>
            <td>${prescricao.medicamento || "-"}</td>
            <td>${prescricao.dosagem || "-"}</td>
            <td>${prescricao.frequencia || "-"}</td>
            <td>${prescricao.duracao || "-"}</td>
            <td>${prescricao.dataPrescricao || "-"}</td>
            <td class="text-long">${prescricao.orientacoes || "-"}</td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-prescricao.html?id=${prescricao.id}">Editar</a>
                    <button type="button" onclick="deletarPrescricao(${prescricao.id})">Deletar</button>
                </div>
            </td>
        `;

        tabelaPrescricoes.appendChild(linha);
    });
}

async function carregarPrescricoes() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/prescricoes-medicas`);

        if (!resposta.ok) {
            throw new Error("Não foi possivel carregar prescrições.");
        }

        prescricoesCarregadas = await resposta.json();
        renderizarPrescricoes(prescricoesCarregadas);
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
        tabelaPrescricoes.innerHTML = `
            <tr>
                <td colspan="10" class="empty">Erro ao carregar prescricoes.</td>
            </tr>
        `;
    }
}

async function deletarPrescricao(id) {
    const confirmar = confirm("Deseja deletar esta prescrição?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/prescricoes-medicas/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar prescricao.");
        }

        mensagem.textContent = "Prescricao deletada com sucesso.";
        carregarPrescricoes();
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function carregarFiltroPaciente() {
    const resposta = await fetch(`${API_URL}/pacientes`);
    const pacientes = await resposta.json();

    pacientes.forEach(function (paciente) {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = paciente.nome;

        filtroPaciente.appendChild(option);
    });
}

async function carregarFiltroProfissionais() {
    const resposta = await fetch(`${API_URL}/profissionais`);
    const profissionais = await resposta.json();

    profissionais.forEach(function (profissional) {
        const option = document.createElement("option");
        option.value = profissional.id;
        option.textContent = profissional.nome;

        filtroProfissional.appendChild(option);
    });
}

botaoFiltrar.addEventListener("click", filtrarPrescricoes);

botaoLimparFiltro.addEventListener("click", function () {
    filtroPaciente.value = "";
    filtroProfissional.value = "";
    renderizarPrescricoes(prescricoesCarregadas);
});

botaoAtualizar.addEventListener("click", carregarPrescricoes);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function iniciarPagina() {
    await carregarFiltroPaciente();
    await carregarFiltroProfissionais();
    await carregarPrescricoes();
}

iniciarPagina();