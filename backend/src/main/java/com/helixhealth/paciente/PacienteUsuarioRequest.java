package com.helixhealth.paciente;

import java.time.LocalDate;

public class PacienteUsuarioRequest {
    
    private String nome;
    private String nomeSocial;
    private String cpf;
    private String telefone;
    private String endereco;
    private String convenio;
    private String contatoEmergencia;
    private LocalDate dataNascimento;
    private SexoPaciente sexo;
    private GeneroPaciente genero;

    private String email;
    private String senha;

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

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

}
