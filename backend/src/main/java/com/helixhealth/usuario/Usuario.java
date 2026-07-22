package com.helixhealth.usuario;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.profissional.Profissional;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String nomeSocial;
    private String email;
    private String senha;

    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    private Boolean ativo;

    @OneToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @OneToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    public Usuario() {

    }

    public Usuario(String nome, String nomeSocial, String email, String senha, TipoUsuario tipoUsuario, Boolean ativo, Paciente paciente, Profissional profissional) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.email = email;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
        this.ativo = ativo;
        this.paciente = paciente;
        this.profissional = profissional;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
    
    public String getNomeSocial() {
        return nomeSocial;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }

}
