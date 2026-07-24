package com.helixhealth.prescricao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescricaoMedicaRepository extends JpaRepository<PrescricaoMedica, Long> {
    
    List<PrescricaoMedica> findByPacienteId(Long pacienteId);

    List<PrescricaoMedica> findByProfissionalId(Long profissionalId);

}
