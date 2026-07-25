package com.helixhealth.internacao;

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
public class InternacaoController {
    
    private final InternacaoService internacaoService;

    public InternacaoController(InternacaoService internacaoService) {
        this.internacaoService = internacaoService;
    }

    @GetMapping("/internacoes")
    public List<Internacao> listar() {
        return internacaoService.listar();
    }

    @GetMapping("/internacoes/{id}")
    public Internacao buscarPorId(@PathVariable Long id) {
        return internacaoService.buscarPorId(id);
    }

    @GetMapping("/internacoes/paciente/{pacienteId}")
    public List<Internacao> listarPorPaciente(@PathVariable Long pacienteId) {
        return internacaoService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/internacoes/profissional/{profissionalId}")
    public List<Internacao> listarPorProfissional(@PathVariable Long profissionalId) {
        return internacaoService.listarPorProfissional(profissionalId);
    }

    @GetMapping("/internacoes/leito/{leitoId}")
    public List<Internacao> listarPorLeito(@PathVariable Long leitoId) {
        return internacaoService.listarPorLeito(leitoId);
    }

    @GetMapping("/internacoes/status/{statusInternacao}")
    public List<Internacao> listarPorStatus(@PathVariable StatusInternacao statusInternacao) {
        return internacaoService.listarPorStatus(statusInternacao);
    }

    @PostMapping("/internacoes/cadastrar")
    public Internacao cadastrar(@RequestBody Internacao internacao) {
        return internacaoService.cadastrar(internacao);
    }

    @PutMapping("/internacoes/{id}")
    public Internacao atualizar(@PathVariable Long id, @RequestBody Internacao internacao) {
        return internacaoService.atualizar(id, internacao);
    }

    @DeleteMapping("/internacoes/{id}")
    public void deletar(@PathVariable Long id) {
        internacaoService.deletar(id);
    }

}
