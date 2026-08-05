if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formMedicamento");
const mensagem = document.getElementById("mensagem");
const modoPagina = document.getElementById("modoPagina");
const tituloPagina = document.getElementById("tituloPagina");
const descricaoPagina = document.getElementById("descricaoPagina");
const botaoSalvar = document.getElementById("botaoSalvar");

const parametros = new URLSearchParams(window.location.search);
const medicamentoId = parametros.get("id");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const medicamento = {
        nome: document.getElementById("nome").value,
        principioAtivo: document.getElementById("principioAtivo").value,
        dosagem: document.getElementById("dosagem").value,
        formaFarmaceutica: document.getElementById("formaFarmaceutica").value,
        quantidadeEstoque: Number(document.getElementById("quantidadeEstoque").value),
        estoqueMinimo: Number(document.getElementById("estoqueMinimo").value),
        dataValidade: document.getElementById("dataValidade").value,
        fornecedor: document.getElementById("fornecedor").value
    };

    try {
        mostrarMensagem(mensagem, "Salvando medicamento...", "loading");

        const url = medicamentoId
            ? `${API_URL}/medicamentos/${medicamentoId}`
            : `${API_URL}/medicamentos/cadastrar`;

        const metodo = medicamentoId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicamento)
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel salvar medicamento.");
        }

        await resposta.json();

        mostrarMensagem(
            mensagem,
            medicamentoId ? "Medicamento atualizado com sucesso" : "Medicamento cadastrado com sucesso.",
            "success"
        );

        if (!medicamentoId) {
            form.reset();
        }
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
});

async function carregarMedicamentoParaEdicao() {
    if (!medicamentoId) {
        return;
    }

    modoPagina.textContent = "Edição";
    tituloPagina.textContent = "Editar Medicamento";
    descricaoPagina.textContent = "Altere as informações do medicamento.";
    botaoSalvar.textContent = "Salvar alterações";

    try {
        mostrarMensagem(mensagem, "Carregando medicamento...", "loading");

        const resposta = await fetch(`${API_URL}/medicamentos/${medicamentoId}`);

        if (!resposta.ok) {
            throw new Error("Medicamento nao encontrado.");
        }

        const medicamento = await resposta.json();

        document.getElementById("nome").value = medicamento.nome || "";
        document.getElementById("principioAtivo").value = medicamento.principioAtivo || "";
        document.getElementById("dosagem").value = medicamento.dosagem || "";
        document.getElementById("formaFarmaceutica").value = medicamento.formaFarmaceutica || "";
        document.getElementById("quantidadeEstoque").value = medicamento.quantidadeEstoque ?? "";
        document.getElementById("estoqueMinimo").value = medicamento.estoqueMinimo ?? "";
        document.getElementById("dataValidade").value = medicamento.dataValidade || "";
        document.getElementById("fornecedor").value = medicamento.fornecedor || "";

        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

carregarMedicamentoParaEdicao();
