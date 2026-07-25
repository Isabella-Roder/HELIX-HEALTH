package com.helixhealth.leito;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class LeitoService {
    
    private final LeitoRepository leitoRepository;

    public LeitoService(LeitoRepository leitoRepository) {
        this.leitoRepository = leitoRepository;
    }

    public List<Leito> listar() {
        return leitoRepository.findAll();
    }

    public Leito buscarPorId(Long id) {
        return leitoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Leito nao encontrado."));
    }

    public List<Leito> listarPorStatus(StatusLeito statusLeito) {
        return leitoRepository.findByStatusLeito(statusLeito);
    }

    public List<Leito> listarPorSetor(String setor) {
        return leitoRepository.findBySetor(setor);
    }

    public void validacoesCadastro(Leito leito) {
        if (leito.getNumero() == null || leito.getNumero().isBlank()) {
            throw new IllegalArgumentException("Numero do leito nao pode ser vazio.");
        } else if (leito.getSetor() == null || leito.getSetor().isBlank()) {
            throw new IllegalArgumentException("Setor nao pode ser vazio.");
        } else if (leito.getQuarto() == null || leito.getQuarto().isBlank()) {
            throw new IllegalArgumentException("Quarto nao pode ser vazio.");
        } else if (leito.getStatusLeito() == null) {
            throw new IllegalArgumentException("Status do leito nao pode ser vazio.");
        }
    }

    public Leito cadastrar(Leito leito) {
        validacoesCadastro(leito);

        return leitoRepository.save(leito);
    }

    public Leito atualizar(Long id, Leito dadosAtualizados) {
        Leito leito = buscarPorId(id);

        leito.setNumero(dadosAtualizados.getNumero());
        leito.setSetor(dadosAtualizados.getSetor());
        leito.setQuarto(dadosAtualizados.getQuarto());
        leito.setStatusLeito(dadosAtualizados.getStatusLeito());

        validacoesCadastro(leito);

        return leitoRepository.save(leito);
    }

    public void deletar(Long id) {
        Leito leito = buscarPorId(id);

        leitoRepository.delete(leito);
    }

}
