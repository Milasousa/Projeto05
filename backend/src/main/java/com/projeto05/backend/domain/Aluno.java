package com.projeto05.backend.domain;
import java.util.List;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "alunos")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Column(name = "name", nullable = false)
    private String name;

    //@Column(name = "email", nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    //@Column(name = "funcao")
    private IntegranteENUM funcao;

    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;

    public Aluno() {
    
    }    
    
    public Aluno(Long id, String name, String email, IntegranteENUM funcao, Projeto projeto) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.funcao = funcao;
        this.projeto = projeto;
    }    


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public IntegranteENUM getFuncao() {
        return funcao;
    }

    public Projeto getProjeto() {
        return projeto;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFuncao(IntegranteENUM funcao) {
        this.funcao = funcao;
    }

    public void setProjeto(Projeto projeto) {
        this.projeto = projeto;
    }



}

