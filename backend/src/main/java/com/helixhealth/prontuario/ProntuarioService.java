package com.helixhealth.prontuario;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class ProntuarioService {
    
    private final ProntuarioRepository prontuarioRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public ProntuarioService(
        ProntuarioRepository prontuarioRepository,
        PacienteRepository pacienteRepository,
        ProfissionalRepository profissionalRepository
    ) {
        this.prontuarioRepository = prontuarioRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
    }

    public List<Prontuario> listar() {
        return prontuarioRepository.findAll();
    }

    public Prontuario buscarPorId(Long id) {
        return prontuarioRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Prontuario nao encontrado."));
    }

    public List<Prontuario> listarPorPaciente(Long pacienteId) {
        return prontuarioRepository.findByPacienteId(pacienteId);
    }

    public List<Prontuario> listarPorProfissional(Long profissionalId) {
        return prontuarioRepository.findByProfissionalId(profissionalId);
    }

    public void verificacoesCadastro(Prontuario prontuario) {
        if (prontuario.getPaciente() == null || prontuario.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente nao pode ser vazio.");
        } else if (prontuario.getProfissional() == null || prontuario.getProfissional().getId() == null) {
            throw new IllegalArgumentException("Profissional nao pode ser vazio.");
        } else if (prontuario.getDataAtendimento() == null) {
            throw new IllegalArgumentException("Data do atendimento nao pode ser vazio.");
        } else if (prontuario.getSintomas() == null || prontuario.getSintomas().isBlank()) {
            throw new IllegalArgumentException("Sintomas nao pode ser vazio.");
        }
    }

    private void prepararRelacionamento(Prontuario prontuario) {
        Paciente paciente = pacienteRepository.findById(prontuario.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Paciente nao encontrado."));

        Profissional profissional = profissionalRepository.findById(prontuario.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao encontrado."));

        prontuario.setPaciente(paciente);
        prontuario.setProfissional(profissional);
    }

    public Prontuario cadastrar(Prontuario prontuario) {
        verificacoesCadastro(prontuario);
        prepararRelacionamento(prontuario);

        return prontuarioRepository.save(prontuario);
    }

    public Prontuario atualizar(Long id, Prontuario dadosAtualizados) {
        Prontuario prontuario = buscarPorId(id);

        prontuario.setPaciente(dadosAtualizados.getPaciente());
        prontuario.setProfissional(dadosAtualizados.getProfissional());
        prontuario.setDataAtendimento(dadosAtualizados.getDataAtendimento());
        prontuario.setSintomas(dadosAtualizados.getSintomas());
        prontuario.setDiagnostico(dadosAtualizados.getDiagnostico());
        prontuario.setPrescricao(dadosAtualizados.getPrescricao());
        prontuario.setObservacoes(dadosAtualizados.getObservacoes());

        verificacoesCadastro(prontuario);
        prepararRelacionamento(prontuario);

        return prontuarioRepository.save(prontuario);
    }

    public void deletar(Long id) {
        Prontuario prontuario = buscarPorId(id);

        prontuarioRepository.delete(prontuario);
    }


}
