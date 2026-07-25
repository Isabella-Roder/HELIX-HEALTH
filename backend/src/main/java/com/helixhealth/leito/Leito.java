package com.helixhealth.leito;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Leito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numero;
    private String setor;
    private String quarto;

    @Enumerated(EnumType.STRING)
    private StatusLeito statusLeito;

    public Leito() {

    }

    public Leito(String numero, String setor, String quarto, StatusLeito statusLeito) {
        this.numero = numero;
        this.setor = setor;
        this.quarto = quarto;
        this.statusLeito = statusLeito;
    }

    public Long getId() {
        return id;
    }

    public String getNumero() {
        return numero;
    }

    public String getSetor() {
        return setor;
    }

    public String getQuarto() {
        return quarto;
    }

    public StatusLeito getStatusLeito() {
        return statusLeito;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }

    public void setQuarto(String quarto) {
        this.quarto = quarto;
    }

    public void setStatusLeito(StatusLeito statusLeito) {
        this.statusLeito = statusLeito;
    }

}
