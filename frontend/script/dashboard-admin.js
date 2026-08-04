if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const totalPacientes = document.getElementById("totalPacientes");
const totalProfissionais = document.getElementById("totalProfissionais");
const totalAgendamentos = document.getElementById("totalAgendamentos");
const totalLeitosOcupados = document.getElementById("totalLeitosOcupados");
const totalExamesPendentes = document.getElementById("totalExamesPendentes");
const totalTriagensUrgentes = document.getElementById("totalTriagensUrgentes");

const agendamentosHoje = document.getElementById("agendamentosHoje");
const atendimentosEmAndamento = document.getElementById("atendimentosEmAndamento");
const internacoesAtivas = document.getElementById("internacoesAtivas");
const leitosLivres = document.getElementById("leitosLivres");
const dataDashboard = document.getElementById("dataDashboard");

const listaProximosAgendamentos = document.getElementById("listaProximosAgendamentos");
const listaTriagensUrgentes = document.getElementById("listaTriagensUrgentes");
const listaExamesPendentes = document.getElementById("listaExamesPendentes");

const leitosDisponiveis = document.getElementById("leitosDisponiveis");
const leitosOcupados = document.getElementById("leitosOcupados");
const leitosManutencao = document.getElementById("leitosManutencao");

const mensagem = document.getElementById("mensagem");
const botaoSair = document.getElementById("botaoSair");
const botaoAtualizarDashboard = document.getElementById("botaoAtualizarDashboard");

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letra) => {
        return letra.toUpperCase();
    });
}

function mostrarVazio(elemento, texto) {
    elemento.innerHTML = `<p class="empty">${texto}</p>`;
}

async function buscarJson(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar dados.");
    }

    return await resposta.json();
}

async function carregarDashboard() {
    try {
        mensagem.textContent = "Carregando dashboard...";

        const pacientes = await buscarJson(`${API_URL}/pacientes`);
        const profissionais = await buscarJson(`${API_URL}/profissionais`);
        const agendamentos = await buscarJson(`${API_URL}/agendamentos`);
        const leitos = await buscarJson(`${API_URL}/leitos`);
        const exames = await buscarJson(`${API_URL}/exames`);
        const triagens = await buscarJson(`${API_URL}/triagens`);
        const internacoes = await buscarJson(`${API_URL}/internacoes`);

        totalPacientes.textContent = pacientes.length;
        totalProfissionais.textContent = profissionais.length;
        totalAgendamentos.textContent = agendamentos.length;

        const leitosOcupados = leitos.filter((leito) => {
            return leito.statusLeito === "OCUPADO";
        });

        const examesPendentes = exames.filter((exame) => {
            return exame.statusExame === "SOLICITADO" || exame.statusExame === "PENDENTE";
        });

        const triagensUrgentes = triagens.filter((triagem) => {
            return triagem.prioridadeTriagem === "LARANJA" || triagem.prioridadeTriagem === "VERMELHO";
        });

        await renderizarProximosAgendamentos(agendamentos);
        await renderizarTriagensUrgentes(triagensUrgentes);
        await renderizarExamesPendentes(examesPendentes)

        totalLeitosOcupados.textContent = leitosOcupados.length;
        totalExamesPendentes.textContent = examesPendentes.length;
        totalTriagensUrgentes.textContent = triagensUrgentes.length;

        const hoje = new Date().toISOString().split("T")[0];

        const agendamentosDeHoje = agendamentos.filter((agendamento) => {
            return agendamento.dataConsulta === hoje;
        });

        const atendimentosAndamento = await buscarJson(`${API_URL}/atendimentos-medicos/status/EM_ANDAMENTO`);

        const internacoesEmAndamento = internacoes.filter((internacao) => {
            return internacao.statusInternacao === "ATIVA" || internacao.statusInternacao === "INTERNADO";
        });

        const leitosDisponiveis = leitos.filter((leito) => {
            return leito.statusLeito === "DISPONIVEL";
        });

        agendamentosHoje.textContent = agendamentosDeHoje.length;
        atendimentosEmAndamento.textContent = atendimentosAndamento.length;
        internacoesAtivas.textContent = internacoesEmAndamento.length;
        leitosLivres.textContent = leitosDisponiveis.length;
        dataDashboard.textContent = hoje;

        renderizarLeitos(leitos);

        mensagem.textContent = "";
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = "Erro: " + erro.message;
    }
}

