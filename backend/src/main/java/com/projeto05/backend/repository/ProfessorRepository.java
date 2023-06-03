package com.projeto05.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto05.backend.domain.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    boolean existsByemail(String email);
}