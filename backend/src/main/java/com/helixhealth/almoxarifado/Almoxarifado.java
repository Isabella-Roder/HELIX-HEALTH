package com.helixhealth.almoxarifado;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Almoxarifado {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String categoria;
    private Integer quantidadeEstoque;
    private Integer estoqueMinimo;
    private String unidadeMedida;
    private LocalDate dataValidade;
    private String fornecedor;

    @Enumerated(EnumType.STRING)
    private StatusAlmoxarifado statusAlmoxarifado;

    public Almoxarifado() {

    }

    public Almoxarifado(
        String nome, 
        String categoria,
        Integer quantidadeEstoque,
        Integer estoqueMinimo,
        String unidadeMedida,
        LocalDate dataValidade,
        String fornecedor,
        StatusAlmoxarifado statusAlmoxarifado
    ) {
        this.nome = nome;
        this.categoria = categoria;
        this.quantidadeEstoque = quantidadeEstoque;
        this.estoqueMinimo = estoqueMinimo;
        this.unidadeMedida = unidadeMedida;
        this.dataValidade = dataValidade;
        this.fornecedor = fornecedor;
        this.statusAlmoxarifado = statusAlmoxarifado;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public Integer getEstoqueMinimo() {
        return estoqueMinimo;
    }

    public String getUnidadeMedida() {
        return unidadeMedida;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public String getFornecedor() {
        return fornecedor;
    }

    public StatusAlmoxarifado getStatusAlmoxarifado() {
        return statusAlmoxarifado;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public void setEstoqueMinimo(Integer estoqueMinimo) {
        this.estoqueMinimo = estoqueMinimo;
    }

    public void setUnidadeMedida(String unidadeMedida) {
        this.unidadeMedida = unidadeMedida;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }

    public void setStatusAlmoxarifado(StatusAlmoxarifado statusAlmoxarifado) {
        this.statusAlmoxarifado = statusAlmoxarifado;
    }

}
