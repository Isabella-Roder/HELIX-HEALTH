package com.helixhealth.leito;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class LeitoController {
    
    private final LeitoService leitoService;

    public LeitoController(LeitoService leitoService) {
        this.leitoService = leitoService;
    }

    @GetMapping("/leitos")
    public List<Leito> listar() {
        return leitoService.listar();
    }

    @GetMapping("/leitos/{id}")
    public Leito buscarPorId(@PathVariable Long id) {
        return leitoService.buscarPorId(id);
    }

    @GetMapping("/leitos/status/{statusLeito}")
    public List<Leito> listarPorStatus(@PathVariable StatusLeito statusLeito) {
        return leitoService.listarPorStatus(statusLeito);
    }

    @GetMapping("/leitos/setor/{setor}")
    public List<Leito> listarPorSetor(@PathVariable String setor) {
        return leitoService.listarPorSetor(setor);
    }

    @PostMapping("/leitos/cadastrar")
    public Leito cadastrar(@RequestBody Leito leito) {
        return leitoService.cadastrar(leito);
    }

    @PutMapping("/leitos/{id}")
    public Leito atualizar(@PathVariable Long id, @RequestBody Leito leito) {
        return leitoService.atualizar(id, leito);
    }

    @DeleteMapping("/leitos/{id}")
    public void deletar(@PathVariable Long id) {
        leitoService.deletar(id);
    }

}
