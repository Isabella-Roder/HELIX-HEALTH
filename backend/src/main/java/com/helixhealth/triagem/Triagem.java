package com.helixhealth.triagem;

import java.time.LocalDateTime;

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
public class Triagem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    private LocalDateTime dataHoraEntrada;
    private String sintomas;
    private String pressaoArterial;
    private Double temperatura;
    private Integer frequenciaCardiaca;
    private String saturacao;
    
    @Enumerated(EnumType.STRING)
    private PrioridadeTriagem prioridadeTriagem;

    @Enumerated(EnumType.STRING)
    private StatusTriagem statusTriagem;

    private String observacao;

    public Triagem() {

    }

    public Triagem(
        Paciente paciente,
        Profissional profissional,
        LocalDateTime dataHoraEntrada,
        String sintomas,
        String pressaoArterial,
        Double temperatura,
        Integer frequenciaCardiaca,
        String saturacao,
        PrioridadeTriagem prioridadeTriagem,
        StatusTriagem statusTriagem,
        String observacao
    ) {
        this.paciente = paciente;
        this.profissional = profissional;
        this.dataHoraEntrada = dataHoraEntrada;
        this.sintomas = sintomas;
        this.pressaoArterial = pressaoArterial;
        this.temperatura = temperatura;
        this.frequenciaCardiaca = frequenciaCardiaca;
        this.saturacao = saturacao;
        this.prioridadeTriagem = prioridadeTriagem;
        this.statusTriagem = statusTriagem;
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

    public LocalDateTime getDataHoraEntrada() {
        return dataHoraEntrada;
    }

    public String getSintomas() {
        return sintomas;
    }

    public String getPressaoArterial() {
        return pressaoArterial;
    }

    public Double getTemperatura() {
        return temperatura;
    }

    public Integer getFrequenciaCardiaca() {
        return frequenciaCardiaca;
    }

    public String getSaturacao() {
        return saturacao;
    }

    public PrioridadeTriagem getPrioridadeTriagem() {
        return prioridadeTriagem;
    }

    public StatusTriagem getStatusTriagem() {
        return statusTriagem;
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

    public void setDataHoraEntrada(LocalDateTime dataHoraEntrada) {
        this.dataHoraEntrada = dataHoraEntrada;
    }

    public void setSintomas(String sintomas) {
        this.sintomas = sintomas;
    }

    public void setPressaoArterial(String pressaoArterial) {
        this.pressaoArterial = pressaoArterial;
    }

    public void setTemperatura(Double temperatura) {
        this.temperatura = temperatura;
    }

    public void setFrequenciaCardiaca(Integer frequenciaCardiaca) {
        this.frequenciaCardiaca = frequenciaCardiaca;
    }

    public void setSaturacao(String saturacao) {
        this.saturacao = saturacao;
    }

    public void setPrioridadeTriagem(PrioridadeTriagem prioridadeTriagem) {
        this.prioridadeTriagem = prioridadeTriagem;
    }

    public void setStatusTriagem(StatusTriagem statusTriagem) {
        this.statusTriagem = statusTriagem;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

}
