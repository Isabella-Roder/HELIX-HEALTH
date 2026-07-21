package com.helixhealth.agendamento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    
    List<Agendamento> findByPacienteId(Long pacienteId);

    List<Agendamento> findByProfissionalId(Long profissionalId);

}
