package com.helixhealth.pagamento;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.helixhealth.paciente.Paciente;
import com.helixhealth.paciente.PacienteRepository;

@Service
public class PagamentoService {
    
    private final PagamentoRepository pagamentoRepository;
    private final PacienteRepository pacienteRepository;

    public PagamentoService(PagamentoRepository pagamentoRepository, PacienteRepository pacienteRepository) {
        this.pagamentoRepository = pagamentoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public List<Pagamento> listar() {
        return pagamentoRepository.findAll();
    }

    public Pagamento buscarPorId(Long id) {
        return pagamentoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Pagamento nao encontrado."));
    }

    public List<Pagamento> listarPorPaciente(Long pacienteId) {
        return pagamentoRepository.findByPacienteId(pacienteId);
    }

    public List<Pagamento> listarPorDataVencimento(LocalDate dataVencimento) {
        return pagamentoRepository.findByDataVencimento(dataVencimento);
    }

    public List<Pagamento> listarPorDataPagamento(LocalDate dataPagamento) {
        return pagamentoRepository.findByDataPagamento(dataPagamento);
    }

    public List<Pagamento> listarPorFormaPagamento(FormaPagamento formaPagamento) {
        return pagamentoRepository.findByFormaPagamento(formaPagamento);
    }

    public List<Pagamento> listarPorStatus(StatusPagamento statusPagamento) {
        return pagamentoRepository.findByStatusPagamento(statusPagamento);
    }

    private void validacoes(Pagamento pagamento) {
        if (pagamento.getPaciente() == null || pagamento.getPaciente().getId() == null) {
            throw new IllegalArgumentException("Paciente e obrigatorio.");
        } else if (pagamento.getFormaPagamento() == null) {
            throw new IllegalArgumentException("Forma de pagamento obrigatorio.");
        } else if (pagamento.getStatusPagamento() == null) {
            throw new IllegalArgumentException("Status de pagamento obrigatorio.");
        } else if (pagamento.getDataVencimento() == null) {
            throw new IllegalArgumentException("Data de vencimento obrigatorio.");
        }
    }

    public Pagamento cadastrar(Pagamento pagamento) {
        validacoes(pagamento);

        return pagamentoRepository.save(pagamento);
    }

    public Pagamento atualizar(Long id, Pagamento dadosAtualizados) {
        Pagamento pagamento = buscarPorId(id);

        pagamento.setPaciente(dadosAtualizados.getPaciente());
        pagamento.setDescricao(dadosAtualizados.getDescricao());
        pagamento.setValor(dadosAtualizados.getValor());
        pagamento.setDataVencimento(dadosAtualizados.getDataVencimento());
        pagamento.setDataPagamento(dadosAtualizados.getDataPagamento());
        pagamento.setFormaPagamento(dadosAtualizados.getFormaPagamento());
        pagamento.setStatusPagamento(dadosAtualizados.getStatusPagamento());

        validacoes(pagamento);

        return pagamentoRepository.save(pagamento);
    }

    public void deletar(Long id) {
        Pagamento pagamento = buscarPorId(id);

        pagamentoRepository.delete(pagamento);
    }

    public Pagamento pagar(Long id, FormaPagamento formaPagamento) {
        Pagamento pagamento = buscarPorId(id);

        pagamento.setFormaPagamento(formaPagamento);
        pagamento.setStatusPagamento(StatusPagamento.PAGO);
        pagamento.setDataPagamento(LocalDate.now());

        return pagamentoRepository.save(pagamento);
    }

}   
