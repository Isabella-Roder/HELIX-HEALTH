if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const tabelaAtendimentos = document.getElementById("tabelaAtendimentos");
const totalAtendimentos = document.getElementById("totalAtendimentos");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroProfissional = document.getElementById("filtroProfissional");
const filtroStatus = document.getElementById("filtroStatus");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

let atendimentosCarregados = [];

function limparTexto(texto) {
    if (!texto) {
        return "-";
    }

    if (texto.length <= 70) {
        return texto;
    }

    return texto.substring(0, 70) + "...";
}

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

function classeStatus(status) {
    if (!status) {
        return "";
    }

    return "status-" + status.toLowerCase().replaceAll("_", "-");
}

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    });
}

function renderizarAtendimentos(atendimentos) {
    tabelaAtendimentos.innerHTML = "";
    totalAtendimentos.textContent = `${atendimentos.length} atendimentos medicos encontrados.`;

    if (atendimentos.length === 0) {
        tabelaAtendimentos.innerHTML = `
            <tr>
                <td colspan="10" class="empty">Nenhum atendimento encontrado.</td>
            </tr>
        `;
        return;
    }

    atendimentos.forEach(function (atendimento) {
        const paciente = atendimento.paciente ? atendimento.paciente.nome : "Sem paciente";
        const profissional = atendimento.profissional ? atendimento.profissional.nome : "Sem profissional";
        let botoesStatus = "";

        if (atendimento.statusAtendimentoMedico === "EM_ANDAMENTO") {
            botoesStatus = `
                <button type="button" onclick="finalizarAtendimento(${atendimento.id})">Finalizar</button>
                <button type="button" onclick="cancelarAtendimento(${atendimento.id})">Cancelar</button>
            `;
        }

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${atendimento.id}</td>
            <td>${paciente}</td>
            <td>${profissional}</td>
            <td>${formatarDataHora(atendimento.dataHoraInicio)}</td>
            <td>${formatarDataHora(atendimento.dataHoraFim)}</td>
            <td>
                <span class="status-badge ${classeStatus(atendimento.statusAtendimentoMedico)}">
                    ${formatarEnum(atendimento.statusAtendimentoMedico)}
                </span>
            </td>
            <td class="text-long">${limparTexto(atendimento.queixaPrincipal)}</td>
            <td class="text-long">${limparTexto(atendimento.diagnostico)}</td>
            <td class="text-long">${limparTexto(atendimento.conduta)}</td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-atendimento-medico.html?id=${atendimento.id}">Editar</a>
                    ${botoesStatus}
                    <button type="button" onclick="deletarAtendimento(${atendimento.id})">Excluir</button>
                </div>
            </td>
        `;

        tabelaAtendimentos.appendChild(linha);
    });
}

async function carregarAtendimentosMedicos() {
    try {
        mostrarMensagem(mensagem, "Carregando atendimentos...", "loading");

        const resposta = await fetch(`${API_URL}/atendimentos-medicos`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar atendimentos medicos.");
        }

        atendimentosCarregados = await resposta.json();

        renderizarAtendimentos(atendimentosCarregados);
        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function deletarAtendimento(id) {
    if (!confirm("Deseja deletar este atendimento?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/atendimentos-medicos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar este atendimento medico.");
        }

        mostrarMensagem(mensagem, "Atendimento medico deletado com sucesso.", "success");
        await carregarAtendimentosMedicos();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function finalizarAtendimento(id) {
    if (!confirm("Deseja finalizar este atendimento?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/atendimentos-medicos/${id}/finalizar`, {
            method: "PUT"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel finalizar atendimento.");
        }

        mostrarMensagem(mensagem, "Atendimento finalizado com sucesso.", "success");
        await carregarAtendimentosMedicos();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function cancelarAtendimento(id) {
    if (!confirm("Deseja cancelar este atendimento?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/atendimentos-medicos/${id}/cancelar`, {
            method: "PUT"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel cancelar atendimento.");
        }

        mostrarMensagem(mensagem, "Atendimento cancelado com sucesso.", "success");
        await carregarAtendimentosMedicos();
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

async function carregarPacientesFiltro() {
    try {
        const resposta = await fetch(`${API_URL}/pacientes`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar pacientes.");
        }

        const pacientes = await resposta.json();

        pacientes.forEach(function (paciente) {
            const option = document.createElement("option");
            option.value = paciente.id;
            option.textContent = paciente.nome;
            filtroPaciente.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro ao carregar pacientes.", "error");
    }
}

async function carregarProfissionaisFiltro() {
    try {
        const resposta = await fetch(`${API_URL}/profissionais`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar profissionais.");
        }

        const profissionais = await resposta.json();

        profissionais.forEach(function (profissional) {
            const option = document.createElement("option");
            option.value = profissional.id;
            option.textContent = profissional.nome;
            filtroProfissional.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro ao carregar profissionais.", "error");
    }
}

function filtrarAtendimentos() {
    const pacienteId = filtroPaciente.value;
    const profissionalId = filtroProfissional.value;
    const status = filtroStatus.value;

    const atendimentosFiltrados = atendimentosCarregados.filter(function (atendimento) {
        const pacienteIgual = !pacienteId || (atendimento.paciente && String(atendimento.paciente.id) === pacienteId);
        const profissionalIgual = !profissionalId || (atendimento.profissional && String(atendimento.profissional.id) === profissionalId);
        const statusIgual = !status || atendimento.statusAtendimentoMedico === status;

        return pacienteIgual && profissionalIgual && statusIgual;
    });

    renderizarAtendimentos(atendimentosFiltrados);
}

botaoFiltrar.addEventListener("click", filtrarAtendimentos);

botaoLimparFiltro.addEventListener("click", function () {
    filtroPaciente.value = "";
    filtroProfissional.value = "";
    filtroStatus.value = "";
    renderizarAtendimentos(atendimentosCarregados);
});

botaoAtualizar.addEventListener("click", carregarAtendimentosMedicos);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function iniciarPagina() {
    await carregarPacientesFiltro();
    await carregarProfissionaisFiltro();
    await carregarAtendimentosMedicos();
}

iniciarPagina();
