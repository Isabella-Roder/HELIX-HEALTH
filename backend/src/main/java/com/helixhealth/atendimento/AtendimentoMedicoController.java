package com.helixhealth.atendimento;

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
@RequestMapping("/atendimentos-medicos")
@CrossOrigin("*")
public class AtendimentoMedicoController {
    
    private final AtendimentoMedicoService atendimentoMedicoService;

    public AtendimentoMedicoController(AtendimentoMedicoService atendimentoMedicoService) {
        this.atendimentoMedicoService = atendimentoMedicoService;
    }

    @GetMapping
    public List<AtendimentoMedico> listar() {
        return atendimentoMedicoService.listar();
    }

    @GetMapping("/{id}")
    public AtendimentoMedico buscarPorId(@PathVariable Long id) {
        return atendimentoMedicoService.buscarPorId(id);
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<AtendimentoMedico> listarPorPaciente(@PathVariable Long pacienteId) {
        return atendimentoMedicoService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/profissional/{profissionalId}")
    public List<AtendimentoMedico> listarPorProfissional(@PathVariable Long profissionalId) {
        return atendimentoMedicoService.listarPorProfissional(profissionalId);
    }

    @GetMapping("/triagem/{triagemId}")
    public List<AtendimentoMedico> listarPorTriagem(@PathVariable Long triagemId) {
        return atendimentoMedicoService.listarPorTriagem(triagemId);
    }

    @GetMapping("/agendamento/{agendamentoId}")
    public List<AtendimentoMedico> listarPorAgendamento(@PathVariable Long agendamentoId) {
        return atendimentoMedicoService.listarPorAgendamento(agendamentoId);
    }

    @GetMapping("/status/{statusAtendimentoMedico}")
    public List<AtendimentoMedico> listarPorStatus(@PathVariable StatusAtendimentoMedico statusAtendimentoMedico) {
        return atendimentoMedicoService.listarPorStatus(statusAtendimentoMedico);
    }

    @PostMapping("/cadastrar")
    public AtendimentoMedico cadastrar(@RequestBody AtendimentoMedico atendimentoMedico) {
        return atendimentoMedicoService.cadastrar(atendimentoMedico);
    }

    @PutMapping("/{id}")
    public AtendimentoMedico atualizar(@PathVariable Long id, @RequestBody AtendimentoMedico atendimentoMedico) {
        return atendimentoMedicoService.atualizar(id, atendimentoMedico);
    }

    @PutMapping("/{id}/finalizar")
    public AtendimentoMedico finalizar(@PathVariable Long id) {
        return atendimentoMedicoService.finalizar(id);
    }

    @PutMapping("/{id}/cancelar")
    public AtendimentoMedico cancelar(@PathVariable Long id) {
        return atendimentoMedicoService.cancelar(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        atendimentoMedicoService.deletar(id);
    }

}
