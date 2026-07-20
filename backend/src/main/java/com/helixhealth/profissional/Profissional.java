package com.helixhealth.profissional;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Profissional {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String nomeSocial;
    private String cpf;
    private String telefone;
    private String email;

    @Enumerated(EnumType.STRING)
    private TipoProfissional tipoProfissional;

    @Enumerated(EnumType.STRING)
    private EspecialidadeProfissional especialidadeProfissional;
    
    private String registroProfissional;
    private Boolean ativo;

    public Profissional() {

    }

    public Profissional(
        String nome,
        String nomeSocial,
        String cpf,
        String telefone,
        String email,
        TipoProfissional tipoProfissional,
        EspecialidadeProfissional especialidadeProfissional,
        String registroProfissional,
        Boolean ativo
    ) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.tipoProfissional = tipoProfissional;
        this.especialidadeProfissional = especialidadeProfissional;
        this.registroProfissional = registroProfissional;
        this.ativo = ativo;
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

    public String getCpf() {
        return cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getEmail() {
        return email;
    }

    public TipoProfissional getTipoProfissional() {
        return tipoProfissional;
    }

    public EspecialidadeProfissional getEspecialidadeProfissional() {
        return especialidadeProfissional;
    }

    public String getRegistroProfissional() {
        return registroProfissional;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    } 

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTipoProfissional(TipoProfissional tipoProfissional) {
        this.tipoProfissional = tipoProfissional;
    }

    public void setEspecialidadeProfissional(EspecialidadeProfissional especialidadeProfissional) {
        this.especialidadeProfissional = especialidadeProfissional;
    }

    public void setRegistroProfissional(String registroProfissional) {
        this.registroProfissional = registroProfissional;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }


}
