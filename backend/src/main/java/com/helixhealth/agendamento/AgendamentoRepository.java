package com.helixhealth.agendamento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.time.LocalTime;


public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    
    List<Agendamento> findByPacienteId(Long pacienteId);

    List<Agendamento> findByProfissionalId(Long profissionalId);

    List<Agendamento> findByStatusAgendamento(StatusAgendamento statusAgendamento);
    
    List<Agendamento> findByDataConsulta(LocalDate dataConsulta);

    List<Agendamento> findByProfissionalIdAndDataConsultaAndHoraConsulta(
        Long profissionalId,
        LocalDate dataConsulta,
        LocalTime horaConsulta
    );

}
