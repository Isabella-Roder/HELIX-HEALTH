package com.helixhealth.paciente;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.usuario.TipoUsuario;
import com.helixhealth.usuario.Usuario;
import com.helixhealth.usuario.UsuarioRepository;

@Service
public class PacienteService {
    
    private final PacienteRepository pacienteRepository;
    private final UsuarioRepository usuarioRepository;

    public PacienteService(PacienteRepository pacienteRepository, UsuarioRepository usuarioRepository) {
        this.pacienteRepository = pacienteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Paciente> listar() {
        return pacienteRepository.findAll();
    }

    public Paciente buscarPorId(Long id) {
        return pacienteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado."));
    }

    public void verificacoesCadastro(Paciente paciente) {
        if (paciente.getNome() ==  null || paciente.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome nao pode ser vazio.");
        } else if (paciente.getCpf() == null || paciente.getCpf().isBlank()) {
            throw new IllegalArgumentException("CPF nao pode ser vazio.");
        } else if (paciente.getTelefone() == null || paciente.getTelefone().isBlank()) {
            throw new IllegalArgumentException("Telefone nao pode ser vazio.");
        } else if (paciente.getEndereco() ==  null || paciente.getEndereco().isBlank()) {
            throw new IllegalArgumentException("Endereço nao pode ser vazio.");
        } else if (paciente.getDataNascimento() == null) {
            throw new IllegalArgumentException("Data de nascimento nao pode ser vazio.");
        } else if (paciente.getContatoEmergencia() == null || paciente.getContatoEmergencia().isBlank()) {
            throw new IllegalArgumentException("Contato de emergencia nao pode ser vazio.");
        }
    }

    public Paciente cadastrar(Paciente paciente) {
        verificacoesCadastro(paciente);

        return pacienteRepository.save(paciente);
    }

    public Paciente atualizar(Long id, Paciente atualizarDados) {
        Paciente paciente = buscarPorId(id);

        paciente.setNome(atualizarDados.getNome());
        paciente.setNomeSocial(atualizarDados.getNomeSocial());
        paciente.setCpf(paciente.getCpf());
        paciente.setTelefone(atualizarDados.getTelefone());
        paciente.setEndereco(atualizarDados.getEndereco());
        paciente.setConvenio(atualizarDados.getConvenio());
        paciente.setContatoEmergencia(atualizarDados.getContatoEmergencia());
        paciente.setDataNascimento(atualizarDados.getDataNascimento());
        paciente.setSexo(atualizarDados.getSexo());
        paciente.setGenero(atualizarDados.getGenero());

        verificacoesCadastro(paciente);

        return pacienteRepository.save(paciente);
    }

    public void deletar(Long id) {
        Paciente paciente = buscarPorId(id);

        pacienteRepository.delete(paciente);
    }

    public Paciente cadastrarComUsuario(PacienteUsuarioRequest request) {
        Paciente paciente = new Paciente(
            request.getNome(),
            request.getNomeSocial(),
            request.getCpf(),
            request.getTelefone(),
            request.getEndereco(),
            request.getConvenio(),
            request.getContatoEmergencia(),
            request.getDataNascimento(),
            request.getSexo(),
            request.getGenero()
        );

        verificacoesCadastro(paciente);

        Paciente pacienteSalvo = pacienteRepository.save(paciente);

        Usuario usuario = new Usuario();
        usuario.setNome(pacienteSalvo.getNome());
        usuario.setNomeSocial(pacienteSalvo.getNomeSocial());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(request.getSenha());
        usuario.setTipoUsuario(TipoUsuario.PACIENTE);
        usuario.setAtivo(true);
        usuario.setPaciente(pacienteSalvo);

        usuarioRepository.save(usuario);

        return pacienteSalvo;
    }

}
