if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const usuarioSalvo = localStorage.getItem("usuarioLogado");

function redirecionar(destino) {
    window.acessoBloqueado = true;
    window.location.replace(destino);
    throw new Error("Redirecionando acesso.");
}

if (!usuarioSalvo) {
    redirecionar("login.html");
}

const usuario = JSON.parse(usuarioSalvo);
const paciente = usuario.paciente;

function temTipo(usuario, tipoUsuario) {
    const tipos = Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario
        : [usuario.tipoUsuario];

    return tipos.includes(tipoUsuario);
}

if (!temTipo(usuario, "PACIENTE") || !paciente) {
    redirecionar("portal-seletor.html");
}

document.getElementById("nomePaciente").textContent = paciente.nome;
document.getElementById("statusConta").textContent = usuario.ativo ? "ATIVA" : "INATIVA";
document.getElementById("emailUsuario").textContent = usuario.email;

document.getElementById("convenioPaciente").textContent = paciente.convenio || "-";
document.getElementById("dadoNome").textContent = paciente.nome || "-";
document.getElementById("dadoNomeSocial").textContent = paciente.nomeSocial || "-";
document.getElementById("dadoCpf").textContent = paciente.cpf || "-";
document.getElementById("dadoNascimento").textContent = paciente.dataNascimento || "-";
document.getElementById("dadoTelefone").textContent = paciente.telefone || "-";
document.getElementById("dadoEmergencia").textContent = paciente.contatoEmergencia || "-";

document.getElementById("botaoSair").addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.replace("login.html");
});

const API_URL = "http://localhost:8080";

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCase();
    });
}

function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "-";
    }

    return new Date(dataHora).toLocaleString("pt-BR");
}

function classeStatus(valor) {
    if (!valor) {
        return "";
    }

    return "status-" + valor.toLowerCase().replaceAll("_", "-");
}

