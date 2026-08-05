if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const filtroNome = document.getElementById("filtroNome");
const filtroFornecedor = document.getElementById("filtroFornecedor");
const filtroStatus = document.getElementById("filtroStatus");

const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

const totalDisponiveis = document.getElementById("totalDisponiveis");
const totalBaixoEstoque = document.getElementById("totalBaixoEstoque");
const totalVencidos = document.getElementById("totalVencidos");
const totalIndisponiveis = document.getElementById("totalIndisponiveis");

const totalMedicamentos = document.getElementById("totalMedicamentos");
const tabelaMedicamentos = document.getElementById("tabelaMedicamentos");

const mensagem = document.getElementById("mensagem");

let medicamentosCarregados = [];

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letra) => {
        return letra.toUpperCase();
    });
}

function classeStatus(status) {
    if (!status) {
        return "";
    }    

    return "status-" + status.toLowerCase().replaceAll("_", "-");
}

function filtrarMedicamento() {
    const nome = filtroNome.value.toLowerCase().trim();
    const fornecedor = filtroFornecedor.value.toLowerCase().trim();
    const status = filtroStatus.value;

    const medicamentosFiltrados = medicamentosCarregados.filter((medicamento) => {
        const nomeIgual = !nome || (medicamento.nome && medicamento.nome.toLowerCase().includes(nome));
        const fornecedorIgual = !fornecedor || (medicamento.fornecedor && medicamento.fornecedor.toLowerCase().includes(fornecedor));
        const statusIgual = !status || medicamento.statusMedicamento === status;

        return nomeIgual && fornecedorIgual && statusIgual;
    });

    renderizarMedicamentos(medicamentosFiltrados);
}

function renderizarMedicamentos(medicamentos) {
    totalMedicamentos.textContent = `${medicamentos.length} medicamento(s) encontrado(s)`;
    tabelaMedicamentos.innerHTML = "";

    atualizarResumo(medicamentos);

    if (medicamentos.length === 0) {
        tabelaMedicamentos.innerHTML = `
            <tr>
                <td colspan="11" class="empty">Nenhum medicamento cadastrado.</td>
            </tr>
        `;
        return;
    }

    medicamentos.forEach((medicamento) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${medicamento.id}</td>
            <td>${medicamento.nome || "-"}</td>
            <td>${medicamento.principioAtivo || "-"}</td>
            <td>${medicamento.dosagem || "-"}</td>
            <td>${medicamento.formaFarmaceutica || "-"}</td>
            <td>${medicamento.quantidadeEstoque ?? "-"}</td>
            <td>${medicamento.estoqueMinimo ?? "-"}</td>
            <td>${medicamento.dataValidade || "-"}</td>
            <td>${medicamento.fornecedor || "-"}</td>
            <td>
                <span class="status-badge ${classeStatus(medicamento.statusMedicamento)}">
                    ${formatarEnum(medicamento.statusMedicamento)}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-medicamento.html?id=${medicamento.id}">Editar</a>
                    <button type="button" onclick="deletarMedicamento(${medicamento.id})">Deletar</button>
                </div>
            </td>
        `;

        tabelaMedicamentos.appendChild(linha);
    });
}

function atualizarResumo(medicamentos) {
    totalDisponiveis.textContent = medicamentos.filter((medicamento) => {
        return medicamento.statusMedicamento === "DISPONIVEL";
    }).length;

    totalBaixoEstoque.textContent = medicamentos.filter((medicamento) => {
        return medicamento.statusMedicamento === "BAIXO_ESTOQUE";
    }).length;

    totalVencidos.textContent = medicamentos.filter((medicamento) => {
        return medicamento.statusMedicamento === "VENCIDO";
    }).length;

    totalIndisponiveis.textContent = medicamentos.filter((medicamento) => {
        return medicamento.statusMedicamento === "INDISPONIVEL";
    }).length;
}

async function carregarMedicamentos() {
    try {
        limparMensagem(mensagem);

        const resposta = await fetch(`${API_URL}/medicamentos`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar medicamentos");
        }

        const medicamentos = await resposta.json();

        medicamentosCarregados = medicamentos;
        renderizarMedicamentos(medicamentos);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
        tabelaMedicamentos.innerHTML = `
            <tr>
                <td colspan="11" class="empty">Erro ao carregar medicamentos.</td>
            </tr>
        `;
    }
}

async function deletarMedicamento(id) {
    if (!confirm("Deseja deletar este medicamento?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/medicamentos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar este medicamento.");
        }

        mostrarMensagem(mensagem, "Medicamento deletado com sucesso.", "success");
        carregarMedicamentos();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

botaoFiltrar.addEventListener("click", filtrarMedicamento);

botaoLimparFiltro.addEventListener("click", () => {
    filtroNome.value = "";
    filtroFornecedor.value = "";
    filtroStatus.value = "";
    renderizarMedicamentos(medicamentosCarregados);
});

botaoAtualizar.addEventListener("click", carregarMedicamentos);

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

carregarMedicamentos();
