if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const tabelaLeitos = document.getElementById("tabelaLeitos");
const totalLeitos = document.getElementById("totalLeitos");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

const filtroStatus = document.getElementById("filtroStatus");
const filtroSetor = document.getElementById("filtroSetor");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

let leitosCarregados = [];

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    });
}

function filtrarLeitos() {
    const status = filtroStatus.value;
    const setor = filtroSetor.value;

    const leitosFiltrados = leitosCarregados.filter(function (leito) {
        const statusIgual = !status || leito.statusLeito === status;
        const setorIgual = !setor || (leito.setor && leito.setor.toLowerCase().includes(setor.toLowerCase()));

        return statusIgual && setorIgual;
    });

    renderizarLeitos(leitosFiltrados);
}

function renderizarLeitos(leitos) {
    totalLeitos.textContent = `${leitos.length} leitos encontrados`;
    tabelaLeitos.innerHTML = "";

    if (leitos.length === 0) {
        tabelaLeitos.innerHTML = `
            <tr>
                <td colspan="6" class="empty">Nenhum leito encontrado.</td>
            </tr>
        `;
        return;
    }

    leitos.forEach(function (leito) {
        const linha = document.createElement("tr");
        
        linha.innerHTML = `
            <td>${leito.id}</td>
            <td>${leito.numero || "-"}</td>
            <td>${leito.quarto || "-"}</td>
            <td>${leito.setor || "-"}</td>
            <td><span class="status-badge">${formatarEnum(leito.statusLeito)}</span></td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-leito.html?id=${leito.id}">Editar</a>
                    <button type="button" onclick="deletarLeito(${leito.id})">Deletar</button>
                </div>
            </td>
        `;

        tabelaLeitos.appendChild(linha);
    })
}

async function carregarLeitos() {
    try {
        limparMensagem(mensagem);

        const resposta = await fetch(`${API_URL}/leitos`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar leitos.");
        }

        leitosCarregados = await resposta.json();
        renderizarLeitos(leitosCarregados);
    } catch (erro) {
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
        tabelaLeitos.innerHTML = `
            <tr>
                <td colspan="6" class="empty">Erro ao carregar leitos.</td>
            </tr>
        `;
    }
}

async function deletarLeito(id) {
    const confirmar = confirm("Deseja deletar este leito?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/leitos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar leito.");
        }

        mostrarMensagem(mensagem, "Leito deletado com sucesso.", "success");
        carregarLeitos();
    } catch (erro) {
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

botaoFiltrar.addEventListener("click", filtrarLeitos);

botaoLimparFiltro.addEventListener("click", function () {
    filtroStatus.value = "";
    filtroSetor.value = "";
    renderizarLeitos(leitosCarregados);
});

botaoAtualizar.addEventListener("click", carregarLeitos);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
});

carregarLeitos();