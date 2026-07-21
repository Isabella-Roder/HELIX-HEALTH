package com.helixhealth.agendamento;

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
public class AgendamentoController {
    
    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping("/agendamentos")
    public List<Agendamento> listar() {
        return agendamentoService.listar();
    }

    @GetMapping("/agendamentos/{id}")
    public Agendamento buscarPorId(@PathVariable Long id) {
        return agendamentoService.buscarPorId(id);
    }

    @GetMapping("/agendamentos/paciente/{pacienteId}")
    public List<Agendamento> listarPorPaciente(@PathVariable Long pacienteId) {
        return agendamentoService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/agendamentos/profissional/{profissionalId}")
    public List<Agendamento> listarPorProfissional(@PathVariable Long profissionalId) {
        return agendamentoService.listarPorProfissional(profissionalId);
    }

    @PostMapping("/agendamentos/cadastrar")
    public Agendamento cadastrar(@RequestBody Agendamento agendamento) {
        return agendamentoService.cadastrar(agendamento);
    }

    @PutMapping("/agendamentos/{id}")
    public Agendamento atualizar(@PathVariable Long id, @RequestBody Agendamento agendamento) {
        return agendamentoService.atualizar(id, agendamento);
    }

    @DeleteMapping("/agendamentos/{id}")
    public void deletar(@PathVariable Long id) {
        agendamentoService.deletar(id);
    }

}