function renderizarProximosAgendamentos(agendamentos) {
    listaProximosAgendamentos.innerHTML = "";

    const proximos = agendamentos.filter((agendamento) => {
        return agendamento.statusAgendamento !== "CANCELADO";
    }).slice(0, 5);

    if (proximos.length === 0) {
        mostrarVazio(listaProximosAgendamentos, "Nenhum agendamento proximo.");
        return;
    }

    proximos.forEach((agendamento) => {
        listaProximosAgendamentos.innerHTML += `
            <article class="patient-record-item">
                <h3>${agendamento.dataConsulta || "-"} às ${agendamento.horaConsulta || "-"}</h3>
                <p><strong>Paciente:</strong> ${agendamento.paciente ? agendamento.paciente.nome : "-"}</p>
                <p><strong>Profissional:</strong> ${agendamento.profissional ? agendamento.profissional.nome : "-"}</p>
                <p><strong>Status:</strong> ${formatarEnum(agendamento.statusAgendamento)}</p>
            </article>
        `;
    });
}

function renderizarTriagensUrgentes(triagensUrgentes) {
    listaTriagensUrgentes.innerHTML = "";

    if (triagensUrgentes.length === 0) {
        mostrarVazio(listaTriagensUrgentes, "Nenhuma triagem urgente.");
        return;
    }

    triagensUrgentes.slice(0, 5).forEach((triagem) => {
        listaTriagensUrgentes.innerHTML += `
            <article class="patient-record-item">
                <h3>${formatarEnum(triagem.prioridadeTriagem)}</h3>
                <p><strong>Paciente:</strong> ${triagem.paciente ? triagem.paciente.nome : "-"}</p>
                <p><strong>Status:</strong> ${formatarEnum(triagem.statusTriagem)}</p>
                <p><strong>Sintomas:</strong> ${triagem.sintomas || "-"}</p>
            </article>
        `;
    });
}

function renderizarExamesPendentes(examesPendentes) {
    listaExamesPendentes.innerHTML = "";

    if (examesPendentes.length === 0) {
        mostrarVazio(listaExamesPendentes, "Nenhum exame pendente.");
        return;
    }

    examesPendentes.slice(0, 5).forEach((exame) => {
        listaExamesPendentes.innerHTML += `
            <article class="patient-record-item">
                <h3>${exame.tipoExame || "Exame"}</h3>
                <p><strong>Paciente:</strong> ${exame.paciente ? exame.paciente.nome : "-"}</p>
                <p><strong>Profissional:</strong> ${exame.profissional ? exame.profissional.nome : "-"}</p>
                <p><strong>Status:</strong> ${formatarEnum(exame.statusExame)}</p>
            </article>
        `;
    });
}

function renderizarLeitos(leitos) {
    const disponiveis = leitos.filter((leito) => {
        return leito.statusLeito === "DISPONIVEL";
    });

    const ocupados = leitos.filter((leito) => {
        return leito.statusLeito === "OCUPADO";
    });

    const manutencao = leitos.filter((leito) => {
        return leito.statusLeito === "MANUTENCAO";
    });

    leitosDisponiveis.textContent = disponiveis.length;
    leitosOcupados.textContent = ocupados.length;
    leitosManutencao.textContent = manutencao.length;
}

botaoAtualizarDashboard.addEventListener("click", carregarDashboard);

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

carregarDashboard();
