package com.helixhealth.usuario;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
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

        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha)
            .orElseThrow(() -> new IllegalArgumentException("Email ou senha invalidos."));
    }

}
