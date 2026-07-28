package com.helixhealth.agendamento;

import java.time.LocalDate;
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

    @GetMapping("/agendamentos/status/{statusAgendamento}")
    public List<Agendamento> listarPorStatus(@PathVariable StatusAgendamento statusAgendamento) {
        return agendamentoService.listarPorStatus(statusAgendamento);
    }

    @GetMapping("/agendamentos/data/{dataConsulta}")
    public List<Agendamento> listarPorData(@PathVariable LocalDate dataConsulta) {
        return agendamentoService.listarPorData(dataConsulta);
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

    @PutMapping("/agendamentos/{id}/cancelar")
    public Agendamento cancelar(@PathVariable Long id) {
        return agendamentoService.cancelar(id);
    }

}
