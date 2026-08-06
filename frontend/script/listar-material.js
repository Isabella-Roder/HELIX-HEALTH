if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const totalMateriais = document.getElementById("totalMateriais");
const tabelaMateriais = document.getElementById("tabelaMateriais");
const mensagem = document.getElementById("mensagem");

const filtroNome = document.getElementById("filtroNome");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroFornecedor = document.getElementById("filtroFornecedor");
const filtroStatus = document.getElementById("filtroStatus");

const totalDisponiveis = document.getElementById("totalDisponiveis");
const totalBaixoEstoque = document.getElementById("totalBaixoEstoque");
const totalVencidos = document.getElementById("totalVencidos");
const totalIndisponiveis = document.getElementById("totalIndisponiveis");

const botaoSair = document.getElementById("botaoSair");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");
const botaoAtualizar = document.getElementById("botaoAtualizar");

let materiaisCarregados = [];

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

function filtrarMateriais() {
    const nome = filtroNome.value.toLowerCase().trim();
    const categoria = filtroCategoria.value.toLowerCase().trim();
    const fornecedorId = filtroFornecedor.value;
    const status = filtroStatus.value;

    const materiaisFiltrados = materiaisCarregados.filter((material) => {
        const nomeIgual = !nome || (material.nome && material.nome.toLowerCase().includes(nome));
        const categoriaIgual = !categoria || (material.categoria && material.categoria.toLowerCase().includes(categoria));
        const fornecedorIgual = !fornecedorId || String(material.fornecedor?.id) === fornecedorId;
        const statusIgual = !status || material.statusAlmoxarifado === status;

        return nomeIgual && categoriaIgual && fornecedorIgual && statusIgual;
    });

    renderizarMateriais(materiaisFiltrados);
}

function renderizarMateriais(materiais) {
    totalMateriais.textContent = `${materiais.length} material(is) encontrado(s).`;
    tabelaMateriais.innerHTML = "";

    atualizarResumo(materiais)

    if (materiais.length === 0) {
        tabelaMateriais.innerHTML = `
            <tr>
                <td colspan="10" class="empty">Nenhum material encontrado.</td>
            </tr>
        `;
        return;
    }

    materiais.forEach((material) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${material.id}</td>
            <td>${material.nome || "-"}</td>
            <td>${material.categoria || "-"}</td>
            <td>${material.quantidadeEstoque ?? "-"}</td>
            <td>${material.estoqueMinimo ?? "-"}</td>
            <td>${material.unidadeMedida || "-"}</td>
            <td>${material.dataValidade || "-"}</td>
            <td>${material.fornecedor?.nome || "-"}</td>
            <td>
                <span class="status-badge ${classeStatus(material.statusAlmoxarifado)}">
                    ${formatarEnum(material.statusAlmoxarifado)}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-material.html?id=${material.id}">Editar</a>
                    <button type="button" onclick="deletarMaterial(${material.id})">Deletar</button>
                </div>
            </td>
        `;

        tabelaMateriais.appendChild(linha);
    })
}

function atualizarResumo(materiais) {
    totalDisponiveis.textContent = materiais.filter((material) => {
        return material.statusAlmoxarifado === "DISPONIVEL";
    }).length;

    totalBaixoEstoque.textContent = materiais.filter((material) => {
        return material.statusAlmoxarifado === "BAIXO_ESTOQUE";
    }).length;

    totalVencidos.textContent = materiais.filter((material) => {
        return material.statusAlmoxarifado === "VENCIDO";
    }).length;

    totalIndisponiveis.textContent = materiais.filter((material) => {
        return material.statusAlmoxarifado === "INDISPONIVEL";
    }).length;
}

async function carregarMateriais() {
    try {
        limparMensagem(mensagem);

        const resposta = await fetch(`${API_URL}/materiais`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar materiais.");
        }

        materiaisCarregados = await resposta.json();
        renderizarMateriais(materiaisCarregados);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
        tabelaMateriais.innerHTML = `
            <tr>
                <td colspan="10" class="empty">Erro ao carregar materiais.</td>
            </tr>
        `;
    }
}

async function deletarMaterial(id) {
    if (!confirm("Tem certeza que deseja deletar este material?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/materiais/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel deletar este material.");
        }

        mostrarMensagem(mensagem, "Material deletado com sucesso.", "success");
        carregarMateriais();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarFornecedorFiltro() {
    try {
        const resposta = await fetch(`${API_URL}/fornecedores`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar fornecedores.");
        }

        const fornecedores = await resposta.json();
        const selectFornecedor = filtroFornecedor;

        fornecedores.forEach((fornecedor) => {
            const option = document.createElement("option");
            option.value = fornecedor.id;
            option.textContent = fornecedor.nome;

            selectFornecedor.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

botaoFiltrar.addEventListener("click", filtrarMateriais);

botaoLimparFiltro.addEventListener("click", () => {
    filtroNome.value = "";
    filtroCategoria.value = "";
    filtroFornecedor.value = "";
    filtroStatus.value = "";
    renderizarMateriais(materiaisCarregados);
});

botaoAtualizar.addEventListener("click", carregarMateriais);

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function iniciarPagina() {
    await carregarFornecedorFiltro();
    await carregarMateriais();
}

iniciarPagina();
