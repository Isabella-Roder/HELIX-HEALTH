package com.helixhealth.internacao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InternacaoRepository extends JpaRepository<Internacao, Long> {
    
    List<Internacao> findByPacienteId(Long pacienteId);

    List<Internacao> findByProfissionalId(Long profissionalId);

    List<Internacao> findByLeitoId(Long leitoId);

    List<Internacao> findByStatusInternacao(StatusInternacao statusInternacao);

}
