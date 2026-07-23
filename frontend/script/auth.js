const usuarioLogado = localStorage.getItem("usuarioLogado");

function bloquearPagina(destino) {
    window.acessoBloqueado = true;

    if (document.body) {
        document.body.innerHTML = "";
    }

    window.location.replace(destino);
    throw new Error("Redirecionando acesso.");
}

if (!usuarioLogado) {
    bloquearPagina("login.html");
} else {
    try {
        const usuario = JSON.parse(usuarioLogado);
        const paginaAtual = window.location.pathname.split("/").pop();

        function obterTiposUsuario() {
            return Array.isArray(usuario.tipoUsuario)
                ? usuario.tipoUsuario
                : [usuario.tipoUsuario].filter(Boolean);
        }

        function temTipo(tipoUsuario) {
            return obterTiposUsuario().includes(tipoUsuario);
        }

        function temTipoProfissional() {
            const tiposProfissionais = [
                "MEDICO",
                "ENFERMEIRO",
                "RECEPCAO",
                "FICHARIO",
                "FINANCEIRO",
                "FARMACIA",
                "ALMOXARIFADO"
            ];

            return obterTiposUsuario().some(function (tipoUsuario) {
                return tiposProfissionais.includes(tipoUsuario);
            });
        }

        function portaisDisponiveis() {
            const portais = [];

            if (temTipo("PACIENTE") && usuario.paciente) {
                portais.push("PACIENTE");
            }

            if (temTipoProfissional() && usuario.profissional) {
                portais.push("PROFISSIONAL");
            }

            if (temTipo("ADMIN")) {
                portais.push("ADMIN");
            }

            return portais;
        }

        function redirecionarParaPortal() {
            const perfis = portaisDisponiveis();

            if (perfis.length !== 1) {
                bloquearPagina("portal-seletor.html");
                return;
            }

            if (perfis.includes("PACIENTE")) {
                bloquearPagina("portal-paciente.html");
                return;
            }

            if (perfis.includes("PROFISSIONAL")) {
                bloquearPagina("portal-profissional.html");
                return;
            }

            bloquearPagina("portal-usuario.html");
        }

        const permissoes = {
            "portal-paciente.html": ["PACIENTE"],
            "portal-profissional.html": ["PROFISSIONAL"],
            "portal-usuario.html": ["ADMIN"],
            "cadastro-usuario.html": ["ADMIN"],
            "listar-usuario.html": ["ADMIN"],
            "cadastro-paciente.html": ["ADMIN"],
            "listar-paciente.html": ["ADMIN"],
            "cadastro-profissional.html": ["ADMIN"],
            "listar-profissional.html": ["ADMIN"],
            "cadastro-agendamento.html": ["ADMIN"],
            "listar-agendamento.html": ["ADMIN"],
            "cadastro-prontuario.html": ["ADMIN", "PROFISSIONAL"],
            "listar-prontuario.html": ["ADMIN", "PROFISSIONAL"]
        };

        const paginasLivres = [
            "portal-seletor.html"
        ];

        const perfisPermitidos = permissoes[paginaAtual];

        if (!paginasLivres.includes(paginaAtual) && perfisPermitidos) {
            const temPermissao = perfisPermitidos.some(function (perfil) {
                if (perfil === "PACIENTE") {
                    return temTipo("PACIENTE") && usuario.paciente;
                }

                if (perfil === "PROFISSIONAL") {
                    return temTipoProfissional() && usuario.profissional;
                }

                return temTipo(perfil);
            });

            if (!temPermissao) {
                redirecionarParaPortal();
            }
        }
    } catch (erro) {
        if (erro.message !== "Redirecionando acesso.") {
            localStorage.removeItem("usuarioLogado");
            bloquearPagina("login.html");
        }
    }
}
