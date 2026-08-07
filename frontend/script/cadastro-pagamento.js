if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const form = document.getElementById("formPagamento");
const mensagem = document.getElementById("mensagem");

const paramentros = new URLSearchParams(window.location.search);
const pagamentoId = paramentros.get("id");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const pagamento = {
        paciente: {
            id: Number(document.getElementById("paciente").value)
        },
        descricao: document.getElementById("descricao").value,
        valor: Number(document.getElementById("valor").value),
        dataVencimento: document.getElementById("dataVencimento").value,
        dataPagamento: document.getElementById("dataPagamento").value || null,
        formaPagamento: document.getElementById("formaPagamento").value,
        statusPagamento: document.getElementById("statusPagamento").value
    };

    try {
        mostrarMensagem(mensagem, "Salvando Pagamento...", "loading");

        const url = pagamentoId 
            ? `${API_URL}/pagamentos/${pagamentoId}`
            : `${API_URL}/pagamentos/cadastrar`;

        const metodo = pagamentoId ? "PUT" : "POST";

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pagamento)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar pagamentos.");
        }

        await resposta.json();

        mostrarMensagem(mensagem, "Pagamento salvo com sucesso.", "success");
        if (!pagamentoId) {
            form.reset();
        }
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
});

async function carregarPacientes() {
    try {
        const resposta = await fetch(`${API_URL}/pacientes`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar pacientes.");
        }

        const pacientes = await resposta.json();
        const selectPaciente = document.getElementById("paciente");

        pacientes.forEach((paciente) => {
            const option = document.createElement("option");
            option.value = paciente.id;
            option.textContent = paciente.nome;

            selectPaciente.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarPagamentoParaEdicao() {
    if (!pagamentoId) {
        return;
    }

    document.getElementById("modoPagina").textContent = "Edição";
    document.getElementById("tituloPagina").textContent = "Editar pagamento";
    document.getElementById("descricaoPagina").textContent = "Altere as informações do pagamento.";
    document.getElementById("botaoSalvar").textContent = "Salvar Alteração";

    try {
        mostrarMensagem(mensagem, "Carregando pagamento...", "loading");

        const resposta = await fetch(`${API_URL}/pagamentos/${pagamentoId}`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar pagamento para edição.");
        }

        const pagamentos = await resposta.json();

        document.getElementById("paciente").value = pagamentos.paciente ? pagamentos.paciente.id : "Sem paciente";
        document.getElementById("valor").value = pagamentos.valor || "";
        document.getElementById("descricao").value = pagamentos.descricao || "";
        document.getElementById("dataVencimento").value = pagamentos.dataVencimento || "";
        document.getElementById("dataPagamento").value = pagamentos.dataPagamento || "";
        document.getElementById("formaPagamento").value = pagamentos.formaPagamento || "";
        document.getElementById("statusPagamento").value = pagamentos.statusPagamento || "";

        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function iniciarPaginca() {
    await carregarPacientes();
    await carregarPagamentoParaEdicao();
}

iniciarPaginca();
