package com.helixhealth.triagem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TriagemRepository extends JpaRepository<Triagem, Long> {
    
    List<Triagem> findByPacienteId(Long pacienteId);

    List<Triagem> findByProfissionalId(Long profissionalId);

    List<Triagem> findByPrioridadeTriagem(PrioridadeTriagem prioridadeTriagem);

    List<Triagem> findByStatusTriagem(StatusTriagem statusTriagem);

}
