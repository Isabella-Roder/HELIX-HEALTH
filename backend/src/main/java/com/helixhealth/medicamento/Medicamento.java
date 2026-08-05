package com.helixhealth.medicamento;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Medicamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String principioAtivo;
    private String dosagem;
    private String formaFarmaceutica;
    private Integer quantidadeEstoque;
    private Integer estoqueMinimo;
    private LocalDate dataValidade;
    private String fornecedor;

    @Enumerated(EnumType.STRING)
    private StatusMedicamento statusMedicamento;

    public Medicamento() {

    }

    public Medicamento(
        String nome,
        String principioAtivo,
        String dosagem,
        String formaFarmaceutica,
        Integer quantidadeEstoque,
        Integer estoqueMinimo,
        LocalDate dataValidade,
        String fornecedor,
        StatusMedicamento statusMedicamento
    ) {
        this.nome = nome;
        this.principioAtivo = principioAtivo;
        this.dosagem = dosagem;
        this.formaFarmaceutica = formaFarmaceutica;
        this.quantidadeEstoque = quantidadeEstoque;
        this.estoqueMinimo = estoqueMinimo;
        this.dataValidade = dataValidade;
        this.fornecedor = fornecedor;
        this.statusMedicamento = statusMedicamento;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getPrincipioAtivo() {
        return principioAtivo;
    }

    public String getDosagem() {
        return dosagem;
    }

    public String getFormaFarmaceutica() {
        return formaFarmaceutica;
    }

    public Integer getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public Integer getEstoqueMinimo() {
        return estoqueMinimo;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public String getFornecedor() {
        return fornecedor;
    }

    public StatusMedicamento getStatusMedicamento() {
        return statusMedicamento;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setPrincipioAtivo(String principioAtivo) {
        this.principioAtivo = principioAtivo;
    }

    public void setDosagem(String dosagem) {
        this.dosagem = dosagem;
    }

    public void setFormaFarmaceutica(String formaFarmaceutica) {
        this.formaFarmaceutica = formaFarmaceutica;
    }

    public void setQuantidadeEstoque(Integer quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public void setEstoqueMinimo(Integer estoqueMinimo) {
        this.estoqueMinimo = estoqueMinimo;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }

    public void setStatusMedicamento(StatusMedicamento statusMedicamento) {
        this.statusMedicamento = statusMedicamento;
    }

}
