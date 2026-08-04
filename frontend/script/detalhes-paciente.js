if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const parametros = new URLSearchParams(window.location.search);
const pacienteIdUrl = parametros.get("id");

const nomePaciente = document.getElementById("nomePaciente");
const dadosPaciente = document.getElementById("dadosPaciente");
const pacienteId = document.getElementById("pacienteId");
const cpfPaciente = document.getElementById("cpfPaciente");
const telefonePaciente = document.getElementById("telefonePaciente");
const nascimentoPaciente = document.getElementById("nascimentoPaciente");
const sexoPaciente = document.getElementById("sexoPaciente");
const generoPaciente = document.getElementById("generoPaciente");
const convenioPaciente = document.getElementById("convenioPaciente");
const mensagem = document.getElementById("mensagem");
const botaoSair = document.getElementById("botaoSair");

const totalAgendamentos = document.getElementById("totalAgendamentos");
const totalAtendimentos = document.getElementById("totalAtendimentos");
const totalProntuarios = document.getElementById("totalProntuarios");
const totalExames = document.getElementById("totalExames");
const totalPrescricoes = document.getElementById("totalPrescricoes");
const totalInternacoes = document.getElementById("totalInternacoes");

const listaAgendamentos = document.getElementById("listaAgendamentos");
const listaAtendimentos = document.getElementById("listaAtendimentos");
const listaProntuarios = document.getElementById("listaProntuarios");
const listaExames = document.getElementById("listaExames");
const listaPrescricoes = document.getElementById("listaPrescricoes");
const listaInternacoes = document.getElementById("listaInternacoes");
const listaTriagens = document.getElementById("listaTriagens");

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letre) => {
        return letre.toUpperCase();
    })
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

async function carregarPaciente() {
    const paciente = await buscarJson(`${API_URL}/pacientes/${pacienteIdUrl}`);
 
    nomePaciente.textContent = paciente.nome;
    dadosPaciente.textContent = `${paciente.nomeSocial || "Sem nome social"} • ${paciente.telefone || "Sem telefone"}`;
    pacienteId.textContent = `ID ${paciente.id}`;
    cpfPaciente.textContent = paciente.cpf || "-";
    telefonePaciente.textContent = paciente.telefone || "-";
    nascimentoPaciente.textContent = paciente.dataNascimento || "-";
    sexoPaciente.textContent = paciente.sexo || "-";
    generoPaciente.textContent = paciente.genero || "-";
    convenioPaciente.textContent = paciente.convenio || "-";

    document.getElementById("linkEditarPaciente").href = `cadastro-paciente.html?id=${paciente.id}`;
    document.getElementById("linkNovoAgendamento").href = `cadastro-agendamento.html?pacienteId=${paciente.id}`;
    document.getElementById("linkNovaTriagem").href = `cadastro-triagem.html?pacienteId=${paciente.id}`;
    document.getElementById("linkNovoAtendimento").href = `cadastro-atendimento-medico.html?pacienteId=${paciente.id}`;
    document.getElementById("linkNovoProntuario").href = `cadastro-prontuario.html?pacienteId=${paciente.id}`;
    document.getElementById("linkNovoExame").href = `cadastro-exame.html?pacienteId=${paciente.id}`;
    document.getElementById("linkNovaPrescricao").href = `cadastro-prescricao.html?pacienteId=${paciente.id}`;
}

async function carregarAgendamentos() {
    const agendamentos = await buscarJson(`${API_URL}/agendamentos/paciente/${pacienteIdUrl}`);

    totalAgendamentos.textContent = agendamentos.length;
    listaAgendamentos.innerHTML = "";

    if (agendamentos.length === 0) {
        mostrarVazio(listaAgendamentos, "Nenhum agendamento encontrado.");
        return;
    }

    agendamentos.forEach((agendamento) => {
        listaAgendamentos.innerHTML += `
            <article class="patient-record-item">
                <h3>${agendamento.dataConsulta || "-"} às ${agendamento.horaConsulta || "-"}</h3>
                <p><strong>Profissional:</strong> ${agendamento.profissional ? agendamento.profissional.nome : "-"}</p>
                <p><strong>Status:</strong> ${formatarEnum(agendamento.statusAgendamento)}</p>
                <p><strong>Observação:</strong> ${agendamento.observacao || "-"}</p>
            </article>
        `;
    });
}

