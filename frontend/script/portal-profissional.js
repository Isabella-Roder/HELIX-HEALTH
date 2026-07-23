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
const profissional = usuario.profissional;

function temTipo(usuario, tipoUsuario) {
    const tipos = Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario
        : [usuario.tipoUsuario];

    return tipos.includes(tipoUsuario);
}

function listarTiposUsuario(usuario) {
    return Array.isArray(usuario.tipoUsuario)
        ? usuario.tipoUsuario.join(", ")
        : usuario.tipoUsuario;
}

if (!profissional) {
    redirecionar("portal-seletor.html");
}

const API_URL = "http://localhost:8080";

document.getElementById("nomeProfissional").textContent = profissional.nome || usuario.nome;
document.getElementById("tipoProfissional").textContent = profissional.tipoProfissional || listarTiposUsuario(usuario);
document.getElementById("emailUsuario").textContent = usuario.email || profissional.email || "-";
document.getElementById("statusConta").textContent = usuario.ativo ? "Ativa" : "Inativa";
document.getElementById("especialidadeProfissional").textContent = profissional.especialidadeProfissional || "-";

document.getElementById("dadoNome").textContent = profissional.nome || "-";
document.getElementById("dadoNomeSocial").textContent = profissional.nomeSocial || "-";
document.getElementById("dadoCpf").textContent = profissional.cpf || "-";
document.getElementById("dadoTelefone").textContent = profissional.telefone || "-";
document.getElementById("dadoRegistro").textContent = profissional.registroProfissional || "-";
document.getElementById("dadoTipo").textContent = profissional.tipoProfissional || "-";

document.getElementById("botaoSair").addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.replace("login.html");
});

async function carregarAgendamentos() {
    const listaAgendamentos = document.getElementById("listaAgendamentos");
    const totalAgendamentos = document.getElementById("totalAgendamentos");
    const statusAgendamentos = document.getElementById("statusAgendamentos");

    try {
        const resposta = await fetch(`${API_URL}/agendamentos/profissional/${profissional.id}`);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar consultas.");
        }

        const agendamentos = await resposta.json();

        totalAgendamentos.textContent = agendamentos.length;
        statusAgendamentos.textContent = `${agendamentos.length} encontradas`;

        if (agendamentos.length === 0) {
            listaAgendamentos.innerHTML = `
                <p class="empty">Voce ainda nao possui consultas agendadas.</p>
            `;
            return;
        }

        listaAgendamentos.innerHTML = "";

        agendamentos.forEach(function (agendamento) {
            const paciente = agendamento.paciente;
            const linkProntuario = paciente
                ? `cadastro-prontuario.html?pacienteId=${paciente.id}&profissionalId=${profissional.id}&dataAtendimento=${agendamento.dataConsulta || ""}`
                : "cadastro-prontuario.html";
            const card = document.createElement("article");

            card.classList.add("appointment-card");

            card.innerHTML = `
                <div>
                    <h3>${agendamento.dataConsulta || "-"} as ${agendamento.horaConsulta || "-"}</h3>
                    <p>Paciente: ${paciente ? paciente.nome : "-"}</p>
                    <p>Telefone: ${paciente ? paciente.telefone || "-" : "-"}</p>
                    <p>Observacao: ${agendamento.observacao || "-"}</p>

                    <div class="appointment-actions">
                        <a href="${linkProntuario}" class="record-link">Registrar prontuario</a>
                    </div>
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

carregarAgendamentos();
