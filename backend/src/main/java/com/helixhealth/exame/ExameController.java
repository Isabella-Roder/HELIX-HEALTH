package com.helixhealth.exame;

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
public class ExameController {
    
    private final ExameService exameService;

    public ExameController(ExameService exameService) {
        this.exameService = exameService;
    }

    @GetMapping("/exames")
    public List<Exame> listar() {
        return exameService.listar();
    }

    @GetMapping("/exames/{id}")
    public Exame buscarPorId(@PathVariable Long id) {
        return exameService.buscarPorId(id);
    }

    @GetMapping("/exames/paciente/{pacienteId}")
    public List<Exame> listarPorPaciente(@PathVariable Long pacienteId) {
        return exameService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/exames/profissional/{profissionalId}")
    public List<Exame> listarPorProfissional(@PathVariable Long profissionalId) {
        return exameService.listarPorProfissional(profissionalId);
    }

    @PostMapping("/exames/cadastrar")
    public Exame cadastrar(@RequestBody Exame exame) {
        return exameService.cadastrar(exame);
    }

    @PutMapping("/exames/{id}")
    public Exame atualizar(@PathVariable Long id, @RequestBody Exame exame) {
        return exameService.atualizar(id, exame);
    }

    @DeleteMapping("/exames/{id}")
    public void deletar(@PathVariable Long id) {
        exameService.deletar(id);
    }

}
