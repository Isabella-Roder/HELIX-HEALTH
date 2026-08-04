if (window.acessoBloqueado) {
    throw new Error("Acesso bloqueado.");
}

const API_URL = "http://localhost:8080";

const campoBuscaPaciente = document.getElementById("campoBuscaPaciente");
const botaoBuscarPaciente = document.getElementById("botaoBuscarPaciente");
const botaoLimparBuscaPaciente = document.getElementById("botaoLimparBuscaPaciente");
const botaoSair = document.getElementById("botaoSair");
const mensagem = document.getElementById("mensagem");

const totalPacientesEncontrados = document.getElementById("totalPacientesEncontrados");
const totalPacientesCadastrados = document.getElementById("totalPacientesCadastrados");
const tipoBuscaPaciente = document.getElementById("tipoBuscaPaciente");
const resultadoBuscaPacientes = document.getElementById("resultadoBuscaPacientes");

let pacientes = [];

async function buscarJson(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar dados.");
    }

    return await resposta.json();
}

function mostrarVazio(texto) {
    resultadoBuscaPacientes.innerHTML = `<p class="empty">${texto}</p>`;
}

function normalizarBusca(valor) {
    if (!valor) {
        return "";
    }

    return String(valor).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function pacienteCombina(paciente, termo) {
    const termoNormalizado = normalizarBusca(termo);

    const nome = normalizarBusca(paciente.nome);
    const nomeSocial = normalizarBusca(paciente.nomeSocial);
    const cpf = normalizarBusca(paciente.cpf);
    const telefone = normalizarBusca(paciente.telefone);

    const palavras = termoNormalizado.split(" ").filter(Boolean);

    const nomeCompletoCombina = nome.includes(termoNormalizado) || nomeSocial.includes(termoNormalizado);

    const palavrasCombinam = palavras.every((palavra) => {
        return nome.includes(palavra) || nomeSocial.includes(palavra);
    });

    return (
        nomeCompletoCombina ||
        palavrasCombinam || 
        cpf.includes(termoNormalizado) ||
        telefone.includes(termoNormalizado)
    );
}

async function carregarPacientes() {
    try {
        mostrarMensagem(mensagem, "Carregando pacientes...", "loading");

        pacientes = await buscarJson(`${API_URL}/pacientes`);
        totalPacientesCadastrados.textContent = pacientes.length;

        limparMensagem(mensagem);
    } catch (erro) {
        console.error(erro);
        mostrarMensagem(mensagem, "Erro: " + erro.message, "error");
    }
}

function renderizarPacientes(lista) {
    resultadoBuscaPacientes.innerHTML = "";
    totalPacientesEncontrados.textContent = lista.length;

    if (lista.length === 0) {
        mostrarVazio("Nenhum paciente encontrado.");
        return;
    }

    lista.forEach((paciente) => {
        resultadoBuscaPacientes.innerHTML += `
            <article class="patient-search-card">
                <div>
                    <h3>${paciente.nome || "Paciente"}</h3>
                    <p><strong>Nome social:</strong> ${paciente.nomeSocial || "-"}</p>
                    <p><strong>CPF:</strong> ${paciente.cpf || "-"}</p>
                    <p><strong>Telefone:</strong> ${paciente.telefone || "-"}</p>
                    <p><strong>Nascimento:</strong> ${paciente.dataNascimento || "-"}</p>
                    <p><strong>Sexo:</strong> ${paciente.sexo || "-"}</p>
                    <p><strong>Gênero:</strong> ${paciente.genero || "-"}</p>
                    <p><strong>Convênio:</strong> ${paciente.convenio || "-"}</p>
                </div>

                <div class="patient-search-actions">
                    <a href="detalhes-paciente.html?id=${paciente.id}">Histórico completo</a>
                    <a href="cadastro-paciente.html?id=${paciente.id}">Editar paciente</a>
                    <a href="cadastro-agendamento.html?pacienteId=${paciente.id}">Novo agendamento</a>
                </div>
            </article>
        `;
    });
}

function buscarPaciente() {
    const termo = campoBuscaPaciente.value.trim();

    if (!termo) {
        mostrarMensagem(mensagem, "Digite um nome, CPF ou telefone para buscar.", "warning");
        campoBuscaPaciente.focus();
        return;
    }

    const pacientesFiltrados = pacientes.filter((paciente) => {
        return pacienteCombina(paciente, termo);
    });

    renderizarPacientes(pacientesFiltrados);

    const palavras = normalizarBusca(termo).split(" ").filter(Boolean);

    tipoBuscaPaciente.textContent = palavras.length > 1 ? "Nome completo" : "Nome";

    mostrarMensagem(
        mensagem,
        `${pacientesFiltrados.length} paciente(s) encontrado(s).`,
        pacientesFiltrados.length > 0 ? "success" : "warning"
    );
}

botaoBuscarPaciente.addEventListener("click", buscarPaciente);

campoBuscaPaciente.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buscarPaciente();
    }
});

botaoSair.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

carregarPacientes();
