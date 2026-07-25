package com.helixhealth.internacao;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.leito.Leito;
import com.helixhealth.leito.LeitoRepository;
import com.helixhealth.leito.StatusLeito;
import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;
import com.helixhealth.profissional.Profissional;
import com.helixhealth.profissional.ProfissionalRepository;

@Service
public class InternacaoService {
    
    private final InternacaoRepository internacaoRepository;
    private final PacienteRepository pacienteRepository;
    private final ProfissionalRepository profissionalRepository;
    private final LeitoRepository leitoRepository;

    public InternacaoService(
        InternacaoRepository internacaoRepository,
        PacienteRepository pacienteRepository,
        ProfissionalRepository profissionalRepository,
        LeitoRepository leitoRepository
    ) {
        this.internacaoRepository = internacaoRepository;
        this.pacienteRepository = pacienteRepository;
        this.profissionalRepository = profissionalRepository;
        this.leitoRepository = leitoRepository;
    }

    public List<Internacao> listar() {
        return internacaoRepository.findAll();
    }

    public Internacao buscarPorId(Long id) {
        return internacaoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Internacao nao encontrada."));
    }

    public List<Internacao> listarPorPaciente(Long pacienteId) {
        return internacaoRepository.findByPacienteId(pacienteId);
    }

    public List<Internacao> listarPorProfissional(Long profissionalId) {
        return internacaoRepository.findByProfissionalId(profissionalId);
    }

    public List<Internacao> listarPorLeito(Long leitoId) {
        return internacaoRepository.findByLeitoId(leitoId);
    }

    public List<Internacao> listarPorStatus(StatusInternacao statusInternacao) {
        return internacaoRepository.findByStatusInternacao(statusInternacao);
    }

    public void validacoesCadastro(Internacao internacao) {
        if (internacao.getDataEntrada() == null) {
            throw new IllegalArgumentException("Data de entrada nao pode ser vazio.");
        } else if (internacao.getMotivo() == null || internacao.getMotivo().isBlank()) {
            throw new IllegalArgumentException("Motivo nao pode ser vazio.");
        } else if (internacao.getStatusInternacao() == null) {
            throw new IllegalArgumentException("Status de internacao nao pode ser vazio.");
        } else if (internacao.getPaciente() == null || internacao.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente nao pode ser vazio.");
        } else if (internacao.getProfissional() == null || internacao.getProfissional().getId() == null) {
            throw new IllegalArgumentException("Profissional nao pode ser vazio.");
        } else if (internacao.getLeito() == null || internacao.getLeito().getId() == null) {
            throw new IllegalArgumentException("Leito nao pode ser vazio.");
        }
    }

    private void prepararRelacionamentos(Internacao internacao) {
        Paciente paciente = pacienteRepository.findById(internacao.getPaciente().getId())
            .orElseThrow(() -> new IllegalArgumentException("Paciente nao encontrado."));

        Profissional profissional = profissionalRepository.findById(internacao.getProfissional().getId())
            .orElseThrow(() -> new IllegalArgumentException("Profissional nao encontrado."));

        Leito leito = leitoRepository.findById(internacao.getLeito().getId())
            .orElseThrow(() -> new IllegalArgumentException("Leito nao encontrado."));

        internacao.setPaciente(paciente);
        internacao.setProfissional(profissional);
        internacao.setLeito(leito);
    }

    private void ocuparLeito(Internacao internacao, Long leitoAnteriorId) {
        Leito leito = internacao.getLeito();
        boolean mesmoLeitoDaInternacao = leitoAnteriorId != null && leito.getId().equals(leitoAnteriorId);

        if (
            leito.getStatusLeito() != StatusLeito.DISPONIVEL &&
            internacao.getStatusInternacao() == StatusInternacao.ATIVA &&
            !mesmoLeitoDaInternacao
        ) {
            throw new IllegalArgumentException("Leito nao esta disponivel.");
        }

        if (internacao.getStatusInternacao() == StatusInternacao.ATIVA) {
            leito.setStatusLeito(StatusLeito.OCUPADO);
            leitoRepository.save(leito);
        }
    }

    private void liberarLeitoSeFinalizada(Internacao internacao) {
        if (
            internacao.getStatusInternacao() == StatusInternacao.ALTA ||
            internacao.getStatusInternacao() == StatusInternacao.TRANSFERIDA ||
            internacao.getStatusInternacao() == StatusInternacao.CANCELADA
        ) {
            Leito leito = internacao.getLeito();
            leito.setStatusLeito(StatusLeito.DISPONIVEL);
            leitoRepository.save(leito);
        }
    }

    public Internacao cadastrar(Internacao internacao) {
        validacoesCadastro(internacao);
        prepararRelacionamentos(internacao);
        ocuparLeito(internacao, null);
        liberarLeitoSeFinalizada(internacao);

        return internacaoRepository.save(internacao);
    }

    public Internacao atualizar(Long id, Internacao dadosAtualizados) {
        Internacao internacao = buscarPorId(id);
        Leito leitoAnterior = internacao.getLeito();
        Long leitoAnteriorId = leitoAnterior != null ? leitoAnterior.getId() : null;

        internacao.setDataEntrada(dadosAtualizados.getDataEntrada());
        internacao.setDataAlta(dadosAtualizados.getDataAlta());
        internacao.setMotivo(dadosAtualizados.getMotivo());
        internacao.setObservacoes(dadosAtualizados.getObservacoes());
        internacao.setStatusInternacao(dadosAtualizados.getStatusInternacao());
        internacao.setPaciente(dadosAtualizados.getPaciente());
        internacao.setProfissional(dadosAtualizados.getProfissional());
        internacao.setLeito(dadosAtualizados.getLeito());

        validacoesCadastro(internacao);
        prepararRelacionamentos(internacao);
        ocuparLeito(internacao, leitoAnteriorId);

        if (leitoAnterior != null && !leitoAnterior.getId().equals(internacao.getLeito().getId())) {
            leitoAnterior.setStatusLeito(StatusLeito.DISPONIVEL);
            leitoRepository.save(leitoAnterior);
        }

        liberarLeitoSeFinalizada(internacao);

        return internacaoRepository.save(internacao);
    }

    public void deletar(Long id) {
        Internacao internacao = buscarPorId(id);

        if (internacao.getLeito() != null) {
            Leito leito = internacao.getLeito();
            leito.setStatusLeito(StatusLeito.DISPONIVEL);
            leitoRepository.save(leito);
        }

        internacaoRepository.delete(internacao);
    }

}
