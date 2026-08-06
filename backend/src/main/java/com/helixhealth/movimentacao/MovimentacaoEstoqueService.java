package com.helixhealth.movimentacao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.almoxarifado.Almoxarifado;
import com.helixhealth.almoxarifado.AlmoxarifadoRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class MovimentacaoEstoqueService {
    
    private final MovimentacaoEstoqueRepository movimentacaoEstoqueRepository;
    private final AlmoxarifadoRepository materialRepository;
    private final ProfissionalRepository responsavelRepository;

    public MovimentacaoEstoqueService(
        MovimentacaoEstoqueRepository movimentacaoEstoqueRepository,
        AlmoxarifadoRepository materialRepository,
        ProfissionalRepository responsavelRepository
    ) {
        this.movimentacaoEstoqueRepository = movimentacaoEstoqueRepository;
        this.materialRepository = materialRepository;
        this.responsavelRepository = responsavelRepository;
    }

    public List<MovimentacaoEstoque> listar() {
        return movimentacaoEstoqueRepository.findAll();
    }

    public MovimentacaoEstoque buscarPorId(Long id) {
        return movimentacaoEstoqueRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Movimentacao nao encontrado."));
    }

    public List<MovimentacaoEstoque> listarPorMaterial(Long materialId) {
        return movimentacaoEstoqueRepository.findByMaterialId(materialId);
    }

    public List<MovimentacaoEstoque> listarPorTipo(TipoMovimentacao tipoMovimentacao) {
        return movimentacaoEstoqueRepository.findByTipoMovimentacao(tipoMovimentacao);
    }

    public List<MovimentacaoEstoque> listarPorSetorDestino(String setorDestino) {
        return movimentacaoEstoqueRepository.findBySetorDestinoContainingIgnoreCase(setorDestino);
    }

    public List<MovimentacaoEstoque> listarPorResponsavel(Long responsavelId) {
        return movimentacaoEstoqueRepository.findByResponsavelId(responsavelId);
    }

    private void validacoes(MovimentacaoEstoque movimentacaoEstoque) {
        if (movimentacaoEstoque.getMaterial() == null || movimentacaoEstoque.getMaterial().getId() == null) {
            throw new IllegalArgumentException("Material nao pode ser vazio.");
        } else if (movimentacaoEstoque.getTipoMovimentacao() == null) {
            throw new IllegalArgumentException("Tipo movimentacao nao pode ser vazio.");
        } else if (movimentacaoEstoque.getQuantidade() == null || movimentacaoEstoque.getQuantidade() <= 0) {
            throw new IllegalArgumentException("Quantidade deve ser maior que zero.");
        } else if (movimentacaoEstoque.getResponsavel() == null || movimentacaoEstoque.getResponsavel().getId() == null) {
            throw new IllegalArgumentException("Responsavel nao pode ser vazio.");
        }
    }

    private void movimentacao(MovimentacaoEstoque estoque) {
        Almoxarifado material = materialRepository.findById(estoque.getMaterial().getId())
            .orElseThrow(() -> new IllegalArgumentException("Material nao encontrado."));

        Profissional responsavel = responsavelRepository.findById(estoque.getResponsavel().getId())
            .orElseThrow(() -> new IllegalArgumentException("Responsavel nao encontrado."));

        if (estoque.getDataMovimentacao() == null) {
            estoque.setDataMovimentacao(LocalDateTime.now());
        }

        if (estoque.getTipoMovimentacao() == TipoMovimentacao.ENTRADA) {
            material.setQuantidadeEstoque(material.getQuantidadeEstoque() + estoque.getQuantidade());
        } else if (estoque.getTipoMovimentacao() == TipoMovimentacao.SAIDA) {
            if (estoque.getSetorDestino() == null || estoque.getSetorDestino().isBlank()) {
                throw new IllegalArgumentException("Setor destino e obrigatorio para saida.");
            }

            if (material.getQuantidadeEstoque() < estoque.getQuantidade()) {
                throw new IllegalArgumentException("Estoque insuficiente para saida.");
            }

            material.setQuantidadeEstoque(material.getQuantidadeEstoque() - estoque.getQuantidade());
        }

        estoque.setMaterial(material);
        estoque.setResponsavel(responsavel);

        materialRepository.save(material);
    }

    public MovimentacaoEstoque cadastrar(MovimentacaoEstoque movimentacaoEstoque) {
        validacoes(movimentacaoEstoque);

        movimentacao(movimentacaoEstoque);

        return movimentacaoEstoqueRepository.save(movimentacaoEstoque);
    }

    public MovimentacaoEstoque atualizar(Long id, MovimentacaoEstoque dadosAtualizados) {
        MovimentacaoEstoque estoque = buscarPorId(id);
        Almoxarifado material = materialRepository.findById(dadosAtualizados.getMaterial().getId())
            .orElseThrow(() -> new IllegalArgumentException("Material nao encontrado."));

        Profissional responsavel = responsavelRepository.findById(dadosAtualizados.getResponsavel().getId())
            .orElseThrow(() -> new IllegalArgumentException("Responsavel nao encontrado."));

        estoque.setMaterial(material);
        estoque.setTipoMovimentacao(dadosAtualizados.getTipoMovimentacao());
        estoque.setQuantidade(dadosAtualizados.getQuantidade());
        estoque.setDataMovimentacao(dadosAtualizados.getDataMovimentacao());
        estoque.setSetorDestino(dadosAtualizados.getSetorDestino());
        estoque.setResponsavel(responsavel);
        estoque.setObservacao(dadosAtualizados.getObservacao());

        validacoes(estoque);

        return movimentacaoEstoqueRepository.save(estoque);
    }

    public void deletar(Long id) {
        MovimentacaoEstoque estoque = buscarPorId(id);

        movimentacaoEstoqueRepository.delete(estoque);
    }

}
