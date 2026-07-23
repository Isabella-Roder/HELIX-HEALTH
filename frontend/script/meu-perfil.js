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
        mostrarTexto("sexoPaciente", "-");
        mostrarTexto("generoPaciente", "-");
        return;
    }

    mostrarTexto("nomePaciente", paciente.nome);
    mostrarTexto("cpfPaciente", paciente.cpf);
    mostrarTexto("telefonePaciente", paciente.telefone);
    mostrarTexto("sexoPaciente", formatarEnum(paciente.sexo));
    mostrarTexto("generoPaciente", formatarEnum(paciente.genero));
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
    mostrarTexto("tipoProfissional", formatarEnum(profissional.tipoProfissional));
    mostrarTexto("espacialidadeProfissional", formatarEnum(profissional.especialidadeProfissional));
}

document.getElementById("botaoSair").addEventListener("click", function () {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("perfilSelecionado");
    window.location.href = "login.html";
});

document.getElementById("botaoVoltar").addEventListener("click", function () {
    const perfilSelecionado = localStorage.getItem("perfilSelecionado");

    if (perfilSelecionado === "PACIENTE") {
        window.location.href = "portal-paciente.html";
    } else if (perfilSelecionado === "PROFISSIONAL") {
        window.location.href = "portal-profissional.html";
    } else if (perfilSelecionado === "ADMIN") {
        window.location.href = "portal-usuario.html";
    } else {
        window.location.href = "portal-seletor.html";
    }
});

function formatarEnum(valor) {
    if (!valor) {
        return "-";
    }

    return valor.toLowerCasa().replaceAll("_", " ").replace(/\b\w/g, function (letra) {
        return letra.toUpperCasa();
    })
}

carregarDadosUsuario();
carregarDadosPaciente();
carregarDadosProfissional();