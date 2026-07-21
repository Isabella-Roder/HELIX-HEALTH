package com.helixhealth.agendamento;

import java.time.LocalDate;
import java.time.LocalTime;

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
public class Agendamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    private LocalDate dataConsulta;
    private LocalTime horaConsulta;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento statusAgendamento;

    private String observacao;

    public Agendamento() {

    }

    public Agendamento(
        Paciente paciente,
        Profissional profissional,
        LocalDate dataConsulta,
        LocalTime horaConsulta,
        StatusAgendamento statusAgendamento,
        String observacao
    ) {
        this.paciente = paciente;
        this.profissional = profissional;
        this.dataConsulta = dataConsulta;
        this.horaConsulta = horaConsulta;
        this.statusAgendamento = statusAgendamento;
        this.observacao = observacao;
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

    public LocalDate getDataConsulta() {
        return dataConsulta;
    }

    public LocalTime getHoraConsulta() {
        return horaConsulta;
    }

    public StatusAgendamento getStatusAgendamento() {
        return statusAgendamento;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public void setDataConsulta(LocalDate dataConsulta) {
        this.dataConsulta = dataConsulta;
    }

    public void setHoraConsulta(LocalTime horaConsulta) {
        this.horaConsulta = horaConsulta;
    }

    public void setStatusAgendamento(StatusAgendamento statusAgendamento) {
        this.statusAgendamento = statusAgendamento;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

}
