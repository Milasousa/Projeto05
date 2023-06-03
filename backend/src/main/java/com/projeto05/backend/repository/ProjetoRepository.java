package com.projeto05.backend.repository;
import org.springframework.stereotype.Repository;

import com.projeto05.backend.domain.Projeto;

import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long> {}
