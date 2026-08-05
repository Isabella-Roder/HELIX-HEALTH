package com.helixhealth.almoxarifado;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AlmoxarifadoRepository extends JpaRepository<Almoxarifado, Long> {
    
    List<Almoxarifado> findByStatusAlmoxarifado(StatusAlmoxarifado statusAlmoxarifado);

    List<Almoxarifado> findByNomeContainingIgnoreCase(String nome);

    List<Almoxarifado> findByCategoriaContainingIgnoreCase(String categoria);

    List<Almoxarifado> findByFornecedorContainingIgnoreCase(String fornecedor);

    List<Almoxarifado> findBySetorDestinoContainingIgnoreCase(String setorDestino);
}
