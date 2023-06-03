package com.projeto05.backend.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto05.backend.domain.Aluno;
import com.projeto05.backend.repository.AlunoRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/alunos")
public class AlunoController {
    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    public List<Aluno> getAlunos() {
        return alunoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Aluno> getAlunosById(@PathVariable Long id) {
        return alunoRepository.findById(id);
    }

    @PostMapping
    public Aluno criarAlunos(@RequestBody Aluno aluno) {
            return alunoRepository.save(aluno);
    }

    @PutMapping("/{id}")
    public Aluno atualizarAlunos(@PathVariable("id") Long id, @RequestBody Aluno aluno) {
        try {
            if ((alunoRepository.findById(id).get()) == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Não existe nenhum Aluno com essa matricula: " + id);
            }
            return alunoRepository.save(aluno);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não existe nenhum Aluno com essa matricula: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void apagarAlunos(@PathVariable Long id) {
        try {
            alunoRepository.delete(alunoRepository.findById(id).get());
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não existe nenhum Aluno com essa matricula: " + id);
        }
    }

    public boolean verificarPorId(Long id) {
        return alunoRepository.existsById(id);
    }

    public boolean verificarPorEmail(String email) {
        return alunoRepository.existsByemail(email);
    }
}