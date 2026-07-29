if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado");
}

const API_URL = "http://localhost:8080";

const tabelaTriagens = document.getElementById("tabelaTriagens");
const totalTriagens = document.getElementById("totalTriagens");
const mensagem = document.getElementById("mensagem");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroProfissional = document.getElementById("filtroProfissional");
const filtroPrioridade = document.getElementById("filtroPrioridade");
const filtroStatus = document.getElementById("filtroStatus");

const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

let triagensCarregadas = [];
let pacientesCarregados = [];
let profissionaisCarregados = [];

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

function formatarEnum(valor) {
    if (!valor) {
        return "Nenhum valor";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    })
}

function classeStatus(status) {
    if (!status) {
        return "";
    }

    return "status-" + status.toLowerCase().replaceAll("_", "-");
}

async function carregarPacientes() {
    try {
        const resposta = await fetch(`${API_URL}/pacientes`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar pacientes.");
        }

        pacientesCarregados = await resposta.json();

        pacientesCarregados.forEach(function (paciente) {
            const option = document.createElement("option");
            option.value = paciente.id;
            option.textContent = paciente.nome;
            filtroPaciente.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao carregar pacientes.";
    }
}

async function carregarProfissionais() {
    try {
        const resposta = await fetch(`${API_URL}/profissionais`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar profissionais.");
        }

        profissionaisCarregados = await resposta.json();

        profissionaisCarregados.forEach(function (profissional) {
            const option = document.createElement("option");
            option.value = profissional.id;
            option.textContent = profissional.nome;
            filtroProfissional.appendChild(option);
        });
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao carregar profissionais.";
    }
}

async function carregarTriagens() {
    try {
        mensagem.textContent = "Carregando triagens...";

        const resposta = await fetch(`${API_URL}/triagens`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar triagens");
        }

        triagensCarregadas = await resposta.json();

        renderizarTriagens(triagensCarregadas);
        mensagem.textContent = "";
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro ao carregar triagens.";
    }
}

function renderizarTriagens(triagens) {
    tabelaTriagens.innerHTML = "";

    totalTriagens.innerHTML = `${triagens.length} triagens encontradas.`;

    if (triagens.length === 0) {
        tabelaTriagens.innerHTML = `
            <tr>
                <td colspan="9" class="empty">Nenhuma triagem cadastrada.</td>
            </tr>
        `;
        return;
    }

    triagens.forEach(function (triagem) {
        const paciente = triagem.paciente ? triagem.paciente.nome : "Sem paciente";
        const profissional = triagem.profissional ? triagem.profissional.nome : "Sem profissional";
        let botoesAtendimento = "";
        const linkAtendimento = triagem.paciente && triagem.profissional
            ? `cadastro-atendimento-medico.html?pacienteId=${triagem.paciente.id}&profissionalId=${triagem.profissional.id}&triagemId=${triagem.id}`
            : "cadastro-atendimento-medico.html";

        if (triagem.statusTriagem === "AGUARDANDO") {
            botoesAtendimento = `
                <button type="button" onclick="iniciarAtendimento(${triagem.id})">Iniciar</button>
            `;
        } else if (triagem.statusTriagem === "EM_ATENDIMENTO") {
            botoesAtendimento = `
                <button type="button" onclick="finalizarAtendimento(${triagem.id})">Finalizar</button>
                <a href="${linkAtendimento}">Atender paciente</a>
            `;
        }

        const sinaisVitais = `
            PA: ${triagem.pressaoArterial || "-"}<br>
            Temp: ${triagem.temperatura || "-"}°C<br>
            FC: ${triagem.frequenciaCardiaca || "-"} bpm<br>
            Sat: ${triagem.saturacao || "-"}
        `;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${triagem.id}</td>
            <td>${paciente}</td>
            <td>${profissional}</td>
            <td>${formatarDataHora(triagem.dataHoraEntrada)}</td>
            <td><span class="status-badge ${classeStatus(triagem.prioridadeTriagem)}">${formatarEnum(triagem.prioridadeTriagem)}</span></td>
            <td><span class="status-badge ${classeStatus(triagem.statusTriagem)}">${formatarEnum(triagem.statusTriagem)}</span></td>
            <td>${sinaisVitais}</td>
            <td class="text-long">${triagem.sintomas || "-"}</td>
            <td>
                <div class="table-actions">
                    <a href="cadastro-triagem.html?id=${triagem.id}">Editar</a>
                    ${botoesAtendimento}
                    <button type="button" onclick="deletarTriagem(${triagem.id})">Excluir</button>
                </div>
            </td>
        `;

        tabelaTriagens.appendChild(linha);
    });
}

async function deletarTriagem(id) {
    const confirmar = confirm("Deseja deletar esta triagem?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/triagens/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel deletar esta triagem.");
        }

        mensagem.textContent = "Triagem deletada com sucesso!";
        await carregarTriagens();
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function iniciarAtendimento(id) {
    if (!confirm("Deseja iniciar o atendimento desta triagem?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/triagens/${id}/iniciar-atendimento`, {
            method: "PUT"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel iniciar o atendimento.");
        }

        await carregarTriagens();
        mensagem.textContent = "Atendimento iniciado com sucesso.";
    } catch (erro) {
        mensagem.textContent = `Erro: ${erro.message}`;
    }
}

async function finalizarAtendimento(id) {
    if (!confirm("Deseja finalizar o atendimento desta triagem?")) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/triagens/${id}/finalizar-atendimento`, {
            method: "PUT"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel finalizar o atendimento.");
        }

        await carregarTriagens();
        mensagem.textContent = "Atendimento finalizado com sucesso.";
    } catch (erro) {
        mensagem.textContent = `Erro: ${erro.message}`;
    }
}

function filtrarTriagens() {
    const pacienteId = filtroPaciente.value;
    const profissionalId = filtroProfissional.value;
    const prioridade = filtroPrioridade.value;
    const status = filtroStatus.value;

    const triagensFiltradas = triagensCarregadas.filter(function (triagem) {
        const pacienteIgual = !pacienteId || (triagem.paciente && String(triagem.paciente.id) === pacienteId);
        const profissionalIgual = !profissionalId || (triagem.profissional && String(triagem.profissional.id) === profissionalId);
        const prioridadeIgual = !prioridade || triagem.prioridadeTriagem === prioridade;
        const statusIgual = !status || triagem.statusTriagem === status;

        return pacienteIgual && profissionalIgual && prioridadeIgual && statusIgual;
    });

    renderizarTriagens(triagensFiltradas);
}

botaoFiltrar.addEventListener("click", filtrarTriagens);

botaoLimparFiltro.addEventListener("click", function () {
    filtroPaciente.value = "";
    filtroProfissional.value = "";
    filtroPrioridade.value = "";
    filtroStatus.value = "";
    renderizarTriagens(triagensCarregadas);
});

botaoAtualizar.addEventListener("click", carregarTriagens);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

async function iniciarPagina() {
    await carregarPacientes();
    await carregarProfissionais();
    await carregarTriagens();
}

iniciarPagina();
