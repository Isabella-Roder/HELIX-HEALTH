package com.helixhealth.medicamento;

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
@RequestMapping("/medicamentos")
@CrossOrigin(origins = "*")
public class MedicamentoController {
    
    private final MedicamentoService medicamentoService;

    public MedicamentoController(MedicamentoService medicamentoService) {
        this.medicamentoService = medicamentoService;
    }

    @GetMapping
    public List<Medicamento> listar() {
        return medicamentoService.listar();
    }

    @GetMapping("/{id}")
    public Medicamento buscarPorId(@PathVariable Long id) {
        return medicamentoService.buscarPorId(id);
    }

    @GetMapping("/status/{statusMedicamento}")
    public List<Medicamento> listarPorStatus(@PathVariable StatusMedicamento statusMedicamento) {
        return medicamentoService.listarPorStatus(statusMedicamento);
    }

    @GetMapping("/nome/{nome}")
    public List<Medicamento> listarPorNome(@PathVariable String nome) {
        return medicamentoService.listarPorNome(nome);
    }

    @GetMapping("/fornecedor/{fornecedor}")
    public List<Medicamento> listarPorFornecedor(@PathVariable String fornecedor) {
        return medicamentoService.listarPorFornecedor(fornecedor);
    }

    @PostMapping("/cadastrar")
    public Medicamento cadastrar(@RequestBody Medicamento medicamento) {
        return medicamentoService.cadastrar(medicamento);
    }

    @PutMapping("/{id}")
    public Medicamento atualizar(@PathVariable Long id, @RequestBody Medicamento medicamento) {
        return medicamentoService.atualizar(id, medicamento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        medicamentoService.deletar(id);
    }

}
