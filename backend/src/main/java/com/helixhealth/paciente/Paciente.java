package com.helixhealth.paciente;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Paciente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String nomeSocial;
    private String cpf;
    private String telefone;
    private String endereco;
    private String convenio;
    private String contatoEmergencia;
    private LocalDate dataNascimento;
    
    @Enumerated(EnumType.STRING)
    private SexoPaciente sexo;

    @Enumerated(EnumType.STRING)
    private GeneroPaciente genero;

    public Paciente() {

    }

    public Paciente(String nome, String nomeSocial, String cpf, String telefone, String endereco, String convenio, String contatoEmergencia, LocalDate dataNascimento, SexoPaciente sexo, GeneroPaciente genero) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.convenio = convenio;
        this.contatoEmergencia = contatoEmergencia;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.genero = genero;
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

    public String getEndereco() {
        return endereco;
    }

    public String getConvenio() {
        return convenio;
    }

    public String getContatoEmergencia() {
        return contatoEmergencia;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public SexoPaciente getSexo() {
        return sexo;
    }

    public GeneroPaciente getGenero() {
        return genero;
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

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public void setConvenio(String convenio) {
        this.convenio = convenio;
    }

    public void setContatoEmergencia(String contatoEmergencia) {
        this.contatoEmergencia = contatoEmergencia;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public void setSexo(SexoPaciente sexo) {
        this.sexo = sexo;
    }

    public void setGenero(GeneroPaciente genero) {
        this.genero = genero;
    }

}
