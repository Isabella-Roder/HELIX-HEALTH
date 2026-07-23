const usuarioSalvo = localStorage.getItem("usuarioLogado");

if (!usuarioSalvo) {
    window.location.href = "login.html";
}

const usuario = JSON.parse(usuarioSalvo);
const paciente = usuario.paciente;

if (usuario.tipoUsuario !== "PACIENTE" || !paciente) {
    window.location.href = "portal-usuario.html";
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
    window.location.href = "login.html";
});

const API_URL = "http://localhost:8080";

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

carregarAgendamentos();
carregarProntuario();