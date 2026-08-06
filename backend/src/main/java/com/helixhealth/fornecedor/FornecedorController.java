package com.helixhealth.fornecedor;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fornecedores")
@CrossOrigin(origins = "*")
public class FornecedorController {
    
    private final FornecedorService fornecedorService;

    public FornecedorController(FornecedorService fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    @GetMapping
    public List<Fornecedor> listar() {
        return fornecedorService.listar();
    }

    @GetMapping("/{id}")
    public Fornecedor buscarPorId(@PathVariable Long id) {
        return fornecedorService.buscarPorId(id);
    }

    @GetMapping("/nome/{nome}")
    public List<Fornecedor> listarPorNome(@PathVariable String nome) {
        return fornecedorService.listarPorNome(nome);
    }

    @GetMapping("/cnpj/{cnpj}")
    public List<Fornecedor> listarPorCnpj(@PathVariable String cnpj) {
        return fornecedorService.listarPorCnpj(cnpj);
    }

    @GetMapping("/ativo/{ativo}")
    public List<Fornecedor> listarPorAtivo(@PathVariable Boolean ativo) {
        return fornecedorService.listarPorAtivo(ativo);
    }

    @PostMapping("/cadastrar")
    public Fornecedor cadastrar(@RequestBody Fornecedor fornecedor) {
        return fornecedorService.cadastrar(fornecedor);
    }

    @PutMapping("/{id}")
    public Fornecedor atualizar(@PathVariable Long id, @RequestBody Fornecedor fornecedor) {
        return fornecedorService.atualizar(id, fornecedor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        fornecedorService.deletar(id);
    }

}
