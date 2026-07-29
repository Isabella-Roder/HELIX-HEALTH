package com.helixhealth.atendimento;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.agendamento.Agendamento;
import com.helixhealth.agendamento.AgendamentoRepository;
import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;
import com.helixhealth.prontuario.Prontuario;
import com.helixhealth.prontuario.ProntuarioRepository;
import com.helixhealth.triagem.Triagem;
import com.helixhealth.triagem.TriagemRepository;

@Service
public class AtendimentoMedicoService {
    
    private final AtendimentoMedicoRepository atendimentoMedicoRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;
    private final TriagemRepository triagemRepository;
    private final AgendamentoRepository agendamentoRepository;
    private final ProntuarioRepository prontuarioRepository;

    public AtendimentoMedicoService(
        AtendimentoMedicoRepository atendimentoMedicoRepository,
        PacienteRepository pacienteRepository,
        ProfissionalRepository profissionalRepository,
        TriagemRepository triagemRepository,
        AgendamentoRepository agendamentoRepository,
        ProntuarioRepository prontuarioRepository
    ) {
        this.atendimentoMedicoRepository = atendimentoMedicoRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
        this.triagemRepository = triagemRepository;
        this.agendamentoRepository = agendamentoRepository;
        this.prontuarioRepository = prontuarioRepository;
    }

    public List<AtendimentoMedico> listar() {
        return atendimentoMedicoRepository.findAll();
    }

    public AtendimentoMedico buscarPorId(Long id) {
        return atendimentoMedicoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Atendimento medico nao encontrado."));
    }

    public List<AtendimentoMedico> listarPorPaciente(Long pacienteId) {
        return atendimentoMedicoRepository.findByPacienteId(pacienteId);
    }

    public List<AtendimentoMedico> listarPorProfissional(Long profissionalId) {
        return atendimentoMedicoRepository.findByProfissionalId(profissionalId);
    }

    public List<AtendimentoMedico> listarPorTriagem(Long triagemId) {
        return atendimentoMedicoRepository.findByTriagemId(triagemId);
    }

    public List<AtendimentoMedico> listarPorAgendamento(Long agendamentoId) {
        return atendimentoMedicoRepository.findByAgendamentoId(agendamentoId);
    }

    public List<AtendimentoMedico> listarPorStatus(StatusAtendimentoMedico statusAtendimentoMedico) {
        return atendimentoMedicoRepository.findByStatusAtendimentoMedico(statusAtendimentoMedico);
    }

    public void verificacoesCadastro(AtendimentoMedico atendimentoMedico) {
        if (atendimentoMedico.getPaciente() == null || atendimentoMedico.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente nao pode ser vazio.");
        } else if (atendimentoMedico.getProfissional() == null || atendimentoMedico.getProfissional().getId() == null) {
            throw new IllegalArgumentException("Profissional nao pode ser vazio.");
        } else if (atendimentoMedico.getQueixaPrincipal() == null || atendimentoMedico.getQueixaPrincipal().isBlank()) {
            throw new IllegalArgumentException("Queixa principal nao pode ser vazia.");
        } else if (atendimentoMedico.getStatusAtendimentoMedico() == null) {
            throw new IllegalArgumentException("Status do atendimento nao pode ser vazio.");
        }
    }

