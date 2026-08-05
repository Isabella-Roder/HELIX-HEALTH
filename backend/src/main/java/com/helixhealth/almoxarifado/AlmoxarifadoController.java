package com.helixhealth.almoxarifado;

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
@RequestMapping("/materiais")
@CrossOrigin(origins = "*")
public class AlmoxarifadoController {
    
    private final AlmoxarifadoService almoxarifadoService;

    public AlmoxarifadoController(AlmoxarifadoService almoxarifadoService) {
        this.almoxarifadoService = almoxarifadoService;
    }

    @GetMapping
    public List<Almoxarifado> listar() {
        return almoxarifadoService.listar();
    }

    @GetMapping("/{id}")
    public Almoxarifado buscarPorId(@PathVariable Long id) {
        return almoxarifadoService.buscarPorId(id);
    }

    @GetMapping("/nome/{nome}")
    public List<Almoxarifado> listarPorNome(@PathVariable String nome) {
        return almoxarifadoService.listarPorNome(nome);
    }

    @GetMapping("/categoria/{categoria}")
    public List<Almoxarifado> listarPorCategoria(@PathVariable String categoria) {
        return almoxarifadoService.listarPorCategoria(categoria);
    }

    @GetMapping("/fornecedor/{fornecedor}")
    public List<Almoxarifado> listarPorFornecedor(@PathVariable String fornecedor) {
        return almoxarifadoService.listarPorFornecedor(fornecedor);
    }

    @GetMapping("/setor/{setorDestino}")
    public List<Almoxarifado> listarPorSetorDestino(@PathVariable String setorDestino) {
        return almoxarifadoService.listarPorSetorDestino(setorDestino);
    }

    @GetMapping("/status/{statusAlmoxarifado}")
    public List<Almoxarifado> listarPorStatus(@PathVariable StatusAlmoxarifado statusAlmoxarifado) {
        return almoxarifadoService.listarPorStatus(statusAlmoxarifado);
    }

    @PostMapping("/cadastrar")
    public Almoxarifado cadastrar(@RequestBody Almoxarifado almoxarifado) {
        return almoxarifadoService.cadastrar(almoxarifado);
    }

    @PutMapping("/{id}")
    public Almoxarifado atualizar(@PathVariable Long id, @RequestBody Almoxarifado almoxarifado) {
        return almoxarifadoService.atualizar(id, almoxarifado);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        almoxarifadoService.deletar(id);
    }
}
