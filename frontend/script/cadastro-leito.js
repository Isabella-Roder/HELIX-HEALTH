if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const formLeito = document.getElementById("formLeito");
const mensagem = document.getElementById("mensagem");
const botaoSalvar = document.getElementById("botaoSalvar");

const paramentros = new URLSearchParams(window.location.search);
const leitoId = paramentros.get("id");

formLeito.addEventListener("submit", async function (event) {
    event.preventDefault();

    const leito = {
        numero: document.getElementById("numero").value,
        quarto: document.getElementById("quarto").value,
        setor: document.getElementById("setor").value,
        statusLeito: document.getElementById("statusLeito").value
    };

    try {
        const url = leitoId
            ? `${API_URL}/leitos/${leitoId}`
            : `${API_URL}/leitos/cadastrar`;

        const metodo = leitoId ? "PUT" : "POST"

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(leito)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar leito.");
        }

        mensagem.textContent = leitoId
            ? "Leito atualizado com sucesso."
            : "Leito cadastrado com sucesso.";

        if (!leitoId) {
            formLeito.reset();
        }
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
});

async function carregarLeitoParaEdicao() {
    if (!leitoId) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/leitos/${leitoId}`);

        if (!resposta.ok) {
            throw new Error("Leito nao encontrado.");
        }

        const leito = await resposta.json();

        document.getElementById("numero").value = leito.numero || "";
        document.getElementById("quarto").value = leito.quarto || "";
        document.getElementById("setor").value = leito.setor || "";
        document.getElementById("statusLeito").value = leito.statusLeito;

        document.getElementById("modoPagina").textContent = "Edição";
        document.getElementById("tituloPagina").textContent = "Editar Leito";
        document.getElementById("descricaoPagina").textContent = "Atualiza as informações do leito.";
        botaoSalvar.textContent = "Salvar alterações";
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

carregarLeitoParaEdicao();
