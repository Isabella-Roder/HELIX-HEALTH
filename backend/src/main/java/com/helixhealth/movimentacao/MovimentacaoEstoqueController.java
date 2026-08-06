package com.helixhealth.movimentacao;

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
@RequestMapping("/movimentacoes")
@CrossOrigin(origins = "*")
public class MovimentacaoEstoqueController {
    
    private final MovimentacaoEstoqueService movimentacaoEstoqueService;

    public MovimentacaoEstoqueController(MovimentacaoEstoqueService movimentacaoEstoqueService) {
        this.movimentacaoEstoqueService = movimentacaoEstoqueService;
    }

    @GetMapping
    public List<MovimentacaoEstoque> listar() {
        return movimentacaoEstoqueService.listar();
    }

    @GetMapping("/{id}")
    public MovimentacaoEstoque buscarPorId(@PathVariable Long id) {
        return movimentacaoEstoqueService.buscarPorId(id);
    }

    @GetMapping("/material/{materialId}")
    public List<MovimentacaoEstoque> listarPorMaterial(@PathVariable Long materialId) {
        return movimentacaoEstoqueService.listarPorMaterial(materialId);
    }

    @GetMapping("/tipo/{tipo}")
    public List<MovimentacaoEstoque> listarPorTipo(@PathVariable TipoMovimentacao tipo) {
        return movimentacaoEstoqueService.listarPorTipo(tipo);
    }

    @GetMapping("/setor/{setor}")
    public List<MovimentacaoEstoque> listarPorSetorDestino(@PathVariable String setor) {
        return movimentacaoEstoqueService.listarPorSetorDestino(setor);
    }

    @GetMapping("/profissional/{responsavelId}")
    public List<MovimentacaoEstoque> listarPorResponsavel(@PathVariable Long responsavelId) {
        return movimentacaoEstoqueService.listarPorResponsavel(responsavelId);
    }

    @PostMapping("/cadastrar")
    public MovimentacaoEstoque cadastrar(@RequestBody MovimentacaoEstoque movimentacaoEstoque) {
        return movimentacaoEstoqueService.cadastrar(movimentacaoEstoque);
    }

    @PutMapping("/{id}")
    public MovimentacaoEstoque atualizar(@PathVariable Long id, @RequestBody MovimentacaoEstoque estoque) {
        return movimentacaoEstoqueService.atualizar(id, estoque);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        movimentacaoEstoqueService.deletar(id);
    }
}
