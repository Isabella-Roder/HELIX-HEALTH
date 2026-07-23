const usuarioSalvo = localStorage.getItem("usuarioLogado");

if (!usuarioSalvo) {
    window.location.href = "login.html";
}

const usuario = JSON.parse(usuarioSalvo);

function mostrarTexto(id, valor) {
    document.getElementById(id).textContent = valor || "-";
}

function listarTipoUsuario() {
    if (Array.isArray(usuario.tipoUsuario)) {
        return usuario.tipoUsuario.join(", "); 
    }

    return usuario.tipoUsuario || "-";
}

function carregarDadosUsuario() {
    mostrarTexto("nomeUsuario", usuario.nome);
    mostrarTexto("nomeSocialUsuario", usuario.nomeSocial);
    mostrarTexto("emailUsuario", usuario.email);
    mostrarTexto("statusUsuario", usuario.ativo ? "Ativo" : "Inativo");
    mostrarTexto("perfilUsuario", listarTipoUsuario());
}

function carregarDadosPaciente() {
    const paciente = usuario.paciente;

    if (!paciente) {
        mostrarTexto("nomePaciente", "Nenhum paciente vinculado");
        mostrarTexto("cpfPaciente", "-");
        mostrarTexto("telefonePaciente", "-");
        return;
    }

    mostrarTexto("nomePaciente", paciente.nome);
    mostrarTexto("cpfPaciente", paciente.cpf);
    mostrarTexto("telefonePaciente", paciente.telefone);
}

function carregarDadosProfissional() {
    const profissional = usuario.profissional;

    if (!profissional) {
        mostrarTexto("nomeProfissional", "Nenhum profissional vinculado");
        mostrarTexto("tipoProfissional", "-");
        mostrarTexto("especialidadeProfissionais", "-");
        return;
    }

    mostrarTexto("nomeProfissional", profissional.nome);
    mostrarTexto("tipoProfissional", profissional.tipoProfissional);
    mostrarTexto("espacialidadeProfissional", profissional.especialidade);
}

document.getElementById("botaoSair").addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

carregarDadosUsuario();
carregarDadosPaciente();
carregarDadosProfissional();