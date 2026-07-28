package com.helixhealth.atendimento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AtendimentoMedicoRepository extends JpaRepository<AtendimentoMedico, Long> {
    
    List<AtendimentoMedico> findByPacienteId(Long pacienteId);

    List<AtendimentoMedico> findByProfissionalId(Long profissionalId);

    List<AtendimentoMedico> findByTriagemId(Long triagemId);

    List<AtendimentoMedico> findByAgendamentoId(Long agendamentoId);

    List<AtendimentoMedico> findByStatusAtendimentoMedico(StatusAtendimentoMedico statusAtendimentoMedico);
}
