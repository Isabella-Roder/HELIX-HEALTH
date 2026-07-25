package com.helixhealth.leito;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeitoRepository extends JpaRepository<Leito, Long> {
    
    List<Leito> findByStatusLeito(StatusLeito statusLeito);

    List<Leito> findBySetor(String setor);

}
