package com.helixhealth.fornecedor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;

    public FornecedorService(FornecedorRepository fornecedorRepository) {
        this.fornecedorRepository = fornecedorRepository;
    }

    public List<Fornecedor> listar() {
        return fornecedorRepository.findAll();
    }

    public Fornecedor buscarPorId(Long id) {
        return fornecedorRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Fornecedor nao encontrado."));
    }

    public List<Fornecedor> listarPorNome(String nome) {
        return fornecedorRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Fornecedor> listarPorCnpj(String cnpj) {
        return fornecedorRepository.findByCnpjContainingIgnoreCase(cnpj);
    }

    public List<Fornecedor> listarPorAtivo(Boolean ativo) {
        return fornecedorRepository.findByAtivo(ativo);
    }

    private void validacoes(Fornecedor fornecedor) {
        if (fornecedor.getNome() == null || fornecedor.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome fornecedor nao pode ser vazio.");
        } else if (fornecedor.getCnpj() == null || fornecedor.getCnpj().isBlank()) {
            throw new IllegalArgumentException("CNPJ fornecedor nao pode ser vazio.");
        } else if (fornecedor.getTelefone() == null || fornecedor.getTelefone().isBlank()) {
            throw new IllegalArgumentException("Telefone fornecedor nao pode ser vazio.");
        } else if (fornecedor.getEmail() == null || fornecedor.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email fornecedor nao pode ser vazio.");
        } else if (fornecedor.getEndereco() == null || fornecedor.getEndereco().isBlank()) {
            throw new IllegalArgumentException("Endereco fornecedor nao pode ser vazio.");
        }
    }

    public Fornecedor cadastrar(Fornecedor fornecedor) {
        validacoes(fornecedor);

        if (fornecedor.getAtivo() == null) {
            fornecedor.setAtivo(true);
        }

        return fornecedorRepository.save(fornecedor);
    }

    public Fornecedor atualizar(Long id, Fornecedor dadosAtualizados) {
        Fornecedor fornecedor = buscarPorId(id);

        fornecedor.setNome(dadosAtualizados.getNome());
        fornecedor.setCnpj(dadosAtualizados.getCnpj());
        fornecedor.setTelefone(dadosAtualizados.getTelefone());
        fornecedor.setEmail(dadosAtualizados.getEmail());
        fornecedor.setEndereco(dadosAtualizados.getEndereco());
        fornecedor.setAtivo(dadosAtualizados.getAtivo());

        validacoes(fornecedor);

        return fornecedorRepository.save(fornecedor);
    }

    public void deletar(Long id) {
        Fornecedor fornecedor = buscarPorId(id);

        fornecedorRepository.delete(fornecedor);
    }

}
