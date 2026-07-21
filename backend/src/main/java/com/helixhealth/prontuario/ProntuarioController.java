package com.helixhealth.prontuario;

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
public class ProntuarioController {
    
    private final ProntuarioService prontuarioService;

    public ProntuarioController(ProntuarioService prontuarioService) {
        this.prontuarioService = prontuarioService;
    }

    @GetMapping("/prontuarios")
    public List<Prontuario> listar() {
        return prontuarioService.listar();
    }

    @GetMapping("/prontuarios/{id}")
    public Prontuario buscarPorId(@PathVariable Long id) {
        return prontuarioService.buscarPorId(id);
    }

    @GetMapping("/prontuarios/paciente/{pacienteId}")
    public List<Prontuario> listarPorPaciente(@PathVariable Long pacienteId) {
        return prontuarioService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/prontuarios/profissional/{profissionalId}")
    public List<Prontuario> listarPorProfissional(@PathVariable Long profissionalId) {
        return prontuarioService.listarPorProfissional(profissionalId);
    }

    @PostMapping("/prontuarios/cadastrar")
    public Prontuario cadastrar(@RequestBody Prontuario prontuario) {
        return prontuarioService.cadastrar(prontuario);
    }

    @PutMapping("/prontuarios/{id}")
    public Prontuario atualizar(@PathVariable Long id, @RequestBody Prontuario prontuario) {
        return prontuarioService.atualizar(id, prontuario);
    }

    @DeleteMapping("/prontuarios/{id}")
    public void deletar(@PathVariable Long id) {
        prontuarioService.deletar(id);
    }

}
