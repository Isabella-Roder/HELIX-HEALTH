if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const totalFornecedores = document.getElementById("totalFornecedores");
const tabelaFornecedores = document.getElementById("tabelaFornecedores");
const mensagem = document.getElementById("mensagem");

const filtroNome = document.getElementById("filtroNome");
const filtroCnpj = document.getElementById("filtroCnpj");
const filtroAtivo = document.getElementById("filtroAtivo");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");
const botaoAtualizar = document.getElementById("botaoAtualizar");

const totalAtivos = document.getElementById("totalAtivos");
const totalInativos = document.getElementById("totalInativos");
const totalGeral = document.getElementById("totalGeral");

let fornecedoresCarregados = [];

function filtrarFornecedores() {
    const nome = filtroNome.value;
    const cnpj = filtroCnpj.value;
    const ativo = filtroAtivo.value;

    const fornecedoresFiltrados = fornecedoresCarregados.filter((fornecedor) => {
        const nomeIgual = !nome || fornecedor.nome === nome;
        const cnpjIgual = !cnpj || fornecedor.cnpj === cnpj;
        const ativoIgual = !ativo || fornecedor.ativo === (ativo === "true");

        return nomeIgual && cnpjIgual && ativoIgual;
    });

    renderizarFornecedores(fornecedoresFiltrados);
}

function renderizarFornecedores(fornecedores) {
    totalFornecedores.textContent = `${fornecedores.length} fornecedor(es) cadastrado(s).`;
    tabelaFornecedores.innerHTML = "";

    if (fornecedores.length === 0) {
        tabelaFornecedores.innerHTML = `
            <tr>
                <td colspan="8" class="empty">Nenhum fornecedor cadastrado.</td>
            </tr>
        `;
        return;
    }

    fornecedores.forEach((fornecedor) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${fornecedor.id}</td>
            <td>${fornecedor.nome || "-"}</td>
            <td>${fornecedor.cnpj || "-"}</td>
            <td>${fornecedor.telefone || "-"}</td>
            <td>${fornecedor.email || "-"}</td>
            <td>${fornecedor.endereco || "-"}</td>
            <td>
                <span class="status-badge ${fornecedor.ativo ? "status-realizado" : "status-cancelado"}">
                    ${fornecedor.ativo ? "Ativo" : "Inativo"}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-fornecedor.html?id=${fornecedor.id}">Editar</a>
                    <button type="button" onclick="deletarFornecedor(${fornecedor.id})">Deletar</button>
                </div>
            </td>
        `;

        tabelaFornecedores.appendChild(linha);
    });
}

async function carregarFornecedores() {
    try {
        limparMensagem(mensagem);

        const resposta = await fetch(`${API_URL}/fornecedores`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar fornecedores.");
        }

        const fornecedores = await resposta.json();

        fornecedoresCarregados = fornecedores;
        renderizarFornecedores(fornecedoresCarregados);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
        tabelaFornecedores.innerHTML = `
            <tr>
                <td colspan="8" class="empty">Erro ao carregar fornecedores.</td>
            </tr>
        `;
    }
}

async function deletarFornecedor(id) {
    if (!confirm("Deseja deletar este fornecedor?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/fornecedores/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel deletar este fornecedor.");
        }

        mostrarMensagem(mensagem, "Fornecedor deletado com sucesso.", "success");
        carregarFornecedores();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

botaoFiltrar.addEventListener("click", filtrarFornecedores);

botaoLimparFiltro.addEventListener("click", () => {
    filtroNome.value = "";
    filtroCnpj.value = "";
    filtroAtivo.value = "";
    renderizarFornecedores(fornecedoresCarregados);
});

botaoAtualizar.addEventListener("click", carregarFornecedores);

carregarFornecedores();