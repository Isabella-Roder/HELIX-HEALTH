package com.helixhealth.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.helixhealth.paciente.GeneroPaciente;
import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.paciente.SexoPaciente;
import com.helixhealth.profissional.EspecialidadeProfissional;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;
import com.helixhealth.profissional.TipoProfissional;
import com.helixhealth.usuario.TipoUsuario;
import com.helixhealth.usuario.Usuario;
import com.helixhealth.usuario.UsuarioRepository;

@Configuration
public class DadosIniciaisConfig {

    private static final String CPF_ISABELLA = "00000000000";
    private static final String EMAIL_ISABELLA = "isabella@helixhealth.com";

    @Bean
    CommandLineRunner criarUsuarioAdminInicial(
        PacienteRepository pacienteRepository,
        ProfissionalRepository profissionalRepository,
        UsuarioRepository usuarioRepository
    ) {
        return args -> {
            Paciente paciente = pacienteRepository.findByCpf(CPF_ISABELLA)
                .orElseGet(Paciente::new);

            paciente.setNome("Isabella");
            paciente.setNomeSocial("Isabella");
            paciente.setCpf(CPF_ISABELLA);
            paciente.setTelefone("(00) 00000-0000");
            paciente.setEndereco("Endereco de teste");
            paciente.setConvenio("Particular");
            paciente.setContatoEmergencia("(00) 00000-0000");
            paciente.setDataNascimento(LocalDate.of(2000, 1, 1));
            paciente.setSexo(SexoPaciente.FEMININO);
            paciente.setGenero(GeneroPaciente.MULHER_TRANS);

            Paciente pacienteSalvo = pacienteRepository.save(paciente);

            Profissional profissional = profissionalRepository.findByCpf(CPF_ISABELLA)
                .orElseGet(Profissional::new);

            profissional.setNome("Isabella");
            profissional.setNomeSocial("Isabella");
            profissional.setCpf(CPF_ISABELLA);
            profissional.setTelefone("(00) 00000-0000");
            profissional.setEmail(EMAIL_ISABELLA);
            profissional.setTipoProfissional(TipoProfissional.MEDICO);
            profissional.setEspecialidadeProfissional(EspecialidadeProfissional.CLINICO_GERAL);
            profissional.setRegistroProfissional("CRM-000000");
            profissional.setAtivo(true);

            Profissional profissionalSalvo = profissionalRepository.save(profissional);

            Usuario usuario = usuarioRepository.findByEmail(EMAIL_ISABELLA)
                .orElseGet(Usuario::new);

            usuario.setNome("Isabella");
            usuario.setNomeSocial("Isabella");
            usuario.setEmail(EMAIL_ISABELLA);
            usuario.setSenha("123456");
            usuario.setTipoUsuario(List.of(TipoUsuario.ADMIN, TipoUsuario.PACIENTE, TipoUsuario.MEDICO));
            usuario.setAtivo(true);
            usuario.setPaciente(pacienteSalvo);
            usuario.setProfissional(profissionalSalvo);

            usuarioRepository.save(usuario);
        };
    }

}
