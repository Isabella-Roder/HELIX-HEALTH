package com.helixhealth.medicamento;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MedicamentoService {
    
    private final MedicamentoRepository medicamentoRepository;

    public MedicamentoService(MedicamentoRepository medicamentoRepository) {
        this.medicamentoRepository = medicamentoRepository;
    }

    public List<Medicamento> listar() {
        return medicamentoRepository.findAll();
    }

    public Medicamento buscarPorId(Long id) {
        return medicamentoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Medicamento nao encontrado."));
    }

    public List<Medicamento> listarPorStatus(StatusMedicamento statusMedicamento) {
        return medicamentoRepository.findByStatusMedicamento(statusMedicamento);
    }

    public List<Medicamento> listarPorNome(String nome) {
        return medicamentoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Medicamento> listarPorFornecedor(String fornecedor) {
        return medicamentoRepository.findByFornecedorContainingIgnoreCase(fornecedor);
    }

    private void validar(Medicamento medicamento) {
        if (medicamento.getNome() == null || medicamento.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do medicamento nao pode ser vazio.");
        } else if (medicamento.getQuantidadeEstoque() == null || medicamento.getQuantidadeEstoque() < 0) {
            throw new IllegalArgumentException("Quantidade de estoque nao pode ser negativa.");
        } else if (medicamento.getDataValidade() == null) {
            throw new IllegalArgumentException("Data de validade nao pode ser vazia.");
        } else if (medicamento.getEstoqueMinimo() == null || medicamento.getEstoqueMinimo() < 0) {
            throw new IllegalArgumentException("Estoque minimo nao pode ser negativo.");
        }
    }

    private void atualizarStatusAutomatico(Medicamento medicamento) {
        if (medicamento.getDataValidade().isBefore(LocalDate.now())) {
            medicamento.setStatusMedicamento(StatusMedicamento.VENCIDO);
            return;
        }

        if (medicamento.getQuantidadeEstoque() <= 0) {
            medicamento.setStatusMedicamento(StatusMedicamento.INDISPONIVEL);
            return;
        }

        if (medicamento.getQuantidadeEstoque() <= medicamento.getEstoqueMinimo()) {
            medicamento.setStatusMedicamento(StatusMedicamento.BAIXO_ESTOQUE);
            return;
        }

        medicamento.setStatusMedicamento(StatusMedicamento.DISPONIVEL);
    }

    public Medicamento cadastrar(Medicamento medicamento) {
        validar(medicamento);
        atualizarStatusAutomatico(medicamento);

        return medicamentoRepository.save(medicamento);
    }

    public Medicamento atualizar(Long id, Medicamento dadosAtualizados) {
        Medicamento medicamento = buscarPorId(id);

        medicamento.setNome(dadosAtualizados.getNome());
        medicamento.setPrincipioAtivo(dadosAtualizados.getPrincipioAtivo());
        medicamento.setDosagem(dadosAtualizados.getDosagem());
        medicamento.setFormaFarmaceutica(dadosAtualizados.getFormaFarmaceutica());
        medicamento.setQuantidadeEstoque(dadosAtualizados.getQuantidadeEstoque());
        medicamento.setEstoqueMinimo(dadosAtualizados.getEstoqueMinimo());
        medicamento.setDataValidade(dadosAtualizados.getDataValidade());
        medicamento.setFornecedor(dadosAtualizados.getFornecedor());

        validar(medicamento);
        atualizarStatusAutomatico(medicamento);

        return medicamentoRepository.save(medicamento);
    }

    public void deletar(Long id) {
        Medicamento medicamento = buscarPorId(id);

        medicamentoRepository.delete(medicamento);
    }
}