async function carregarAtendimentos() {
    const atendimentos = await buscarJson(`${API_URL}/atendimentos-medicos/paciente/${pacienteIdUrl}`);

    totalAtendimentos.textContent = atendimentos.length;
    listaAtendimentos.innerHTML = "";

    if (atendimentos.length === 0) {
        mostrarVazio(listaAtendimentos, "Nenhum atendimento cadastrado ainda.");
        return;
    }

    atendimentos.forEach((atendimento) => {
        listaAtendimentos.innerHTML += `
            <article class="patient-record-item">
                <h3>${formatarEnum(atendimento.statusAtendimentoMedico)}</h3>
                <p><strong>Profissional:</strong> ${atendimento.profissional ? atendimento.profissional.nome : "-"}</p>
                <p><strong>Início:</strong> ${atendimento.dataHoraInicio || "-"}</p>
                <p><strong>Fim:</strong> ${atendimento.dataHoraFim || "-"}</p>
                <p><strong>Queixa:</strong> ${atendimento.queixaPrincipal || "-"}</p>
                <p><strong>Diagnóstico:</strong> ${atendimento.diagnostico || "-"}</p>
                <p><strong>Conduta:</strong> ${atendimento.conduta || "-"}</p>
            </article>
        `;
    });
}

async function carregarProntuarios() {
    const prontuarios = await buscarJson(`${API_URL}/prontuarios/paciente/${pacienteIdUrl}`);

    totalProntuarios.textContent  = prontuarios.length;
    listaProntuarios.innerHTML = "";

    if (prontuarios.length === 0) {
        mostrarVazio(listaProntuarios, "Nenum prontuário cadastrado ainda.");
        return;
    }

    prontuarios.forEach((prontuario) => {
        listaProntuarios.innerHTML += `
            <article class="patient-record-item">
                <h3>${prontuario.dataAtendimento || "Sem data"}</h3>
                <p><strong>Profissional:</strong> ${prontuario.profissional ? prontuario.profissional.nome : "-"}</p>
                <p><strong>Sintomas:</strong> ${prontuario.sintomas || "-"}</p>
                <p><strong>Diagnóstico:</strong> ${prontuario.diagnostico || "-"}</p>
                <p><strong>Prescrição:</strong> ${prontuario.prescricao || "-"}</p>
                <p><strong>Observações:</strong> ${prontuario.observacoes || "-"}</p>
            </article>
        `;
    });
}

async function carregarExames() {
    const exames = await buscarJson(`${API_URL}/exames/paciente/${pacienteIdUrl}`);

    totalExames.textContent = exames.length;
    listaExames.innerHTML = "";

    if (exames.length === 0) {
        mostrarVazio(listaExames, "Nenhum exame encontrado.");
        return;
    }

    exames.forEach((exame) => {
        listaExames.innerHTML += `
            <article class="patient-record-item">
                <h3>${exame.tipoExame || "Exame"}</h3>
                <p><strong>Profissional:</strong> ${exame.profissional ? exame.profissional.nome : "-"}</p>
                <p><strong>Status:</strong> ${formatarEnum(exame.statusExame)}</p>
                <p><strong>Solicitação:</strong> ${exame.dataSolicitacao || "-"}</p>
                <p><strong>Resultado:</strong> ${exame.resultado || "-"}</p>
            </article>
        `;
    });
}

