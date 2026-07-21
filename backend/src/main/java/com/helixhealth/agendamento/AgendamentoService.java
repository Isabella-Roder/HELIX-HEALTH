package com.helixhealth.agendamento;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class AgendamentoService {
    
    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public AgendamentoService(
        AgendamentoRepository agendamentoRepository,
        PacienteRepository pacienteRepository,
        ProfissionalRepository profissionalRepository
    ) {
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
    }

    public List<Agendamento> listar() {
        return agendamentoRepository.findAll();
    }

    public Agendamento buscarPorId(Long id) {
        return agendamentoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Agendamento nao encontrado."));
    }

    public List<Agendamento> listarPorPaciente(Long pacienteId) {
        return agendamentoRepository.findByPacienteId(pacienteId);
    }

    public List<Agendamento> listarPorProfissional(Long profissionalId) {
        return agendamentoRepository.findByProfissionalId(profissionalId);
    }

    public void verificacoesCadastro(Agendamento agendamento) {
        if (agendamento.getPaciente() == null || agendamento.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente nao pode ser vazio.");
        } else if (agendamento.getProfissional() == null || agendamento.getProfissional().getId() == null) {
            throw new IllegalArgumentException("Profissional nao pode ser vazio.");
        } else if (agendamento.getDataConsulta() == null) {
            throw new IllegalArgumentException("Data da consulta nao pode ser vazio.");
        } else if (agendamento.getHoraConsulta() == null) {
            throw new IllegalArgumentException("Hora da constulta nao pode ser vazio.");
        }
    }

    private void prepararRelacionamentos(Agendamento agendamento) {
        Paciente paciente = pacienteRepository.findById(agendamento.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Paciente nao encontrado."));

        Profissional profissional = profissionalRepository.findById(agendamento.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao contrado."));

        agendamento.setPaciente(paciente);
        agendamento.setProfissional(profissional);

        if (agendamento.getStatusAgendamento() == null) {
            agendamento.setStatusAgendamento(StatusAgendamento.AGENDADO);
        }
    }

    public Agendamento cadastrar(Agendamento agendamento) {
        verificacoesCadastro(agendamento);
        prepararRelacionamentos(agendamento);

        return agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizar(Long id, Agendamento dadosAtualizados) {
        Agendamento agendamento = buscarPorId(id);

        agendamento.setPaciente(dadosAtualizados.getPaciente());
        agendamento.setProfissional(dadosAtualizados.getProfissional());
        agendamento.setDataConsulta(dadosAtualizados.getDataConsulta());
        agendamento.setHoraConsulta(dadosAtualizados.getHoraConsulta());
        agendamento.setStatusAgendamento(dadosAtualizados.getStatusAgendamento());
        agendamento.setObservacao(dadosAtualizados.getObservacao());

        verificacoesCadastro(agendamento);
        prepararRelacionamentos(agendamento);

        return agendamentoRepository.save(agendamento);
    }

    public void deletar(Long id) {
        Agendamento agendamento = buscarPorId(id);

        agendamentoRepository.delete(agendamento);
    }

}
