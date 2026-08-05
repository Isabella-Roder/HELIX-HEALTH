package com.helixhealth.medicamento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
    
    List<Medicamento> findByStatusMedicamento(StatusMedicamento statusMedicamento);

    List<Medicamento> findByNomeContainingIgnoreCase(String nome);

    List<Medicamento> findByFornecedorContainingIgnoreCase(String fornecedor);

}
