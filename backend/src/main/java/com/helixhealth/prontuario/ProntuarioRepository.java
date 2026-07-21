package com.helixhealth.prontuario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {
    
    List<Prontuario> findByPacienteId(Long pacienteId);

    List<Prontuario> findByProfissionalId(Long profissionalId);

}
