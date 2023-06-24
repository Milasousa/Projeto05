package com.projeto05.backend.domain;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.InheritanceType;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "projetos", uniqueConstraints = {
    @UniqueConstraint(columnNames = { "id" })
})
@Inheritance(strategy = InheritanceType.JOINED)
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nameprojeto", nullable = true)
    private String nameprojeto;

    @Column(name = "descricaoprojeto", nullable = true)
    private String descricaoprojeto;

    @JsonIgnore
    @OneToMany(mappedBy = "projeto",targetEntity = Aluno.class)
    private List<Aluno> aluno;


}