async function carregarAgendamentos() {
    const listaAgendamentos = document.getElementById("listaAgendamentos");
    const totalAgendamentos = document.getElementById("totalAgendamentos");
    const statusAgendamentos = document.getElementById("statusAgendamentos");

    try {
        const resposta = await fetch(`${API_URL}/agendamentos/paciente/${paciente.id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possivel carregar agendamentos.");
        }

        const agendamentos = await resposta.json();

        totalAgendamentos.textContent = agendamentos.length;
        statusAgendamentos.textContent = `${agendamentos.length} encontrados`;

        if (agendamentos.length === 0) {
            listaAgendamentos.innerHTML = `
                <p class="empty">Você ainda não possui agendamentos.</p>
            `;
            return;
        }

        listaAgendamentos.innerHTML = "";

        agendamentos.forEach(function (agendamento) {
            const profissional = agendamento.profissional;
            const card = document.createElement("article");

            card.classList.add("appointment-card");

            card.innerHTML = `
                <div>
                    <h3>${agendamento.dataConsulta || "-"} as ${agendamento.horaConsulta || "-"}</h3>
                    <p>Profissional: ${profissional ? profissional.nome : "-"}</p>
                    <p>Especialidade: ${profissional ? profissional.especialidadeProfissional : "-"}</p>
                    <p>Observacao: ${agendamento.observacao || "-"}</p>
                </div>

                <span class="appointment-status">${agendamento.statusAgendamento || "-"}</span>
            `;

            listaAgendamentos.appendChild(card);
        });
    } catch (erro) {
        statusAgendamentos.textContent = "Erro";
        listaAgendamentos.innerHTML = `
            <p class="empty">Erro: ${erro.message}</p>
        `;
    }
}

async function carregarProntuario() {
    const listaRegistros = document.getElementById("listaRegistros");
    const totalProntuarios = document.getElementById("totalProntuarios");
    const statusProntuarios = document.getElementById("statusProntuarios");

    try {
        const resposta = await fetch(`${API_URL}/prontuarios/paciente/${paciente.id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possivel carregar prontuarios.");
        }

        const prontuarios = await resposta.json();

        totalProntuarios.textContent = prontuarios.length;
        statusProntuarios.textContent = `${prontuarios.length} registros`;

        if (prontuarios.length === 0) {
            listaRegistros.innerHTML = `
                <p class="empty">Você ainda não possui registros medicos.</p>
            `;
            return;
        }

        listaRegistros.innerHTML = "";

        prontuarios.forEach(function (prontuario) {
            const profissional = prontuario.profissional;
            const card = document.createElement("article");

            card.classList.add("record-card");
            
            card.innerHTML = `
                <div class="record-card-header">
                    <div>
                        <h3>${profissional ? profissional.nome : "Atendimento medico"}</h3>
                        <p>Especialidade: ${profissional ? profissional.especialidadeProfissional || "-" : "-"}</p>
                    </div>

                    <span class="record-date">${prontuario.dataAtendimento || "-"}</span>
                </div>

                <div class="record-details">
                    <div>
                        <strong>Sintomas</strong>
                        <p>${prontuario.sintomas || "-"}</p>
                    </div>

                    <div>
                        <strong>Diagnostico</strong>
                        <p>${prontuario.diagnostico || "-"}</p>
                    </div>

                    <div>
                        <strong>Prescricao</strong>
                        <p>${prontuario.prescricao || "-"}</p>
                    </div>

                    <div>
                        <strong>Observacoes</strong>
                        <p>${prontuario.observacoes || "-"}</p>
                    </div>
                </div>
            `;

            listaRegistros.appendChild(card);
        });
    } catch (erro) {
        statusProntuarios.textContent = "Erro";
        listaRegistros.innerHTML = `
            <p class="empty">Erro: ${erro.message}</p>
        `;
    }
}

async function carregarAtendimentos() {
    const listaAtendimentos = document.getElementById("listaAtendimentos");
    const totalAtendimentos = document.getElementById("totalAtendimentos");
    const statusAtendimentos = document.getElementById("statusAtendimentos");

    try {
        const resposta = await fetch(`${API_URL}/atendimentos-medicos/paciente/${paciente.id}`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar atendimentos medicos.");
        }

        const atendimentos = await resposta.json();

        totalAtendimentos.textContent = atendimentos.length;
        statusAtendimentos.textContent = `${atendimentos.length} atendimentos`;

        if (atendimentos.length === 0) {
            listaAtendimentos.innerHTML = `
                <p class="empty">Voce ainda nao possui atendimentos medicos.</p>
            `;
            return;
        }

        listaAtendimentos.innerHTML = "";

        atendimentos.forEach(function (atendimento) {
            const profissional = atendimento.profissional;
            const card = document.createElement("article");

            card.classList.add("record-card");

            card.innerHTML = `
                <div class="record-card-header">
                    <div>
                        <h3>${profissional ? profissional.nome : "Atendimento medico"}</h3>
                        <p>Especialidade: ${profissional ? profissional.especialidadeProfissional || "-" : "-"}</p>
                        <p>Inicio: ${formatarDataHora(atendimento.dataHoraInicio)}</p>
                        <p>Fim: ${formatarDataHora(atendimento.dataHoraFim)}</p>
                    </div>

                    <span class="status-badge ${classeStatus(atendimento.statusAtendimentoMedico)}">
                        ${formatarEnum(atendimento.statusAtendimentoMedico)}
                    </span>
                </div>

                <div class="record-details">
                    <div>
                        <strong>Queixa principal</strong>
                        <p>${atendimento.queixaPrincipal || "-"}</p>
                    </div>

                    <div>
                        <strong>Diagnostico</strong>
                        <p>${atendimento.diagnostico || "-"}</p>
                    </div>

                    <div>
                        <strong>Conduta</strong>
                        <p>${atendimento.conduta || "-"}</p>
                    </div>

                    <div>
                        <strong>Observacoes</strong>
                        <p>${atendimento.observacoes || "-"}</p>
                    </div>
                </div>
            `;

            listaAtendimentos.appendChild(card);
        });
    } catch (erro) {
        statusAtendimentos.textContent = "Erro";
        listaAtendimentos.innerHTML = `
            <p class="empty">Erro: ${erro.message}</p>
        `;
    }
}

async function carregarExames() {
    const listaExames = document.getElementById("listaExames");
    const totalExames = document.getElementById("totalExames");
    const statusExames = document.getElementById("statusExames");

    try {
        const resposta = await fetch(`${API_URL}/exames/paciente/${paciente.id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possivel carregar exames.");
        }

        const exames = await resposta.json();

        totalExames.textContent = exames.length;
        statusExames.textContent = `${exames.length} exames`;

        if (exames.length === 0) {
            listaExames.innerHTML = `
                <p class="empty">Voce ainda nao possui exames cadastrados.</p>
            `;
            return;
        }

        listaExames.innerHTML = "";

        exames.forEach(function (exame) {
            const profissional = exame.profissional;
            const card = document.createElement("article");

            card.classList.add("exam-card");

            card.innerHTML = `
                <div class="record-card-header">
                    <div>
                        <h3>${exame.tipoExame || "Exame"}</h3>
                        <p>Profissional: ${profissional ? profissional.nome : "-"}</p>
                        <p>Solicitacao: ${exame.dataSolicitacao || "-"}</p>
                    </div>

                    <span class="exam-status">${formatarEnum(exame.statusExame)}</span>
                </div>

                <div class="exam-details">
                    <div>
                        <strong>Observacao</strong>
                        <p>${exame.observacao || "-"}</p>
                    </div>

                    <div>
                        <strong>Resultado</strong>
                        <p>${exame.resultado || "-"}</p>
                    </div>

                    <div>
                        <strong>Data do resultado</strong>
                        <p>${exame.dataResultado || "-"}</p>
                    </div>
                </div>
            `;

            listaExames.appendChild(card);
        });
    } catch (erro) {
        statusExames.textContent = "Erro";
        listaExames.innerHTML = `
            <p class="empty">Erro: ${erro.message}</p>
        `;
    }
}

async function carregarPrescricoes() {
    const listaPrescricoes = document.getElementById("listaPrescricoes");
    const totalPrescricoes = document.getElementById("totalPrescricoes");
    const statusPrescricoes = document.getElementById("statusPrescricoes");

    try {
        const resposta = await fetch(`${API_URL}/prescricoes-medicas/paciente/${paciente.id}`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar prescricoes.");
        }

        const prescricoes = await resposta.json();

        totalPrescricoes.textContent = prescricoes.length;
        statusPrescricoes.textContent = `${prescricoes.length} prescricoes`;

        if (prescricoes.length === 0) {
            listaPrescricoes.innerHTML = `
                <p class="empty">Voce ainda nao possui prescricoes cadastradas.</p>
            `;
            return;
        }

        listaPrescricoes.innerHTML = "";

        prescricoes.forEach(function (prescricao) {
            const profissional = prescricao.profissional;
            const card = document.createElement("article");

            card.classList.add("prescription-card");

            card.innerHTML = `
                <div class="record-card-header">
                    <div>
                        <h3>${prescricao.medicamento || "Prescricao"}</h3>
                        <p>Profissional: ${profissional ? profissional.nome : "-"}</p>
                        <p>Dosagem: ${prescricao.dosagem || "-"}</p>
                    </div>

                    <span class="prescription-date">${prescricao.dataPrescricao || "-"}</span>
                </div>

                <div class="prescription-details">
                    <div>
                        <strong>Frequencia</strong>
                        <p>${prescricao.frequencia || "-"}</p>
                    </div>

                    <div>
                        <strong>Duracao</strong>
                        <p>${prescricao.duracao || "-"}</p>
                    </div>

                    <div>
                        <strong>Orientacoes</strong>
                        <p>${prescricao.orientacoes || "-"}</p>
                    </div>
                </div>
            `;

            listaPrescricoes.appendChild(card);
        });
    } catch (erro) {
        statusPrescricoes.textContent = "Erro";
        listaPrescricoes.innerHTML = `
            <p class="empty">Erro: ${erro.message}</p>
        `;
    }
}

carregarAgendamentos();
carregarProntuario();
carregarAtendimentos();
carregarExames();
carregarPrescricoes();
