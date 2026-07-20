package com.helixhealth.paciente;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class PacienteService {
    
    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> listar() {
        return pacienteRepository.findAll();
    }

    public Paciente buscarPorId(Long id) {
        return pacienteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Paciente não encontrado."));
    }

    public void verificacoesCadastro(Paciente paciente) {
        if (paciente.getNome() ==  null || paciente.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome nao pode ser vazio.");
        } else if (paciente.getCpf() == null || paciente.getCpf().isBlank()) {
            throw new IllegalArgumentException("CPF nao pode ser vazio.");
        } else if (paciente.getTelefone() == null || paciente.getTelefone().isBlank()) {
            throw new IllegalArgumentException("Telefone nao pode ser vazio.");
        } else if (paciente.getEndereco() ==  null || paciente.getEndereco().isBlank()) {
            throw new IllegalArgumentException("Endereço nao pode ser vazio.");
        } else if (paciente.getDataNascimento() == null) {
            throw new IllegalArgumentException("Data de nascimento nao pode ser vazio.");
        } else if (paciente.getContatoEmergencia() == null || paciente.getContatoEmergencia().isBlank()) {
            throw new IllegalArgumentException("Contato de emergencia nao pode ser vazio.");
        }
    }

    public Paciente cadastrar(Paciente paciente) {
        verificacoesCadastro(paciente);

        return pacienteRepository.save(paciente);
    }

    public Paciente atualizar(Long id, Paciente atualizarDados) {
        Paciente paciente = buscarPorId(id);

        paciente.setNome(atualizarDados.getNome());
        paciente.setNomeSocial(atualizarDados.getNomeSocial());
        paciente.setCpf(paciente.getCpf());
        paciente.setTelefone(atualizarDados.getTelefone());
        paciente.setEndereco(atualizarDados.getEndereco());
        paciente.setConvenio(atualizarDados.getConvenio());
        paciente.setContatoEmergencia(atualizarDados.getContatoEmergencia());
        paciente.setDataNascimento(atualizarDados.getDataNascimento());

        verificacoesCadastro(paciente);

        return pacienteRepository.save(paciente);
    }


}