    private void prepararRelacionamentos(AtendimentoMedico atendimentoMedico) {
        Paciente paciente = pacienteRepository.findById(atendimentoMedico.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Paciente nao encontrado."));

        Profissional profissional = profissionalRepository.findById(atendimentoMedico.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao encontrado."));

        atendimentoMedico.setPaciente(paciente);
        atendimentoMedico.setProfissional(profissional);

        if (atendimentoMedico.getTriagem() != null && atendimentoMedico.getTriagem().getId() != null) {
            Triagem triagem = triagemRepository.findById(atendimentoMedico.getTriagem().getId())
                .orElseThrow(() -> new IllegalArgumentException("Triagem nao encontrada."));

            atendimentoMedico.setTriagem(triagem);
        } else {
            atendimentoMedico.setTriagem(null);
        }

        if (atendimentoMedico.getAgendamento() != null && atendimentoMedico.getAgendamento().getId() != null) {
            Agendamento agendamento = agendamentoRepository.findById(atendimentoMedico.getAgendamento().getId())
                .orElseThrow(() -> new IllegalArgumentException("Agendamento nao encontrado."));

            atendimentoMedico.setAgendamento(agendamento);
        } else {
            atendimentoMedico.setAgendamento(null);
        }
    }

    private void gerarProntuario(AtendimentoMedico atendimentoMedico) {
        Prontuario prontuario = new Prontuario();

        prontuario.setPaciente(atendimentoMedico.getPaciente());
        prontuario.setProfissional(atendimentoMedico.getProfissional());
        prontuario.setDataAtendimento(atendimentoMedico.getDataHoraFim().toLocalDate());
        prontuario.setSintomas(atendimentoMedico.getQueixaPrincipal());
        prontuario.setDiagnostico(atendimentoMedico.getDiagnostico());
        prontuario.setPrescricao(atendimentoMedico.getConduta());
        prontuario.setObservacoes(atendimentoMedico.getObservacoes());

        prontuarioRepository.save(prontuario);
    }

    public AtendimentoMedico cadastrar(AtendimentoMedico atendimentoMedico) {

        if (atendimentoMedico.getStatusAtendimentoMedico() == null) {
            atendimentoMedico.setStatusAtendimentoMedico(StatusAtendimentoMedico.EM_ANDAMENTO);
        }

        if (atendimentoMedico.getDataHoraInicio() == null) {
            atendimentoMedico.setDataHoraInicio(LocalDateTime.now());
        }

        verificacoesCadastro(atendimentoMedico);
        prepararRelacionamentos(atendimentoMedico);

        return atendimentoMedicoRepository.save(atendimentoMedico);
    }

    public AtendimentoMedico atualizar(Long id, AtendimentoMedico dadosAtualizados) {
        AtendimentoMedico atendimentoMedico = buscarPorId(id);

        atendimentoMedico.setPaciente(dadosAtualizados.getPaciente());
        atendimentoMedico.setProfissional(dadosAtualizados.getProfissional());
        atendimentoMedico.setTriagem(dadosAtualizados.getTriagem());
        atendimentoMedico.setAgendamento(dadosAtualizados.getAgendamento());
        atendimentoMedico.setDataHoraInicio(dadosAtualizados.getDataHoraInicio());
        atendimentoMedico.setDataHoraFim(dadosAtualizados.getDataHoraFim());
        atendimentoMedico.setQueixaPrincipal(dadosAtualizados.getQueixaPrincipal());
        atendimentoMedico.setHistoriaDoencaAtual(dadosAtualizados.getHistoriaDoencaAtual());
        atendimentoMedico.setDiagnostico(dadosAtualizados.getDiagnostico());
        atendimentoMedico.setConduta(dadosAtualizados.getConduta());
        atendimentoMedico.setObservacoes(dadosAtualizados.getObservacoes());
        atendimentoMedico.setStatusAtendimentoMedico(dadosAtualizados.getStatusAtendimentoMedico());

        verificacoesCadastro(atendimentoMedico);
        prepararRelacionamentos(atendimentoMedico);

        return atendimentoMedicoRepository.save(atendimentoMedico);
    }

    public AtendimentoMedico finalizar(Long id) {
        AtendimentoMedico atendimentoMedico = buscarPorId(id);

        if (atendimentoMedico.getStatusAtendimentoMedico() != StatusAtendimentoMedico.EM_ANDAMENTO) {
            throw new IllegalArgumentException("O atendimento precisa estar em andamento para finalizar.");
        }

        atendimentoMedico.setStatusAtendimentoMedico(StatusAtendimentoMedico.FINALIZADO);
        atendimentoMedico.setDataHoraFim(LocalDateTime.now());

        AtendimentoMedico atendimentoFinalizado = atendimentoMedicoRepository.save(atendimentoMedico);

        gerarProntuario(atendimentoFinalizado);

        return atendimentoFinalizado;
    }

    public AtendimentoMedico cancelar(Long id) {
        AtendimentoMedico atendimentoMedico = buscarPorId(id);

        if (atendimentoMedico.getStatusAtendimentoMedico() == StatusAtendimentoMedico.FINALIZADO) {
            throw new IllegalArgumentException("Atendimento finalizado nao pode ser cancelado.");
        }

        atendimentoMedico.setStatusAtendimentoMedico(StatusAtendimentoMedico.CANCELADO);
        atendimentoMedico.setDataHoraFim(LocalDateTime.now());

        return atendimentoMedicoRepository.save(atendimentoMedico);
    }

    public void deletar(Long id) {
        AtendimentoMedico atendimentoMedico = buscarPorId(id);

        atendimentoMedicoRepository.delete(atendimentoMedico);
    }
}
