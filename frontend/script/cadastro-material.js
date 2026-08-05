if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formMaterial");
const mensagem = document.getElementById("mensagem");

const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const materialId = parametros.get("id");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const material = {
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        quantidadeEstoque: Number(document.getElementById("quantidadeEstoque").value),
        estoqueMinimo: Number(document.getElementById("estoqueMinimo").value),
        unidadeMedida: document.getElementById("unidadeMedida").value,
        dataValidade: document.getElementById("dataValidade").value, 
        fornecedor: document.getElementById("fornecedor").value,
        setorDestino: document.getElementById("setorDestino").value,
        statusAlmoxarifado: document.getElementById("statusAlmoxarifado").value || null
    };

    try {
        mostrarMensagem(mensagem, "Salvando material...", "loading");

        const url = materialId
            ? `${API_URL}/materiais/${materialId}`
            : `${API_URL}/materiais/cadastrar`;

        const metodo = materialId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(material)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar material.");
        }

        await resposta.json();

        mostrarMensagem(
            mensagem,
            materialId ? "Material atualizado com sucesso." : "Material cadastrado com sucesso.",
            "success"
        );

        if (!materialId) {
            form.reset();
        }
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
});

async function carregarMaterialParaEdicao() {
    if (!materialId) {
        return;
    }

    modoPagina.textContent = "Edição";
    tituloPagina.textContent = "Editar material";
    descricaoPagina.textContent = "Altere as informações do material.";
    botaoSalvar.textContent = "Salvar alterações";

    try {
        mostrarMensagem(mensagem, "Carregando material...", "loading");

        const resposta = await fetch(`${API_URL}/materiais/${materialId}`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar material.");
        }

        const material = await resposta.json();

        document.getElementById("nome").value = material.nome || "";
        document.getElementById("categoria").value = material.categoria || "";
        document.getElementById("quantidadeEstoque").value = material.quantidadeEstoque ?? "";
        document.getElementById("estoqueMinimo").value = material.estoqueMinimo ?? "";
        document.getElementById("unidadeMedida").value = material.unidadeMedida || "";
        document.getElementById("dataValidade").value = material.dataValidade || "";
        document.getElementById("fornecedor").value = material.fornecedor || "";
        document.getElementById("setorDestino").value = material.setorDestino || "";
        document.getElementById("statusAlmoxarifado").value = material.statusAlmoxarifado || "";

        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

carregarMaterialParaEdicao();
