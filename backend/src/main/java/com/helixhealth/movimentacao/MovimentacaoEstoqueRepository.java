package com.helixhealth.movimentacao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimentacaoEstoqueRepository extends JpaRepository<MovimentacaoEstoque, Long> {

    List<MovimentacaoEstoque> findByMaterialId(Long materialId);

    List<MovimentacaoEstoque> findByTipoMovimentacao(TipoMovimentacao tipoMovimentacao);

    List<MovimentacaoEstoque> findBySetorDestinoContainingIgnoreCase(String setorDestino);
    
    List<MovimentacaoEstoque> findByResponsavelId(Long responsavelId);

}
