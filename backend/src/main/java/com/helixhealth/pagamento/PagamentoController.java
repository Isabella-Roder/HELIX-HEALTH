package com.helixhealth.pagamento;

import java.time.LocalDate;
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
@RequestMapping("/pagamentos")
@CrossOrigin(origins = "*")
public class PagamentoController {
    
    private final PagamentoService pagamentoService;

    public PagamentoController(PagamentoService pagamentoService) {
        this.pagamentoService = pagamentoService;
    }

    @GetMapping
    public List<Pagamento> listar() {
        return pagamentoService.listar();
    }

    @GetMapping("/{id}")
    public Pagamento buscarPorId(@PathVariable Long id) {
        return pagamentoService.buscarPorId(id);
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<Pagamento> listarPorPaciente(@PathVariable Long pacienteId) {
        return pagamentoService.listarPorPaciente(pacienteId);
    }

    @GetMapping("/data-vencimento/{dataVencimento}")
    public List<Pagamento> listarPorDataVencimento(@PathVariable LocalDate dataVencimento) {
        return pagamentoService.listarPorDataVencimento(dataVencimento);
    }

    @GetMapping("/data-pagamento/{dataPagamento}")
    public List<Pagamento> listarPorDataPagamento(@PathVariable LocalDate dataPagamento) {
        return pagamentoService.listarPorDataPagamento(dataPagamento);
    }

    @GetMapping("/forma-pagamento/{formaPagamento}")
    public List<Pagamento> listarPorFormaPagamento(@PathVariable FormaPagamento formaPagamento) {
        return pagamentoService.listarPorFormaPagamento(formaPagamento);
    }

    @GetMapping("/status-pagamento/{statusPagamento}")
    public List<Pagamento> listarPorStatus(@PathVariable StatusPagamento statusPagamento) {
        return pagamentoService.listarPorStatus(statusPagamento);
    }

    @PostMapping("/cadastrar")
    public Pagamento cadastrar(@RequestBody Pagamento pagamento) {
        return pagamentoService.cadastrar(pagamento);
    }

    @PutMapping("/{id}")
    public Pagamento atualizar(@PathVariable Long id, @RequestBody Pagamento pagamento) {
        return pagamentoService.atualizar(id, pagamento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        pagamentoService.deletar(id);
    }

    @PostMapping("/pagar/{id}")
    public Pagamento pagar(@PathVariable Long id, @RequestBody FormaPagamento formaPagamento) {
        return pagamentoService.pagar(id, formaPagamento);
    }

}
