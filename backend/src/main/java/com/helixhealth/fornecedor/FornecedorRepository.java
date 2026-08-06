package com.helixhealth.fornecedor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

    List<Fornecedor> findByNomeContainingIgnoreCase(String nome);

    List<Fornecedor> findByCnpjContainingIgnoreCase(String cnpj);

    List<Fornecedor> findByAtivo(Boolean ativo);

}
