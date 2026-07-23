package com.helixhealth.exame;

import java.time.LocalDate;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.profissional.Profissional;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Exame {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoExame;
    private String observacao;
    private String resultado;
    private LocalDate dataSolicitacao;
    private LocalDate dataResultado;

    @Enumerated(EnumType.STRING)
    private StatusExame statusExame;

    @ManyToOne
    private Paciente paciente;

    @ManyToOne
    private Profissional profissional;

    public Exame() {

    }

    public Exame(
        String tipoExame,
        String observacao,
        String resultado,
        LocalDate dataSolicitacao,
        LocalDate dataResultado,
        StatusExame statusExame,
        Paciente paciente,
        Profissional profissional
    ) {
        this.tipoExame = tipoExame;
        this.observacao = observacao;
        this.resultado = resultado;
        this.dataSolicitacao = dataSolicitacao;
        this.dataResultado = dataResultado;
        this.statusExame = statusExame;
        this.paciente = paciente;
        this.profissional = profissional;
    }

    public Long getId() {
        return id;
    }

    public String getTipoExame() {
        return tipoExame;
    }

    public String getObservacao() {
        return observacao;
    }

    public String getResultado() {
        return resultado;
    }

    public LocalDate getDataSolicitacao() {
        return dataSolicitacao;
    }

    public LocalDate getDataResultado() {
        return dataResultado;
    }

    public StatusExame getStatusExame() {
        return statusExame;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setTipoExame(String tipoExame) {
        this.tipoExame = tipoExame;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    public void setDataSolicitacao(LocalDate dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public void setDataResultado(LocalDate dataResultado) {
        this.dataResultado = dataResultado;
    }

    public void setStatusExame(StatusExame statusExame) {
        this.statusExame = statusExame;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

}
