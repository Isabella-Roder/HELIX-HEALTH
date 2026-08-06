package com.helixhealth.almoxarifado;

import java.util.List;

import com.helixhealth.fornecedor.Fornecedor;
import com.helixhealth.fornecedor.FornecedorRepository;

import org.springframework.stereotype.Service;

@Service
public class AlmoxarifadoService {
   
    private final AlmoxarifadoRepository almoxarifadoRepository;
    private final FornecedorRepository fornecedorRepository;

    public AlmoxarifadoService(
        AlmoxarifadoRepository almoxarifadoRepository,
        FornecedorRepository fornecedorRepository
    ) {
        this.almoxarifadoRepository = almoxarifadoRepository;
        this.fornecedorRepository = fornecedorRepository;
    }

    public List<Almoxarifado> listar() {
        return almoxarifadoRepository.findAll();
    }

    public Almoxarifado buscarPorId(Long id) {
        return almoxarifadoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Material nao encontrado."));
    }

    public List<Almoxarifado> listarPorNome(String nome) {
        return almoxarifadoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Almoxarifado> listarPorCategoria(String categoria) {
        return almoxarifadoRepository.findByCategoriaContainingIgnoreCase(categoria);
    }

    public List<Almoxarifado> listarPorFornecedor(String fornecedor) {
        return almoxarifadoRepository.findByFornecedorNomeContainingIgnoreCase(fornecedor);
    }

    public List<Almoxarifado> listarPorStatus(StatusAlmoxarifado statusAlmoxarifado) {
        return almoxarifadoRepository.findByStatusAlmoxarifado(statusAlmoxarifado);
    }

    private void validacoes(Almoxarifado almoxarifado) {
        if (almoxarifado.getNome() == null || almoxarifado.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do material nao pode ser vazio.");
        } else if (almoxarifado.getCategoria() == null || almoxarifado.getCategoria().isBlank()) {
            throw new IllegalArgumentException("Categoria do material nao pode ser vazio.");
        } else if (almoxarifado.getFornecedor() == null || almoxarifado.getFornecedor().getId() == null) {
            throw new IllegalArgumentException("Fornecedor do material nao pode ser vazio.");
        } else if (almoxarifado.getQuantidadeEstoque() == null || almoxarifado.getQuantidadeEstoque() <= 0) {
            throw new IllegalArgumentException("Quantidade de estoque do material tem que ser maior que zero.");
        }
    }

    private void carregarFornecedor(Almoxarifado almoxarifado) {
        Long fornecedorId = almoxarifado.getFornecedor().getId();

        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId)
            .orElseThrow(() -> new IllegalArgumentException("Fornecedor nao encontrado."));

        almoxarifado.setFornecedor(fornecedor);
    }

    public Almoxarifado cadastrar(Almoxarifado almoxarifado) {
        validacoes(almoxarifado);
        carregarFornecedor(almoxarifado);

        if (almoxarifado.getStatusAlmoxarifado() == null) {
            almoxarifado.setStatusAlmoxarifado(StatusAlmoxarifado.DISPONIVEL);
        }

        return almoxarifadoRepository.save(almoxarifado);
    }

    public Almoxarifado atualizar(Long id, Almoxarifado dadosAtualizados) {
        Almoxarifado almoxarifado = buscarPorId(id);

        almoxarifado.setNome(dadosAtualizados.getNome());
        almoxarifado.setCategoria(dadosAtualizados.getCategoria());
        almoxarifado.setQuantidadeEstoque(dadosAtualizados.getQuantidadeEstoque());
        almoxarifado.setEstoqueMinimo(dadosAtualizados.getEstoqueMinimo());
        almoxarifado.setUnidadeMedida(dadosAtualizados.getUnidadeMedida());
        almoxarifado.setDataValidade(dadosAtualizados.getDataValidade());
        almoxarifado.setFornecedor(dadosAtualizados.getFornecedor());
        almoxarifado.setStatusAlmoxarifado(dadosAtualizados.getStatusAlmoxarifado());

        validacoes(almoxarifado);
        carregarFornecedor(almoxarifado);

        return almoxarifadoRepository.save(almoxarifado);
    }

    public void deletar(Long id) {
        Almoxarifado almoxarifado = buscarPorId(id);

        almoxarifadoRepository.delete(almoxarifado);
    }

}
