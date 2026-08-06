if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formMovimentacao");
const mensagem = document.getElementById("mensagem");
const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const movimentacaoId = parametros.get("id");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const movimentacao = {
        material: {
            id: Number(document.getElementById("material").value)
        },
        tipoMovimentacao: document.getElementById("tipoMovimentacao").value,
        quantidade: Number(document.getElementById("quantidade").value),
        dataMovimentacao: document.getElementById("dataMovimentacao").value || null,
        setorDestino: document.getElementById("setorDestino").value,
        responsavel: {
            id: Number(document.getElementById("responsavel").value)
        },
        observacao: document.getElementById("observacao").value
    };

    try {
        mostrarMensagem(mensagem, "Salvando movimentação...", "loading");

        const url = movimentacaoId
            ? `${API_URL}/movimentacoes/${movimentacaoId}`
            : `${API_URL}/movimentacoes/cadastrar`;

        const metodo = movimentacaoId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movimentacao)
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel salvar movimentacao.");
        }

        await resposta.json();

        mostrarMensagem(
            mensagem,
            movimentacaoId ? "Movimentacao atualizada com sucesso." : "Movimentacao cadastrada com sucesso.",
            "success"
        );

        if (!movimentacaoId) {
            form.reset();
        }
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
});

async function carregarMovimentacaoParaEdicao() {
    if (!movimentacaoId) {
        return
    }

    modoPagina.textContent = "Edicao";
    tituloPagina.textContent = "Editar Movimentacao";
    descricaoPagina.textContent = "Altere as informacoes da movimentacao.";
    botaoSalvar.textContent = "Salvar alteracoes";

    try {
        mostrarMensagem(mensagem, "Carregando movimentacao...", "loading")

        const resposta = await fetch(`${API_URL}/movimentacoes/${movimentacaoId}`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar movimentacao.");
        }

        const movimentacoes = await resposta.json();

        document.getElementById("material").value = movimentacoes.material?.id || "";
        document.getElementById("tipoMovimentacao").value = movimentacoes.tipoMovimentacao || "";
        document.getElementById("quantidade").value = movimentacoes.quantidade ?? "";
        document.getElementById("dataMovimentacao").value = movimentacoes.dataMovimentacao || "";
        document.getElementById("setorDestino").value = movimentacoes.setorDestino || "";
        document.getElementById("responsavel").value = movimentacoes.responsavel?.id || "";
        document.getElementById("observacao").value = movimentacoes.observacao || "";

        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarMateriais() {
    try {
        const resposta = await fetch(`${API_URL}/materiais`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar materiais.");
        }

        const materiais = await resposta.json();
        const selectMaterial = document.getElementById("material");

        materiais.forEach((material) => {
            const option = document.createElement("option");
            option.value = material.id;
            option.textContent = material.nome;

            selectMaterial.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarResponsavel() {
    try {
        const resposta = await fetch(`${API_URL}/profissionais`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar responsavel.");
        }

        const responsaveis = await resposta.json();
        const selectResponsavel = document.getElementById("responsavel");

        responsaveis.forEach((responsavel) => {
            const option = document.createElement("option");
            option.value = responsavel.id;
            option.textContent = responsavel.nome;

            selectResponsavel.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function iniciarPagina() {
    await carregarMateriais();
    await carregarResponsavel();
    await carregarMovimentacaoParaEdicao();
}

iniciarPagina();
