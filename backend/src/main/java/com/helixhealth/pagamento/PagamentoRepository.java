package com.helixhealth.pagamento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;


public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    
    List<Pagamento> findByPacienteId(Long pacienteId);

    List<Pagamento> findByDataVencimento(LocalDate dataVencimento);

    List<Pagamento> findByDataPagamento(LocalDate dataPagamento);

    List<Pagamento> findByFormaPagamento(FormaPagamento formaPagamento);

    List<Pagamento> findByStatusPagamento(StatusPagamento statusPagamento);

}
