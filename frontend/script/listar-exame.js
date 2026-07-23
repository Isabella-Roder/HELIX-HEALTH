if (window.acessoBloqueado) {
    throw new Error("Acesso Bloqueado");
}

const API_URL = "http://localhost:8080";

const tabelaExames = document.getElementById("tabelaExames");
const totalExames = document.getElementById("totalExames");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroProfissional = document.getElementById("filtroProfissional");
const filtroStatus = document.getElementById("filtroStatus");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

let examesCarregados = [];

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    });
}

function filtrarExames() {
    const pacienteId = filtroPaciente.value;
    const profissionalId = filtroProfissional.value;
    const status = filtroStatus.value;

    const examesFiltrados = examesCarregados.filter(function (exame) {
        const pacienteIgual = !pacienteId || (exame.paciente && String(exame.paciente.id) === pacienteId);
        const profissionalIgual = !profissionalId || (exame.profissional && String(exame.profissional.id) === profissionalId);
        const statusIgual = !status || exame.statusExame === status;

        return pacienteIgual && profissionalIgual && statusIgual;
    });

    renderizarExames(examesFiltrados);
}

function renderizarExames(exames) {
    totalExames.textContent = `${exames.length} exames encontrados.`;
    tabelaExames.innerHTML = "";

    if (exames.length === 0) {
        tabelaExames.innerHTML = `
            <tr>
                <td colspan="8" class="empty">Nenhum exame encontrado.</td>
            </tr>
        `;
        return;
    }

    exames.forEach(function (exame) {
        const linha = document.createElement("tr");

        const paciente = exame.paciente;
        const profissional = exame.profissional;

        linha.innerHTML = `
            <td>${exame.id}</td>
            <td>${paciente ? paciente.nome : "-"}</td>
            <td>${profissional ? profissional.nome : "-"}</td>
            <td>${exame.tipoExame || "-"}</td>
            <td><span class="status-badge">${formatarEnum(exame.statusExame)}</span></td>
            <td>${exame.dataSolicitacao || "-"}</td>
            <td>${exame.resultado || "-"}</td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-exame.html?id=${exame.id}">Editar</a>
                    <button type="button" onclick="deletarExame(${exame.id})">Deletar</button>
                </div>
            </td>
        `;

        tabelaExames.appendChild(linha);
    });
}

async function carregarExames() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/exames`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar exames.");
        }

        examesCarregados = await resposta.json();
        renderizarExames(examesCarregados);
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
        tabelaExames.innerHTML = `
            <tr>
                <td colspan="8" class="empty">Erro ao carregar exames.</td>
            </tr>
        `;
    }
}

async function deletarExame(id) {
    const confirmar = confirm("Deseja deletar este exame?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/exames/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar exame.");
        }

        mensagem.textContent = "Exame deletado com sucesso.";
        carregarExames();
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
        option.textContent = `${profissional.nome} - ${formatarEnum(profissional.tipoProfissional)}`;

        filtroProfissional.appendChild(option);
    });
}

botaoFiltrar.addEventListener("click", filtrarExames);

botaoLimparFiltro.addEventListener("click", function () {
    filtroPaciente.value = "";
    filtroProfissional.value = "";
    filtroStatus.value = "";
    renderizarExames(examesCarregados);
});

botaoAtualizar.addEventListener("click", carregarExames);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function inicioPagina() {
    await carregarFiltroPaciente();
    await carregarFiltroProfissionais();
    await carregarExames();
}

inicioPagina();