async function carregarPrescricoes() {
    const prescricoes = await buscarJson(`${API_URL}/prescricoes-medicas/paciente/${pacienteIdUrl}`);

    totalPrescricoes.textContent = prescricoes.length;
    listaPrescricoes.innerHTML = "";

    if (prescricoes.length === 0) {
        mostrarVazio(listaPrescricoes, "Nenhuma prescricao encontrada.");
        return;
    }

    prescricoes.forEach((prescricao) => {
        listaPrescricoes.innerHTML += `
            <article class="patient-record-item">
                <h3>${prescricao.medicamento || "Prescrição"}</h3>
                <p><strong>Profissional:</strong> ${prescricao.profissional ? prescricao.profissional.nome : "-"}</p>
                <p><strong>Dosagem:</strong> ${prescricao.dosagem || "-"}</p>
                <p><strong>Frequência:</strong> ${prescricao.frequencia || "-"}</p>
                <p><strong>Duração:</strong> ${prescricao.duracao || "-"}</p>
                <p><strong>Data:</strong> ${prescricao.dataPrescricao || "-"}</p>
                <p><strong>Orientações:</strong> ${prescricao.orientacoes || "-"}</p>
            </article>
        `;
    });
}

async function carregarInternacoes() {
    const internacoes = await buscarJson(`${API_URL}/internacoes/paciente/${pacienteIdUrl}`);

    totalInternacoes.textContent = internacoes.length;
    listaInternacoes.innerHTML = "";

    if (internacoes.length === 0) {
        mostrarVazio(listaInternacoes, "Nenhuma internacao encontrada.");
        return;
    }

    internacoes.forEach((internacao) => {
        listaInternacoes.innerHTML += `
            <article class="patient-record-item">
                <h3>${formatarEnum(internacao.statusInternacao)}</h3>
                <p><strong>Profissional:</strong> ${internacao.profissional ? internacao.profissional.nome : "-"}</p>
                <p><strong>Leito:</strong> ${internacao.leito ? internacao.leito.numero + " - " + internacao.leito.setor : "-"}</p>
                <p><strong>Entrada:</strong> ${internacao.dataEntrada || "-"}</p>
                <p><strong>Alta:</strong> ${internacao.dataAlta || "-"}</p>
                <p><strong>Motivo:</strong> ${internacao.motivo || "-"}</p>
            </article>
        `;
    });
}

async function carregarTriagens() {
    const triagens = await buscarJson(`${API_URL}/triagens/paciente/${pacienteIdUrl}`);

    listaTriagens.innerHTML = "";

    if (triagens.length === 0) {
        mostrarVazio(listaTriagens, "Nenhuma triagem encontrada.");
        return;
    }

    triagens.forEach((triagem) => {
        listaTriagens.innerHTML += `
            <article class="patient-record-item">
                <h3>${formatarEnum(triagem.prioridadeTriagem)}</h3>
                <p><strong>Profissional:</strong> ${triagem.profissional ? triagem.profissional.nome : "-"}</p>
                <p><strong>Status:</strong> ${formatarEnum(triagem.statusTriagem)}</p>
                <p><strong>Entrada:</strong> ${triagem.dataHoraEntrada || "-"}</p>
                <p><strong>Pressão:</strong> ${triagem.pressaoArterial || "-"}</p>
                <p><strong>Temperatura:</strong> ${triagem.temperatura || "-"}</p>
                <p><strong>Frequência cardíaca:</strong> ${triagem.frequenciaCardiaca || "-"}</p>
                <p><strong>Saturação:</strong> ${triagem.saturacao || "-"}</p>
                <p><strong>Sintomas:</strong> ${triagem.sintomas || "-"}</p>
            </article>
        `;
    });
}

async function carregarTudo() {
    if (!pacienteIdUrl) {
        mostrarMensagem(mensagem, "Paciente nao informado na URL.", "warning");
        return;
    }

    try {
        mostrarMensagem(mensagem, "Carregando histórico do paciente...", "loading");

        await carregarPaciente();
        await carregarAgendamentos();
        await carregarAtendimentos();
        await carregarProntuarios();
        await carregarExames();
        await carregarPrescricoes();
        await carregarInternacoes();
        await carregarTriagens();

        limparMensagem(mensagem);
    } catch (erro) {
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

carregarTudo();
