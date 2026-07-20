package com.helixhealth.profissional;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProfissionalService {
    
    private final ProfissionalRepository profissionalRepository;

    public ProfissionalService(ProfissionalRepository profissionalRepository) {
        this.profissionalRepository = profissionalRepository;
    }

    public List<Profissional> listar() {
        return profissionalRepository.findAll();
    }

    public Profissional buscarPorId(Long id) {
        return profissionalRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao encontrado."));
    }

    public void verificacoesCadastro(Profissional profissional) {
        if (profissional.getNome() ==  null || profissional.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome nao pode ser vazio.");
        } else if (profissional.getCpf() == null || profissional.getCpf().isBlank()) {
            throw new IllegalArgumentException("CPF nao pode ser vazio.");
        } else if (profissional.getTelefone() == null || profissional.getTelefone().isBlank()) {
            throw new IllegalArgumentException("Telefone nao pode ser vazio.");
        } else if (profissional.getEmail() == null || profissional.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email nao pode ser vazio.");
        } else if (profissional.getTipoProfissional() == null) {
            throw new IllegalArgumentException("Tipo profissional nao pode ser vazio.");
        }
    }

    public Profissional cadastrar(Profissional profissional) {
        verificacoesCadastro(profissional);

        if (profissional.getAtivo() == null) {
            profissional.setAtivo(true);
        }

        return profissionalRepository.save(profissional);
    }

    public Profissional atualizar(Long id, Profissional dadosAtualizados) {
        Profissional profissional = buscarPorId(id);

        profissional.setNome(dadosAtualizados.getNome());
        profissional.setNomeSocial(dadosAtualizados.getNomeSocial());
        profissional.setCpf(dadosAtualizados.getCpf());
        profissional.setTelefone(dadosAtualizados.getTelefone());
        profissional.setEmail(dadosAtualizados.getEmail());
        profissional.setTipoProfissional(dadosAtualizados.getTipoProfissional());
        profissional.setEspecialidadeProfissional(dadosAtualizados.getEspecialidadeProfissional());
        profissional.setRegistroProfissional(dadosAtualizados.getRegistroProfissional());
        profissional.setAtivo(dadosAtualizados.getAtivo());

        verificacoesCadastro(profissional);

        return profissionalRepository.save(profissional);
    }

    public void deletar(Long id) {
        Profissional profissional = buscarPorId(id);

        profissionalRepository.delete(profissional);
    }

}
