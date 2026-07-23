package com.helixhealth.exame;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class ExameService {
    
    private final ExameRepository exameRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public ExameService(ExameRepository exameRepository, PacienteRepository pacienteRepository, ProfissionalRepository profissionalRepository) {
        this.exameRepository = exameRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
    }

    public List<Exame> listar() {
        return exameRepository.findAll();
    }

    public Exame buscarPorId(Long id) {
        return exameRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("exame nao encontrado."));
    }

    public List<Exame> listarPorPaciente(Long pacienteId) {
        return exameRepository.findByPacienteId(pacienteId);
    }

    public List<Exame> listarPorProfissional(Long profissionalId) {
        return exameRepository.findByProfissionalId(profissionalId);
    }

    public void verificacoesCadastro(Exame exame) {
        if (exame.getTipoExame() == null || exame.getTipoExame().isBlank()) {
            throw new IllegalArgumentException("Tipo de exame nao pode ser vazio.");
        } else if (exame.getPaciente() == null || exame.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente nao pode ser vazio.");
        } else if (exame.getProfissional() == null || exame.getProfissional().getId() == null) {
            throw new IllegalArgumentException("Profissional nao pode ser vazio.");
        } else if (exame.getDataSolicitacao() == null) {
            throw new IllegalArgumentException("Data de solicitacao nao pode ser vazio.");
        } else if (exame.getStatusExame() == null) {
            throw new IllegalArgumentException("Status do exame nao pode ser vazio.");
        }
    }

    private void prepararRelacionamento(Exame exame) {
        Paciente paciente = pacienteRepository.findById(exame.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Paciente nao encontrado."));

        Profissional profissional = profissionalRepository.findById(exame.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao encontrado."));

        exame.setPaciente(paciente);
        exame.setProfissional(profissional);
    }

    public Exame cadastrar(Exame exame) {
        verificacoesCadastro(exame);
        prepararRelacionamento(exame);

        return exameRepository.save(exame);
    }

    public Exame atualizar(Long id, Exame dadosAtualizados) {
        Exame exame = buscarPorId(id);

        exame.setTipoExame(dadosAtualizados.getTipoExame());
        exame.setObservacao(dadosAtualizados.getObservacao());
        exame.setResultado(dadosAtualizados.getResultado());
        exame.setDataSolicitacao(dadosAtualizados.getDataSolicitacao());
        exame.setDataResultado(dadosAtualizados.getDataResultado());
        exame.setStatusExame(dadosAtualizados.getStatusExame());
        exame.setPaciente(dadosAtualizados.getPaciente());
        exame.setProfissional(dadosAtualizados.getProfissional());

        verificacoesCadastro(exame);
        prepararRelacionamento(exame);

        return exameRepository.save(exame);
    }

    public void deletar(Long id) {
        Exame exame = buscarPorId(id);

        exameRepository.delete(exame);
    }

}
