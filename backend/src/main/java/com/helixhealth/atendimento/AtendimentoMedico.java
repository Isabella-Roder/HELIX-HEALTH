package com.helixhealth.atendimento;

import java.time.LocalDateTime;

import com.helixhealth.agendamento.Agendamento;
import com.helixhealth.paciente.Paciente;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.triagem.Triagem;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AtendimentoMedico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @ManyToOne
    @JoinColumn(name = "triagem_id")
    private Triagem triagem;

    @ManyToOne
    @JoinColumn(name = "agendamento_id")
    private Agendamento agendamento;

    private LocalDateTime dataHoraInicio;
    private LocalDateTime dataHoraFim;
    private String queixaPrincipal;
    private String historiaDoencaAtual;
    private String diagnostico;
    private String conduta;
    private String observacoes;

    @Enumerated(EnumType.STRING)
    private StatusAtendimentoMedico statusAtendimentoMedico;

    public AtendimentoMedico() {

    }

    public AtendimentoMedico(
        Paciente paciente,
        Profissional profissional,
        Triagem triagem,
        Agendamento agendamento,
        LocalDateTime dataHoraInicio,
        LocalDateTime dataHoraFim,
        String queixaPrincipal,
        String historiaDoencaAtual,
        String diagnostico,
        String conduta,
        String observacoes,
        StatusAtendimentoMedico statusAtendimentoMedico
    ) {
        this.paciente = paciente;
        this.profissional = profissional;
        this.triagem = triagem;
        this.agendamento = agendamento;
        this.dataHoraInicio = dataHoraInicio;
        this.dataHoraFim = dataHoraFim;
        this.queixaPrincipal = queixaPrincipal;
        this.historiaDoencaAtual = historiaDoencaAtual;
        this.diagnostico = diagnostico;
        this.conduta = conduta;
        this.observacoes = observacoes;
        this.statusAtendimentoMedico = statusAtendimentoMedico;
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

    public Triagem getTriagem() {
        return triagem;
    }

    public Agendamento getAgendamento() {
        return agendamento;
    }

    public LocalDateTime getDataHoraInicio() {
        return dataHoraInicio;
    }

    public LocalDateTime getDataHoraFim() {
        return dataHoraFim;
    }

    public String getQueixaPrincipal() {
        return queixaPrincipal;
    }

    public String getHistoriaDoencaAtual() {
        return historiaDoencaAtual;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public String getConduta() {
        return conduta;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public StatusAtendimentoMedico getStatusAtendimentoMedico() {
        return statusAtendimentoMedico;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

    public void setTriagem(Triagem triagem) {
        this.triagem = triagem;
    }

    public void setAgendamento(Agendamento agendamento) {
        this.agendamento = agendamento;
    }

    public void setDataHoraInicio(LocalDateTime dataHoraInicio) {
        this.dataHoraInicio = dataHoraInicio;
    }

    public void setDataHoraFim(LocalDateTime dataHoraFim) {
        this.dataHoraFim = dataHoraFim;
    }

    public void setQueixaPrincipal(String queixaPrincipal) {
        this.queixaPrincipal = queixaPrincipal;
    }

    public void setHistoriaDoencaAtual(String historiaDoencaAtual) {
        this.historiaDoencaAtual = historiaDoencaAtual;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public void setConduta(String conduta) {
        this.conduta = conduta;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public void setStatusAtendimentoMedico(StatusAtendimentoMedico statusAtendimentoMedico) {
        this.statusAtendimentoMedico = statusAtendimentoMedico;
    }

}
