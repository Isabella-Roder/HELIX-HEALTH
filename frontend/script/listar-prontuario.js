const API_URL = "http://localhost:8080";

const tabelaProntuarios = document.getElementById("tabelaProntuarios");
const totalProntuarios = document.getElementById("totalProntuarios");
const mensagem = document.getElementById("mensagem");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoSair = document.getElementById("botaoSair");

const filtroPaciente = document.getElementById("filtroPaciente");
const filtroProfissional = document.getElementById("filtroProfissional");
const botaoFiltrar = document.getElementById("botaoFiltrar");
const botaoLimparFiltro = document.getElementById("botaoLimparFiltro");

function limitarTexto(texto) {
    if (!texto) {
        return "-";
    }

    if (texto.length <= 70) {
        return texto;
    }

    return texto.substring(0, 70) + "...";
}

async function carregarProntuarios(url = `${API_URL}/prontuarios`) {
    try {
        mensagem.textContent = "";

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Nao foi possivel carregar prontuarios");
        }

        const prontuarios = await resposta.json();

        totalProntuarios.textContent = `${prontuarios.length} prontuarios encontrados`;
        tabelaProntuarios.innerHTML = "";

        if (prontuarios.length === 0) {
            tabelaProntuarios.innerHTML = `
                <tr>
                    <td colspan="7" class="empty">Nenhum prontuario cadastrado.</td>
                </tr>
            `;
            return;
        }

        prontuarios.forEach(function (prontuario) {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${prontuario.id}</td>
                <td>${prontuario.paciente ? prontuario.paciente.nome : "-"}</td>
                <td>${prontuario.profissional ? prontuario.profissional.nome : "-"}</td>
                <td>${prontuario.dataAtendimento || "-"}</td>
                <td>${limitarTexto(prontuario.sintomas)}</td>
                <td>${limitarTexto(prontuario.diagnostico)}</td>
                <td>
                    <a href="cadastro-prontuario.html?id=${prontuario.id}">Editar</a>
                    <button type="button" onclick="deletarProntuario(${prontuario.id})">Excluir</button>
                </td>
            `;

            tabelaProntuarios.appendChild(linha);
        });
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function deletarProntuario(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este prontuario?");

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/prontuarios/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Nao foi possivel excluir prontuario");
        }

        mensagem.textContent = "Prontuario excluido com sucesso.";
        carregarProntuarios();
    } catch (erro) {
        mensagem.textContent = "Erro: " + erro.message;
    }
}

async function carregarPacienteFiltro() {
    const resposta = await fetch(`${API_URL}/pacientes`);
    const pacientes = await resposta.json();

    pacientes.forEach(function (paciente) {
        const option = document.createElement("option");
        option.value = paciente.id;
        option.textContent = paciente.nome;
        filtroPaciente.appendChild(option);
    });
}

async function carregarProfissionalFiltro() {
    const resposta = await fetch(`${API_URL}/profissionais`);
    const profissionais = await resposta.json();

    profissionais.forEach(function (profissional) {
        const option = document.createElement("option");
        option.value = profissional.id;
        option.textContent = `${profissional.nome} - ${profissional.tipoProfissional}`;
        filtroProfissional.appendChild(option);
    });
}

function filtrarProntuarios() {
    const pacienteId = filtroPaciente.value;
    const profissionalId = filtroProfissional.value;

    if (pacienteId && profissionalId) {
        mensagem.textContent = "Use apenas um filtro por vez.";
        return;
    }

    if (pacienteId) {
        carregarProntuarios(`${API_URL}/prontuarios/paciente/${pacienteId}`);
        return;
    }

    if (profissionalId) {
        carregarProntuarios(`${API_URL}/prontuarios/profissional/${profissionalId}`);
        return;
    }

    carregarProntuarios();
}

function limparFiltros() {
    filtroPaciente.value = "";
    filtroProfissional.value = "";
    carregarProntuarios();
}

botaoAtualizar.addEventListener("click", function () {
    carregarProntuarios();
});

botaoFiltrar.addEventListener("click", filtrarProntuarios);

botaoLimparFiltro.addEventListener("click", limparFiltros);

botaoSair.addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
});

async function inicioPagina() {
    await carregarPacienteFiltro();
    await carregarProfissionalFiltro();
    await carregarProntuarios();
}

inicioPagina();