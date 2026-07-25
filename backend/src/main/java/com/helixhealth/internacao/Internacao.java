package com.helixhealth.internacao;

import java.time.LocalDate;

import com.helixhealth.leito.Leito;
import com.helixhealth.paciente.Paciente;
import com.helixhealth.profissional.Profissional;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Internacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataEntrada;
    private LocalDate dataAlta;
    private String motivo;
    private String observacoes;

    @Enumerated(EnumType.STRING)
    private StatusInternacao statusInternacao;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @ManyToOne
    @JoinColumn(name = "leito_id")
    private Leito leito;

    public Internacao() {

    }

    public Internacao(
        LocalDate dataEntrada,
        LocalDate dataAlta,
        String motivo,
        String observacoes,
        StatusInternacao statusInternacao,
        Paciente paciente,
        Profissional profissional,
        Leito leito
    ) {
        this.dataEntrada = dataEntrada;
        this.dataAlta = dataAlta;
        this.motivo = motivo;
        this.observacoes = observacoes;
        this.statusInternacao = statusInternacao;
        this.paciente = paciente;
        this.profissional = profissional;
        this.leito = leito;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDataEntrada() {
        return dataEntrada;
    }

    public LocalDate getDataAlta() {
        return dataAlta;
    }

    public String getMotivo() {
        return motivo;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public StatusInternacao getStatusInternacao() {
        return statusInternacao;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public Leito getLeito() {
        return leito;
    }

    public void setDataEntrada(LocalDate dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public void setDataAlta(LocalDate dataAlta) {
        this.dataAlta = dataAlta;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public void setStatusInternacao(StatusInternacao statusInternacao) {
        this.statusInternacao = statusInternacao;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public void setLeito(Leito leito) {
        this.leito = leito;
    }

}
