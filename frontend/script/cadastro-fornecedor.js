if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formFornecedor");
const mensagem = document.getElementById("mensagem");

const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const fornecedorId = parametros.get("id");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fornecedor = {
        nome: document.getElementById("nome").value,
        cnpj: document.getElementById("cnpj").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        ativo: document.getElementById("ativo").value === "true"
    };

    try {
        mostrarMensagem(mensagem, "Salvando fornecedor...", "loading");

        const url = fornecedorId
            ? `${API_URL}/fornecedores/${fornecedorId}`
            : `${API_URL}/fornecedores/cadastrar`;

        const metodo = fornecedorId ? "PUT" : "POST";
        
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fornecedor)
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel salvar fornecedor.");
        }

        await resposta.json();

        mostrarMensagem(
            mensagem,
            fornecedorId ? "Fornecedor atualizado com secesso." : "Fornecedor cadastrado com sucesso.",
            "success"
        );

        if (!fornecedorId) {
            form.reset();
        }
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
});

async function carregarFornecedorParaEdicao() {
    if (!fornecedorId) {
        return;
    }

    modoPagina.textContent = "Edição"
    tituloPagina.textContent = "Editar fornecedor";
    descricaoPagina.textContent = "Altere as informações do fornecedor.";
    botaoSalvar.textContent = "Salvar alterações";

    try {
        mostrarMensagem(mensagem, "Carregando fornecedor...", "loading");

        const resposta = await fetch(`${API_URL}/fornecedores/${fornecedorId}`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar fornecedor.");
        }

        const fornecedor = await resposta.json();
    
        document.getElementById("nome").value = fornecedor.nome || "";
        document.getElementById("cnpj").value = fornecedor.cnpj || "";
        document.getElementById("telefone").value = fornecedor.telefone || "";
        document.getElementById("email").value = fornecedor.email || "";
        document.getElementById("endereco").value = fornecedor.endereco || "";
        document.getElementById("ativo").value = String(fornecedor.ativo);

        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

carregarFornecedorParaEdicao();