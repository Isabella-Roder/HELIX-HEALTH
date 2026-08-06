if (window.acessoBloqueado) {
    throw new Error("Acesso bloquado.");
}

const API_URL = "http://localhost:8080";

const totalmovimentacoes = document.getElementById("totalMovimentacoes");
const tabelaMovimentacoes = document.getElementById("tabelaMovimentacoes");

const filtroMaterial = document.getElementById("filtroMaterial");
const filtroTipo = document.getElementById("filtroTipo");
const filtroSetor = document.getElementById("filtroSetor");
const filtroResponsavel = document.getElementById("filtroResponsavel");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

const totalEntradas = document.getElementById("totalEntradas");
const totalSaidas = document.getElementById("totalSaidas");
const totalQuantidadeEntrada = document.getElementById("totalQuantidadeEntrada");
const totalQuantidadeSaida = document.getElementById("totalQuantidadeSaida");

const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");
const mensagem = document.getElementById("mensagem");

let movimentacoesCarregadas = [];
let materiaisCarregados = [];
let responsaveisCarregados = [];

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

function formatarEnum(valor) {
    if (!valor) {
        return "";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letra) => {
        return letra.toUpperCase();
    });
}

function classeTipo(tipo) {
    if (tipo === "ENTRADA") {
        return "status-realizado";
    }

    if (tipo === "SAIDA") {
        return "status-cancelado";
    }

    return "";
}

function filtrarMovimentacoes() {
    const materialId = filtroMaterial.value;
    const responsavelId = filtroResponsavel.value;
    const tipo = filtroTipo.value;
    const setor = filtroSetor.value;

    const movimentacoesFiltradas = movimentacoesCarregadas.filter((movimentacao) => {
        const materialIgual = !materialId || (movimentacao.material && String(movimentacao.material.id) === materialId);
        const responsavelIgual = !responsavelId || (movimentacao.responsavel && String(movimentacao.responsavel.id) === responsavelId);
        const tipoIgual = !tipo || movimentacao.tipoMovimentacao === tipo;
        const setorIgual = !setor || movimentacao.setorDestino === setor;

        return materialIgual && responsavelIgual && tipoIgual && setorIgual;
    });

    renderizarMovimentacoes(movimentacoesFiltradas);
}

function renderizarMovimentacoes(movimentacoes) {
    totalmovimentacoes.textContent = `${movimentacoes.length} Movimentação(ões) encontrado(s).`;
    tabelaMovimentacoes.innerHTML = "";

    resumoMovimentacoes(movimentacoes);

    if (movimentacoes.length === 0) {
        tabelaMovimentacoes.innerHTML = `
            <tr>
                <td colspan="8" class="empty">Nenhuma movimentação cadastrada ainda.</td>
            </tr>
        `;
        return;
    }

    movimentacoes.forEach((movimentacao) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${movimentacao.id}</td>
            <td>${formatarDataHora(movimentacao.dataMovimentacao)}</td>
            <td>${movimentacao.material?.nome || "-"}</td>
            <td>
                <span class="status-badge ${classeTipo(movimentacao.tipoMovimentacao)}">
                    ${formatarEnum(movimentacao.tipoMovimentacao)}
                </span>
            </td>
            <td>${movimentacao.quantidade ?? "-"}</td>
            <td>${movimentacao.setorDestino || "-"}</td>
            <td>${movimentacao.responsavel?.nome || "-"}</td>
            <td class="text-long">${movimentacao.observacao || "-"}</td>
        `;

        tabelaMovimentacoes.appendChild(linha);
    });
}

async function carregarMovimentacoes() {
    try {
        const resposta = await fetch(`${API_URL}/movimentacoes`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar movimentacoes.");
        }

        movimentacoesCarregadas = await resposta.json();
        renderizarMovimentacoes(movimentacoesCarregadas);
    } catch (erro) {
        console.error(erro);
        tabelaMovimentacoes.innerHTML = `
            <tr>
                <td colspan="8" class="empty">Erro ao carregar movimentacoes.</td>
            </tr>
        `;
    }
}

function resumoMovimentacoes(movimentacoes) {
    totalEntradas.textContent = movimentacoes.filter((movimentacao) => {
        return movimentacao.tipoMovimentacao === "ENTRADA";
    }).length;

    totalSaidas.textContent = movimentacoes.filter((movimentacao) => {
        return movimentacao.tipoMovimentacao === "SAIDA";
    }).length;

    totalQuantidadeEntrada.textContent = movimentacoes
        .filter((movimentacao) => movimentacao.tipoMovimentacao === "ENTRADA")
        .reduce((total, movimentacao) => total + (movimentacao.quantidade || 0), 0);

    totalQuantidadeSaida.textContent = movimentacoes
        .filter((movimentacao) => movimentacao.tipoMovimentacao === "SAIDA")
        .reduce((total, movimentacao) => total + (movimentacao.quantidade || 0), 0);
}

async function carregarFiltroMaterial() {
    try {
        const resposta = await fetch(`${API_URL}/materiais`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar materiais.");
        }

        const materiais = await resposta.json();
        
        materiais.forEach((material) => {
            const option = document.createElement("option");
            option.value = material.id;
            option.textContent = material.nome;

            filtroMaterial.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarFiltroResponsavel() {
    try {
        const resposta = await fetch(`${API_URL}/profissionais`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar responsaveis");
        }

        const responsaveis = await resposta.json();

        responsaveis.forEach((responsavel) => {
            const option = document.createElement("option");
            option.value = responsavel.id;
            option.textContent = responsavel.nome;

            filtroResponsavel.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

botaoFiltrar.addEventListener("click", filtrarMovimentacoes);

botaoLimparFiltro.addEventListener("click", () => {
    filtroMaterial.value = "";
    filtroTipo.value = "";
    filtroSetor.value = "";
    filtroResponsavel.value = "";
    renderizarMovimentacoes(movimentacoesCarregadas);
});

botaoAtualizar.addEventListener("click", carregarMovimentacoes);

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function iniciarPagina() {
    await carregarFiltroMaterial();
    await carregarFiltroResponsavel();
    await carregarMovimentacoes();
}

iniciarPagina();