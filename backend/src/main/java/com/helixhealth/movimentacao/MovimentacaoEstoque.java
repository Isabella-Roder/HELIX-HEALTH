package com.helixhealth.movimentacao;

import java.time.LocalDateTime;

import com.helixhealth.almoxarifado.Almoxarifado;
import com.helixhealth.profissional.Profissional;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class MovimentacaoEstoque {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Almoxarifado material;

    @Enumerated(EnumType.STRING)
    private TipoMovimentacao tipoMovimentacao;

    private Integer quantidade;
    private LocalDateTime dataMovimentacao;
    private String setorDestino;

    @ManyToOne
    private Profissional responsavel;

    private String observacao;

    public MovimentacaoEstoque() {

    }

    public MovimentacaoEstoque(
        Almoxarifado material,
        TipoMovimentacao tipoMovimentacao,
        Integer quantidade,
        LocalDateTime dataMovimentacao,
        String setorDestino,
        Profissional responsavel,
        String observacao
    ) {
        this.material = material;
        this.tipoMovimentacao = tipoMovimentacao;
        this.quantidade = quantidade;
        this.dataMovimentacao = dataMovimentacao;
        this.setorDestino = setorDestino;
        this.responsavel = responsavel;
        this.observacao = observacao;
    }

    public Long getId() {
        return id;
    }

    public Almoxarifado getMaterial() {
        return material;
    }

    public TipoMovimentacao getTipoMovimentacao() {
        return tipoMovimentacao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public LocalDateTime getDataMovimentacao() {
        return dataMovimentacao;
    }

    public String getSetorDestino() {
        return setorDestino;
    }

    public Profissional getResponsavel() {
        return responsavel;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setMaterial(Almoxarifado material) {
        this.material = material;
    }

    public void setTipoMovimentacao(TipoMovimentacao tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public void setDataMovimentacao(LocalDateTime dataMovimentacao) {
        this.dataMovimentacao = dataMovimentacao;
    }

    public void setSetorDestino(String setorDestino) {
        this.setorDestino = setorDestino;
    }

    public void setResponsavel(Profissional responsavel) {
        this.responsavel = responsavel;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

}
