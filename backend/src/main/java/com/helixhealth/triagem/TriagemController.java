package com.helixhealth.triagem;

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
@RequestMapping("/triagens")
@CrossOrigin("*")
public class TriagemController {
    
    private final TriagemService triagemService;

    public TriagemController(TriagemService triagemService) {
        this.triagemService = triagemService;
    }

    @GetMapping
    public List<Triagem> listar() {
        return triagemService.listar();
    }

    @GetMapping("/{id}")
    public Triagem buscarPorId(@PathVariable Long id) {
        return triagemService.buscarPorId(id);
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<Triagem> listarPorPaciente(@PathVariable Long pacienteId) {
        return triagemService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/profissional/{profissionalId}")
    public List<Triagem> listarPorProfissional(@PathVariable Long profissionalId) {
        return triagemService.listarPorProfissional(profissionalId);
    }

    @GetMapping("/prioridade/{prioridadeTriagem}")
    public List<Triagem> listarPorPrioridade(@PathVariable PrioridadeTriagem prioridadeTriagem) {
        return triagemService.listarPorPrioridade(prioridadeTriagem);
    }

    @GetMapping("/status/{statusTriagem}")
    public List<Triagem> listarPorStatus(@PathVariable StatusTriagem statusTriagem) {
        return triagemService.listarPorStatus(statusTriagem);
    }

    @PostMapping("/cadastrar")
    public Triagem cadastrar(@RequestBody Triagem triagem) {
        return triagemService.cadastrar(triagem);
    }

    @PutMapping("/{id}")
    public Triagem atualizar(@PathVariable Long id, @RequestBody Triagem triagem) {
        return triagemService.atualizar(id, triagem);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        triagemService.deletar(id);
    }

    @PutMapping("/{id}/iniciar-atendimento")
    public Triagem iniciarAtendimento(@PathVariable Long id) {
        return triagemService.iniciarAtendimento(id);
    }

    @PutMapping("/{id}/finalizar-atendimento")
    public Triagem finalizarAtendimento(@PathVariable Long id) {
        return triagemService.finalizarAtendimento(id);
    }

}
