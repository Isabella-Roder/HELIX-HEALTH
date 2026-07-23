package com.helixhealth.usuario;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, PacienteRepository pacienteRepository, ProfissionalRepository profissionalRepository) {
        this.usuarioRepository = usuarioRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
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
        prepararProfissionalVinculado(usuario);

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
        usuario.setProfissional(dadosAtualizados.getProfissional());

        verificacoesCadastro(usuario);
        prepararPacienteVinculado(usuario);
        prepararProfissionalVinculado(usuario);

        return usuarioRepository.save(usuario);
    }

    public void deletar(Long id) {
        Usuario usuario = buscarPorId(id);

        usuarioRepository.delete(usuario);
    }

    public void prepararPacienteVinculado(Usuario usuario) {
        if (!temTipo(usuario, TipoUsuario.PACIENTE)) {
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

    public void prepararProfissionalVinculado(Usuario usuario) {
        if (!temTipoProfissional(usuario)) {
            usuario.setProfissional(null);
            return;
        }

        if (usuario.getProfissional() == null || usuario.getProfissional().getId() == null) {
            usuario.setProfissional(null);
            return;
        }

        Profissional profissional = profissionalRepository.findById(usuario.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao encontrado."));

        usuario.setProfissional(profissional);
    }

    private boolean temTipo(Usuario usuario, TipoUsuario tipoUsuario) {
        return usuario.getTipoUsuario() != null && usuario.getTipoUsuario().contains(tipoUsuario);
    }

    private boolean temTipoProfissional(Usuario usuario) {
        return temTipo(usuario, TipoUsuario.MEDICO)
            || temTipo(usuario, TipoUsuario.ENFERMEIRO)
            || temTipo(usuario, TipoUsuario.RECEPCAO)
            || temTipo(usuario, TipoUsuario.FICHARIO)
            || temTipo(usuario, TipoUsuario.FINANCEIRO)
            || temTipo(usuario, TipoUsuario.FARMACIA)
            || temTipo(usuario, TipoUsuario.ALMOXARIFADO);
    }

}
