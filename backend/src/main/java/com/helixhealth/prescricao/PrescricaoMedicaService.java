package com.helixhealth.prescricao;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class PrescricaoMedicaService {
    
    private final PrescricaoMedicaRepository prescricaoMedicaRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;

    public PrescricaoMedicaService(PrescricaoMedicaRepository prescricaoMedicaRepository, PacienteRepository pacienteRepository, ProfissionalRepository profissionalRepository) {
        this.prescricaoMedicaRepository = prescricaoMedicaRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
    }

    public List<PrescricaoMedica> listar() {
        return prescricaoMedicaRepository.findAll();
    }

    public PrescricaoMedica buscarPorId(Long id) {
        return prescricaoMedicaRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Prescricao medica nao encotrada."));
    }

    public List<PrescricaoMedica> listarPorPaciente(Long pacienteId) {
        return prescricaoMedicaRepository.findByPacienteId(pacienteId);
    }

    public List<PrescricaoMedica> listarPorProfissional(Long profissionalId) {
        return prescricaoMedicaRepository.findByProfissionalId(profissionalId);
    }

    public void validacoesCadastro(PrescricaoMedica prescricaoMedica) {
        if (prescricaoMedica.getMedicamento() == null || prescricaoMedica.getMedicamento().isBlank()) {
            throw new IllegalArgumentException("Medicamento nao pode ser vazio.");
        } else if (prescricaoMedica.getDosagem() == null || prescricaoMedica.getDosagem().isBlank()) {
            throw new IllegalArgumentException("Dosagem nao pode ser vazio.");
        } else if (prescricaoMedica.getFrequencia() == null || prescricaoMedica.getFrequencia().isBlank()) {
            throw new IllegalArgumentException("Frequencia nao pode ser vazio.");
        } else if (prescricaoMedica.getDuracao() == null || prescricaoMedica.getDuracao().isBlank()) {
            throw new IllegalArgumentException("Duracao nao pode ser vazio.");
        } else if (prescricaoMedica.getOrientacoes() == null || prescricaoMedica.getOrientacoes().isBlank()) {
            throw new IllegalArgumentException("Orientacoes nao pode ser vazio.");
        } else if (prescricaoMedica.getDataPrescricao() == null) {
            throw new IllegalArgumentException("Data da prescricao nao pode ser vazio.");
        } else if (prescricaoMedica.getPaciente() == null || prescricaoMedica.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente nao pode ser vazio.");
        } else if (prescricaoMedica.getProfissional() == null || prescricaoMedica.getProfissional().getId() == null) {
            throw new IllegalArgumentException("Profissional nao pode ser vazio.");
        }
    }

    private void prepararRelacionamento(PrescricaoMedica prescricaoMedica) {
        Paciente paciente = pacienteRepository.findById(prescricaoMedica.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Nenhum paciente encontrado."));

        Profissional profissional = profissionalRepository.findById(prescricaoMedica.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Nenhum profissional encontrado."));

        prescricaoMedica.setPaciente(paciente);
        prescricaoMedica.setProfissional(profissional);
    }

    public PrescricaoMedica cadastrar(PrescricaoMedica prescricaoMedica) {
        validacoesCadastro(prescricaoMedica);
        prepararRelacionamento(prescricaoMedica);

        return prescricaoMedicaRepository.save(prescricaoMedica);
    }

    public PrescricaoMedica atualizar(Long id, PrescricaoMedica dadosAtualizados) {
        PrescricaoMedica prescricaoMedica = buscarPorId(id);

        prescricaoMedica.setMedicamento(dadosAtualizados.getMedicamento());
        prescricaoMedica.setDosagem(dadosAtualizados.getDosagem());
        prescricaoMedica.setFrequencia(dadosAtualizados.getFrequencia());
        prescricaoMedica.setDuracao(dadosAtualizados.getDuracao());
        prescricaoMedica.setOrientacoes(dadosAtualizados.getOrientacoes());
        prescricaoMedica.setDataPrescricao(dadosAtualizados.getDataPrescricao());
        prescricaoMedica.setPaciente(dadosAtualizados.getPaciente());
        prescricaoMedica.setProfissional(dadosAtualizados.getProfissional());

        validacoesCadastro(prescricaoMedica);
        prepararRelacionamento(prescricaoMedica);

        return prescricaoMedicaRepository.save(prescricaoMedica);
    }

    public void deletar(Long id) {
        PrescricaoMedica prescricaoMedica = buscarPorId(id);

        prescricaoMedicaRepository.delete(prescricaoMedica);
    }

}
