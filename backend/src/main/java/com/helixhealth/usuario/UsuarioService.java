package com.helixhealth.usuario;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;

@Service
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final PacienteRepository pacienteRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, PacienteRepository pacienteRepository) {
        this.usuarioRepository = usuarioRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }
    
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado."));
    }

    public void verificacoesCadastro( Usuario usuario) {
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email nao pode ser vazio.");
        }

        if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            throw new IllegalArgumentException("Senha nao pode ser vazio.");
        }

        if (usuario.getNome() == null || usuario.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome nao pode ser vazio.");
        }
    }

    public Usuario cadastrar(Usuario usuario) {
        verificacoesCadastro(usuario);
        prepararPacienteVinculado(usuario);

        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha)
            .orElseThrow(() -> new IllegalArgumentException("Email ou senha invalidos."));
    }

    public Usuario atualizar(Long id, Usuario dadosAtualizados) {
        Usuario usuario = buscarPorId(id);

        usuario.setEmail(dadosAtualizados.getEmail());
        usuario.setSenha(dadosAtualizados.getSenha());
        usuario.setNome(dadosAtualizados.getNome());
        usuario.setNomeSocial(dadosAtualizados.getNomeSocial());
        usuario.setTipoUsuario(dadosAtualizados.getTipoUsuario());
        usuario.setAtivo(dadosAtualizados.getAtivo());
        usuario.setPaciente(dadosAtualizados.getPaciente());

        verificacoesCadastro(usuario);
        prepararPacienteVinculado(usuario);

        return usuarioRepository.save(usuario);
    }

    public void deletar(Long id) {
        Usuario usuario = buscarPorId(id);

        usuarioRepository.delete(usuario);
    }

    public void prepararPacienteVinculado(Usuario usuario) {
        if (usuario.getTipoUsuario() != TipoUsuario.PACIENTE) {
            usuario.setPaciente(null);
            return;
        }

        if (usuario.getPaciente() == null || usuario.getPaciente().getId() == null) {
            usuario.setPaciente(null);
            return;
        }

        Paciente paciente = pacienteRepository.findById(usuario.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Paciente nao encontrado."));

        usuario.setPaciente(paciente);
    }

}
