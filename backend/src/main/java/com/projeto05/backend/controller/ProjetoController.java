package com.projeto05.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.projeto05.backend.domain.IntegranteENUM;
import com.projeto05.backend.domain.Professor;
import com.projeto05.backend.domain.Projeto;
import com.projeto05.backend.exceptions.NaoEncontradoException;
import com.projeto05.backend.repository.AlunoRepository;
import com.projeto05.backend.repository.ProfessorRepository;
import com.projeto05.backend.repository.ProjetoRepository;
import javassist.NotFoundException;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/projetos")
public class ProjetoController {
    @Autowired
    private ProjetoRepository projetoRepository;
    @Autowired
    private ProfessorRepository professorrepository;
    @Autowired
    private AlunoRepository alunorrepository;

    @GetMapping
        public List<Projeto> getProjetos() {
            return projetoRepository.findAll();
        }

    @GetMapping("/{id}")
        public ResponseEntity<Projeto> getProjetosById(@PathVariable Long id) {
            Projeto projeto = projetoRepository.findById(id)
                    .orElseThrow(() -> new NaoEncontradoException("projeto not exist with id :" + id));
            return ResponseEntity.ok(projeto);
        }

    @PostMapping("/{professorId}")
    public ResponseEntity<Projeto> criarProjeto(@RequestBody Projeto projeto,
            @PathVariable("professorId") Long professorId) throws NotFoundException {
                    try {
                        Professor professor = professorrepository.findById(professorId).get();
                        //projeto.setProfessor(professor);
                        professor.setFuncao(IntegranteENUM.COORDINATOR);
                        professorrepository.save(professor);
                        return ResponseEntity.ok(projetoRepository.save(projeto));
                    } catch (NoSuchElementException e) {
                        throw new NotFoundException("Não foi encontrado, o professor com o identificador informado.");
                    }
                }   

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarProjeto(@PathVariable("id") Long id, @RequestBody Projeto projeto)
            throws NotFoundException {
                try {
                    if ((projetoRepository.findById(id).get()) == null) {
                        throw new NotFoundException("Não existe nenhuma Projeto com esse identificador: " + id);
        
                    }
                    return ResponseEntity.ok(projetoRepository.save(projeto));
                } catch (NoSuchElementException e) {
                    throw new NotFoundException("Não existe nenhum Projeto com esse identificador: " + id);
        
                }
            }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<?> apagarProjeto(@PathVariable("id") Long id) {
        Projeto projeto = projetoRepository.findById(id)
				.orElseThrow(() -> new NaoEncontradoException("projeto not exist with id :" + id));
		
        projetoRepository.delete(projeto);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
