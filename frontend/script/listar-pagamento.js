if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const totalPagamentos = document.getElementById("totalPagamentos");
const tabelaPagamentos = document.getElementById("tabelaPagamentos");
const mensagem = document.getElementById("mensagem");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroStatusPagamento = document.getElementById("filtroStatusPagamento");
const filtroFormaPagamento = document.getElementById("filtroFormaPagamento");
const filtroDataVencimento = document.getElementById("filtroDataVencimento");
const filtroDataPagamento = document.getElementById("filtroDataPagamento");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

const totalPendentes = document.getElementById("totalPendentes");
const totalPagos = document.getElementById("totalPagos");
const totalAtrasados = document.getElementById("totalAtrasados");
const totalCancelados = document.getElementById("totalCancelados");

const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

let pagamentosCarregados = [];

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letra) => {
        return letra.toUpperCase();
    });
}

function formatarData(data) {
    if (!data) {
        return "-";
    }

    return new Date(data + "T00:00:00").toLocaleDateString("pt-BR");
}

function formatarValor(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarResumo(pagamentos) {
    totalPendentes.textContent = pagamentos.filter((pagamento) => pagamento.statusPagamento === "PENDENTE").length;
    totalPagos.textContent = pagamentos.filter((pagamento) => pagamento.statusPagamento === "PAGO").length;
    totalAtrasados.textContent = pagamentos.filter((pagamento) => pagamento.statusPagamento === "ATRASADO").length;
    totalCancelados.textContent = pagamentos.filter((pagamento) => pagamento.statusPagamento === "CANCELADO").length;
}

function carregarFiltros() {
    const pacienteId = filtroPaciente.value;
    const status = filtroStatusPagamento.value;
    const formaPag = filtroFormaPagamento.value;
    const dataVenc = filtroDataVencimento.value;
    const dataPag = filtroDataPagamento.value;

    const pagamentosFiltrados = pagamentosCarregados.filter((pagamento) => {
        const pacienteIgual = !pacienteId || (pagamento.paciente && String(pagamento.paciente.id) === pacienteId);
        const statusIgual = !status || pagamento.statusPagamento === status;
        const formaPagIgual = !formaPag || pagamento.formaPagamento === formaPag;
        const dataVencIgual = !dataVenc || pagamento.dataVencimento === dataVenc;
        const dataPagIgual = !dataPag || pagamento.dataPagamento === dataPag;

        return pacienteIgual && statusIgual && formaPagIgual && dataVencIgual && dataPagIgual;
    });

    renderizarPagamentos(pagamentosFiltrados);
}

function renderizarPagamentos(pagamentos) {
    totalPagamentos.textContent = `${pagamentos.length} pagamento(s) encontrado(s)`;
    atualizarResumo(pagamentos);
    tabelaPagamentos.innerHTML = "";

    if (pagamentos.length === 0) {
        tabelaPagamentos.innerHTML = `
            <tr>
                <td colspan="9" class="empty">Nenhum pagamento cadastrado.</td>
            </tr>
        `;
        return;
    }

    pagamentos.forEach((pagamento) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pagamento.id}</td>
            <td>${pagamento.paciente ? pagamento.paciente.nome : "Sem paciente"}</td>
            <td>${pagamento.descricao || "-"}</td>
            <td>${formatarValor(pagamento.valor)}</td>
            <td>${formatarData(pagamento.dataVencimento)}</td>
            <td>${formatarData(pagamento.dataPagamento)}</td>
            <td>${formatarEnum(pagamento.formaPagamento)}</td>
            <td>${formatarEnum(pagamento.statusPagamento)}</td>
            <td>
                <a href="cadastro-pagamento.html?id=${pagamento.id}" class="table-action">Editar</a>
                ${pagamento.statusPagamento !== "PAGO" && pagamento.statusPagamento !== "CANCELADO" ? `
                    <button type="button" onclick="pagarPagamento(${pagamento.id}, '${pagamento.formaPagamento || "PIX"}')" class="table-action">
                        Pagar
                    </button>
                ` : ""}
                <button type="button" onclick="deletarPagamento(${pagamento.id})" class="danger-button">
                    Excluir
                </button>
            </td>
        `;

        tabelaPagamentos.appendChild(linha);
    });
}

async function carregarPagamentos() {
    try {
        mostrarMensagem(mensagem, "Carregando pagamentos...", "loading");

        const resposta = await fetch(`${API_URL}/pagamentos`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar pagamentos.");
        }

        pagamentosCarregados = await resposta.json();

        renderizarPagamentos(pagamentosCarregados);
        
        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        tabelaPagamentos.innerHTML = `
            <tr>
                <td colspan="9" class="empty">Erro ao carregar Pagamentos.</td>
            </tr>
        `;
    }
}

async function deletarPagamento(id) {
    const confirmar = confirm("Deseja excluir este pagamento?");

    if (!confirmar) {
        return;
    }

    try {
        mostrarMensagem(mensagem, "Excluindo pagamento...", "loading");

        const resposta = await fetch(`${API_URL}/pagamentos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir pagamento.");
        }

        pagamentosCarregados = pagamentosCarregados.filter((pagamento) => pagamento.id !== id);
        renderizarPagamentos(pagamentosCarregados);
        mostrarMensagem(mensagem, "Pagamento excluido com sucesso.", "success");
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function pagarPagamento(id, formaPagamento) {
    try {
        mostrarMensagem(mensagem, "Marcando pagamento como pago...", "loading");

        const resposta = await fetch(`${API_URL}/pagamentos/pagar/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formaPagamento)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao pagar pagamento.");
        }

        await carregarPagamentos();
        mostrarMensagem(mensagem, "Pagamento marcado como pago.", "success");
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarPacientes() {
    try {
        const resposta = await fetch(`${API_URL}/pacientes`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar pacientes.");
        }

        const pacientes = await resposta.json();

        pacientes.forEach((paciente) => {
            const option = document.createElement("option");
            option.value = paciente.id;
            option.textContent = paciente.nome;

            filtroPaciente.appendChild(option);
        });
    } catch(erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

botaoFiltrar.addEventListener("click", carregarFiltros);

botaoLimparFiltro.addEventListener("click", () => {
    filtroPaciente.value = "";
    filtroFormaPagamento.value = "";
    filtroStatusPagamento.value = "";
    filtroDataVencimento.value = "";
    filtroDataPagamento.value = "";
    renderizarPagamentos(pagamentosCarregados);
});

botaoAtualizar.addEventListener("click", carregarPagamentos);

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function iniciarPagina() {
    await carregarPagamentos();
    await carregarPacientes();
}

iniciarPagina();
