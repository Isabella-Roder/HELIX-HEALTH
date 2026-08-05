package com.helixhealth.almoxarifado;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class AlmoxarifadoService {
   
    private final AlmoxarifadoRepository almoxarifadoRepository;

    public AlmoxarifadoService(AlmoxarifadoRepository almoxarifadoRepository) {
        this.almoxarifadoRepository = almoxarifadoRepository;
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
        return almoxarifadoRepository.findByFornecedorContainingIgnoreCase(fornecedor);
    }

    public List<Almoxarifado> listarPorSetorDestino(String setorDestino) {
        return almoxarifadoRepository.findBySetorDestinoContainingIgnoreCase(setorDestino);
    }

    public List<Almoxarifado> listarPorStatus(StatusAlmoxarifado statusAlmoxarifado) {
        return almoxarifadoRepository.findByStatusAlmoxarifado(statusAlmoxarifado);
    }

    private void validacoes(Almoxarifado almoxarifado) {
        if (almoxarifado.getNome() == null || almoxarifado.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do material nao pode ser vazio.");
        } else if (almoxarifado.getCategoria() == null || almoxarifado.getCategoria().isBlank()) {
            throw new IllegalArgumentException("Categoria do material nao pode ser vazio.");
        } else if (almoxarifado.getFornecedor() == null || almoxarifado.getFornecedor().isBlank()) {
            throw new IllegalArgumentException("Fornecedor do material nao pode ser vazio.");
        } else if (almoxarifado.getQuantidadeEstoque() == null || almoxarifado.getQuantidadeEstoque() <= 0) {
            throw new IllegalArgumentException("Quantidade de estoque do material tem que ser maior que zero.");
        }
    }

    public Almoxarifado cadastrar(Almoxarifado almoxarifado) {
        validacoes(almoxarifado);

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
        almoxarifado.setSetorDestino(dadosAtualizados.getSetorDestino());
        almoxarifado.setStatusAlmoxarifado(dadosAtualizados.getStatusAlmoxarifado());

        validacoes(almoxarifado);

        return almoxarifadoRepository.save(almoxarifado);
    }

    public void deletar(Long id) {
        Almoxarifado almoxarifado = buscarPorId(id);

        almoxarifadoRepository.delete(almoxarifado);
    }

}
