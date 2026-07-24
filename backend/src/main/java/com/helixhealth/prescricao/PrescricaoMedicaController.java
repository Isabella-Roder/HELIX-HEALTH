package com.helixhealth.prescricao;

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
public class PrescricaoMedicaController {
    
    private final PrescricaoMedicaService prescricaoMedicaService;

    public PrescricaoMedicaController(PrescricaoMedicaService prescricaoMedicaService) {
        this.prescricaoMedicaService = prescricaoMedicaService;
    }

    @GetMapping("/prescricoes-medicas")
    public List<PrescricaoMedica> listar() {
        return prescricaoMedicaService.listar();
    }

    @GetMapping("/prescricoes-medicas/{id}")
    public PrescricaoMedica buscarPorId(@PathVariable Long id) {
        return prescricaoMedicaService.buscarPorId(id);
    }

    @GetMapping("/prescricoes-medicas/paciente/{pacienteId}")
    public List<PrescricaoMedica> listarPorPaciente(@PathVariable Long pacienteId) {
        return prescricaoMedicaService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/prescricoes-medicas/profissional/{profissionalId}")
    public List<PrescricaoMedica> listarPorProfissional(@PathVariable Long profissionalId) {
        return prescricaoMedicaService.listarPorProfissional(profissionalId);
    }

    @PostMapping("/prescricoes-medicas/cadastrar")
    public PrescricaoMedica cadastrar(@RequestBody PrescricaoMedica prescricaoMedica) {
        return prescricaoMedicaService.cadastrar(prescricaoMedica);
    }

    @PutMapping("/prescricoes-medicas/{id}")
    public PrescricaoMedica atualizar(@PathVariable Long id, @RequestBody PrescricaoMedica prescricaoMedica) {
        return prescricaoMedicaService.atualizar(id, prescricaoMedica);
    }

    @DeleteMapping("/prescricoes-medicas/{id}")
    public void deletar(@PathVariable Long id) {
        prescricaoMedicaService.deletar(id);
    }
}
