package com.helixhealth.prescricao;

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
public class PrescricaoMedica {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicamento;
    private String dosagem;
    private String frequencia;
    private String duracao;
    private String orientacoes;
    private LocalDate dataPrescricao;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    public PrescricaoMedica() {

    }

    public PrescricaoMedica(
        String medicamento,
        String dosagem,
        String frequencia,
        String duracao,
        String orientacoes,
        LocalDate dataPrescricao,
        Paciente paciente,
        Profissional profissional
    ) {
        this.medicamento = medicamento;
        this.dosagem = dosagem;
        this.frequencia = frequencia;
        this.duracao = duracao;
        this.orientacoes = orientacoes;
        this.dataPrescricao = dataPrescricao;
        this.paciente = paciente;
        this.profissional = profissional;
    }

    public Long getId() {
        return id;
    }

    public String getMedicamento() {
        return medicamento;
    }

    public String getDosagem() {
        return dosagem;
    }

    public String getFrequencia() {
        return frequencia;
    }

    public String getDuracao() {
        return duracao;
    }

    public String getOrientacoes() {
        return orientacoes;
    }

    public LocalDate getDataPrescricao() {
        return dataPrescricao;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setMedicamento(String medicamento) {
        this.medicamento = medicamento;
    }

    public void setDosagem(String dosagem) {
        this.dosagem = dosagem;
    }

    public void setFrequencia(String frequencia) {
        this.frequencia = frequencia;
    }

    public void setDuracao(String duracao) {
        this.duracao = duracao;
    }

    public void setOrientacoes(String orientacoes) {
        this.orientacoes = orientacoes;
    }

    public void setDataPrescricao(LocalDate dataPrescricao) {
        this.dataPrescricao = dataPrescricao;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }
}
