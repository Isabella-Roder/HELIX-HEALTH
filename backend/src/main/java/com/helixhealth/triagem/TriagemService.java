package com.helixhealth.triagem;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class TriagemService {
    
    private final TriagemRepository triagemRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public TriagemService(
        TriagemRepository triagemRepository,
        PacienteRepository pacienteRepository,
        ProfissionalRepository profissionalRepository
    ) {
        this.triagemRepository = triagemRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
    }

    public List<Triagem> listar() {
        return triagemRepository.findAll();
    }

    public Triagem buscarPorId(Long id) {
        return triagemRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Triagem nao encontrada."));
    }

    public List<Triagem> listarPorPaciente(Long pacienteId) {
        return triagemRepository.findByPacienteId(pacienteId);
    }

    public List<Triagem> listarPorProfissional(Long profissionalId) {
        return triagemRepository.findByProfissionalId(profissionalId);
    }

    public List<Triagem> listarPorPrioridade(PrioridadeTriagem prioridadeTriagem) {
        return triagemRepository.findByPrioridadeTriagem(prioridadeTriagem);
    }

    public List<Triagem> listarPorStatus(StatusTriagem statusTriagem) {
        return triagemRepository.findByStatusTriagem(statusTriagem);
    }

    public void verificacoesCadastro(Triagem triagem) {
        if (triagem.getPaciente() == null || triagem.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente nao pode ser vazio.");
        } else if (triagem.getProfissional() == null || triagem.getProfissional().getId() == null) {
            throw new IllegalArgumentException("Profissional nao pode ser vazio.");
        } else if (triagem.getPressaoArterial() == null || triagem.getPressaoArterial().isBlank()) {
            throw new IllegalArgumentException("Pressao arterial nao pode ser vazio.");
        } else if (triagem.getFrequenciaCardiaca() == null) {
            throw new IllegalArgumentException("Frequencia cardiaca nao pode ser vazio.");
        } else if (triagem.getPrioridadeTriagem() == null) {
            throw new IllegalArgumentException("Prioridade da triagem nao pode ser vazio.");
        } else if (triagem.getStatusTriagem() == null) {
            throw new IllegalArgumentException("Status da triagem nao pode ser vazio.");
        }
    }

    private void prepararRelacionamento(Triagem triagem) {
        Paciente paciente = pacienteRepository.findById(triagem.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Paciente nao encontrado."));

        Profissional profissional = profissionalRepository.findById(triagem.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao encontrado."));

        triagem.setPaciente(paciente);
        triagem.setProfissional(profissional);

    }

    public Triagem cadastrar(Triagem triagem) {
        verificacoesCadastro(triagem);
        prepararRelacionamento(triagem);

        triagem.setDataHoraEntrada(LocalDateTime.now());

        return triagemRepository.save(triagem);
    }

    public Triagem atualizar(Long id, Triagem dadosAtualizados) {
        Triagem triagem = buscarPorId(id);

        triagem.setPaciente(dadosAtualizados.getPaciente());
        triagem.setProfissional(dadosAtualizados.getProfissional());
        triagem.setSintomas(dadosAtualizados.getSintomas());
        triagem.setPressaoArterial(dadosAtualizados.getPressaoArterial());
        triagem.setTemperatura(dadosAtualizados.getTemperatura());
        triagem.setFrequenciaCardiaca(dadosAtualizados.getFrequenciaCardiaca());
        triagem.setSaturacao(dadosAtualizados.getSaturacao());
        triagem.setPrioridadeTriagem(dadosAtualizados.getPrioridadeTriagem());
        triagem.setStatusTriagem(dadosAtualizados.getStatusTriagem());
        triagem.setObservacao(dadosAtualizados.getObservacao());

        verificacoesCadastro(triagem);
        prepararRelacionamento(triagem);

        return triagemRepository.save(triagem);
    }

    public void deletar(Long id) {
        Triagem triagem = buscarPorId(id);

        triagemRepository.delete(triagem);
    }

    public Triagem iniciarAtendimento(Long id) {
        Triagem triagem = buscarPorId(id);

        if (triagem.getStatusTriagem() != StatusTriagem.AGUARDANDO) {
            throw new IllegalArgumentException("A triagem precisa estar aguardando para iniciar o atendimento.");
        }

        triagem.setStatusTriagem(StatusTriagem.EM_ATENDIMENTO);
        return triagemRepository.save(triagem);
    }

    public Triagem finalizarAtendimento(Long id) {
        Triagem triagem = buscarPorId(id);

        if (triagem.getStatusTriagem() != StatusTriagem.EM_ATENDIMENTO) {
            throw new IllegalArgumentException("A triagem precisa estar em atendimento para finalizar.");
        }

        triagem.setStatusTriagem(StatusTriagem.FINALIZADA);
        return triagemRepository.save(triagem);
    }

}
