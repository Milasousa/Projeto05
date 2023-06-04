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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto05.backend.domain.Professor;
import com.projeto05.backend.repository.ProfessorRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorrepository;

    @GetMapping
    public List<Professor> getProfessores() {
        return professorrepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Professor> getProfessoreById(@PathVariable Long id) {
        return professorrepository.findById(id);
    }

    @PostMapping
    public Professor criarProfessor(@RequestBody Professor prof) {
            return professorrepository.save(prof);
    }

    @PutMapping("/{id}")
    public Professor atualizarProfessor(@PathVariable("id") Long id, @RequestBody Professor prof) {
        try {
            if ((professorrepository.findById(id).get()) == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Não existe nenhum Professor com essa matricula: " + id);
            }
            return professorrepository.save(prof);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não existe nenhum Professor com essa matricula: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void apagarProfessor(@PathVariable Long id) {
        try {
            professorrepository.delete(professorrepository.findById(id).get());
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não existe nenhum Professor com essa matricula: " + id);
        }
    }

    public boolean verificarPorId(Long id) {
        return professorrepository.existsById(id);
    }

    public boolean verificarPorEmail(String email) {
        return professorrepository.existsByemail(email);
    }
}