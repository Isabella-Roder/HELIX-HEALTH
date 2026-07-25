if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const tabelaInternacoes = document.getElementById("tabelaInternacoes");
const totalInternacoes = document.getElementById("totalInternacoes");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroProfissional = document.getElementById("filtroProfissional");
const filtroLeito = document.getElementById("filtroLeito");
const filtroStatus = document.getElementById("filtroStatus");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

let internacoesCarregadas = [];

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    });
}

function filtrarInternacoes() {
    const pacienteId = filtroPaciente.value;
    const profissionalId = filtroProfissional.value;
    const leitoId = filtroLeito.value;
    const status = filtroStatus.value;

    const internacoesFiltradas = internacoesCarregadas.filter(function (internacao) {
        const pacienteIgual = !pacienteId || (internacao.paciente && String(internacao.paciente.id) === pacienteId);
        const profissionalIgual = !profissionalId || (internacao.profissional && String(internacao.profissional.id) === profissionalId);
        const leitoIgual = !leitoId || (internacao.leito && String(internacao.leito.id) === leitoId);
        const statusIgual = !status || internacao.statusInternacao === status;
        
        return pacienteIgual && profissionalIgual && leitoIgual && statusIgual;
    });

    renderizarInternacoes(internacoesFiltradas);
}

function renderizarInternacoes(internacoes) {
    totalInternacoes.textContent = `${internacoes.length} internações encontradas.`;
    tabelaInternacoes.innerHTML = "";

    if (internacoes.length === 0) {
        tabelaInternacoes.innerHTML = `
            <tr>
                <td colspan="9" class="empty">Nenhuma internação cadastrada.</td>
            </tr>
        `;
        return;
    }

    internacoes.forEach(function (internacao) {
        const linha = document.createElement("tr");

        const paciente = internacao.paciente;
        const profissional = internacao.profissional;
        const leito = internacao.leito;

        linha.innerHTML = `
            <td>${internacao.id}</td>
            <td>${paciente ? paciente.nome : "-"}</td>
            <td>${profissional ? profissional.nome : "-"}</td>
            <td>${leito ? `${leito.numero} - ${leito.setor}` : "-"}</td>
            <td><span class="status-badge">${formatarEnum(internacao.statusInternacao)}</span></td>
            <td>${internacao.dataEntrada || "-"}</td>
            <td>${internacao.dataAlta || "-"}</td>
            <td class="text-long">${internacao.motivo || "-"}</td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-internacao.html?id=${internacao.id}">Editar</a>
                    <button type="button" onclick="deletarInternacao(${internacao.id})">Deletar</button>
                </div>
            </td>
        `;

        tabelaInternacoes.appendChild(linha);
    });
}

async function carregarInternacoes() {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(`${API_URL}/internacoes`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar internacoes");
        }

        internacoesCarregadas = await resposta.json();
        renderizarInternacoes(internacoesCarregadas);
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
        tabelaInternacoes.innerHTML = `
            <tr>
                <td colspan="9" class="empty">Erro ao carregar internacoes.</td>
            </tr>
        `;
    }
}

async function deletarInternacao(id) {
    const confirmar = confirm("Deseja deletar esta internação?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/internacoes/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar internacao");
        }

        mensagem.textContent = "Internação deletada com sucesso.";
        carregarInternacoes();
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

async function carregarFiltroProfissional() {
    const resposta = await fetch(`${API_URL}/profissionais`);
    const profissionais = await resposta.json();

    profissionais.forEach(function (profissional) {
        const option = document.createElement("option");
        option.value = profissional.id;
        option.textContent = profissional.nome;

        filtroProfissional.appendChild(option);
    });
}

async function carregarFiltroLeito() {
    const resposta = await fetch(`${API_URL}/leitos`);
    const leitos = await resposta.json();

    leitos.forEach(function (leito) {
        const option = document.createElement("option");
        option.value = leito.id;
        option.textContent = leito.numero;

        filtroLeito.appendChild(option);
    });
}

botaoFiltrar.addEventListener("click", filtrarInternacoes);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

botaoAtualizar.addEventListener("click", carregarInternacoes);

botaoLimparFiltro.addEventListener("click", function () {
    filtroPaciente.value = "";
    filtroProfissional.value = "";
    filtroLeito.value = "";
    filtroStatus.value = "";
    renderizarInternacoes(internacoesCarregadas);
});

async function iniciarPagina() {
    await carregarFiltroPaciente();
    await carregarFiltroProfissional();
    await carregarFiltroLeito();
    await carregarInternacoes();
}

iniciarPagina();