package com.helixhealth.exame;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExameRepository extends JpaRepository<Exame, Long> {
    
    List<Exame> findByPacienteId(Long pacienteId);

    List<Exame> findByProfissionalId(Long profissionalId);

}
