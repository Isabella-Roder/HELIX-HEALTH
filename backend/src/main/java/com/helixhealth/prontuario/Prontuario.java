package com.helixhealth.prontuario;

import java.time.LocalDate;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.profissional.Profissional;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Prontuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    private LocalDate dataAtendimento;
    private String sintomas;
    private String diagnostico;
    private String prescricao;
    private String observacoes;

    public Prontuario() {

    }

    public Prontuario(
        Paciente paciente,
        Profissional profissional,
        LocalDate dataAtendimento,
        String sintomas,
        String diagnostico,
        String prescricao,
        String observacoes
    ) {
        this.paciente = paciente;
        this.profissional = profissional;
        this.dataAtendimento = dataAtendimento;
        this.sintomas = sintomas;
        this.diagnostico = diagnostico;
        this.prescricao = prescricao;
        this.observacoes = observacoes;
    }

    public Long getId() {
        return id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public LocalDate getDataAtendimento() {
        return dataAtendimento;
    }

    public String getSintomas() {
        return sintomas;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public String getPrescricao() {
        return prescricao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public void setDataAtendimento(LocalDate dataAtendimento) {
        this.dataAtendimento = dataAtendimento;
    }

    public void setSintomas(String sintomas) {
        this.sintomas = sintomas;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public void setPrescricao(String prescricao) {
        this.prescricao = prescricao;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
