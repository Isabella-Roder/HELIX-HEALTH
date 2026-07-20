package com.helixhealth.profissional;

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
public class ProfissionalController {
    
    private final ProfissionalService profissionalService;

    public ProfissionalController(ProfissionalService profissionalService) {
        this.profissionalService = profissionalService;
    }

    @GetMapping("/profissionais")
    public List<Profissional> listar() {
        return profissionalService.listar();
    }

    @GetMapping("/profissionais/{id}")
    public Profissional buscarPorId(@PathVariable Long id) {
        return profissionalService.buscarPorId(id);
    }

    @PostMapping("/profissionais/cadastrar")
    public Profissional cadastrar(@RequestBody Profissional profissional) {
        return profissionalService.cadastrar(profissional);
    }

    @PutMapping("/profissionais/{id}")
    public Profissional atualizar(@PathVariable Long id, @RequestBody Profissional profissional) {
        return profissionalService.atualizar(id, profissional);
    }

    @DeleteMapping("/profissionais/{id}")
    public void deletar(@PathVariable Long id) {
        profissionalService.deletar(id);
    }

}
