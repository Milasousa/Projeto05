import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label,Alert } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';


const ProfessorEdit = () => {
  const initialFormState = {
    name: '',
    email: '',
    formacao: '',
    funcao: '',
    nameprojeto: '',
    descricaoprojeto:''

  };
  const [professor, setProfessor] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(['XSRF-TOKEN']);

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/professores/${id}`)
        .then(response => response.json())
        .then(data => setProfessor(data));
    }
  }, [id, setProfessor]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setProfessor({ ...professor, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/professores/${professor.id ? `/${professor.id}` : ''}`, {
      method: (professor.id) ? 'PUT' : 'POST',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(professor),
      credentials: 'include'
    });
    setProfessor(initialFormState);
    navigate('/professores');
  }

  const title = <h2>{professor.id ? 'Editar Professor ou Projeto Associado' : 'Adicionar Professor'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={professor.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input type="email" name="email" id="email" value={professor.email || ''}
                   onChange={handleChange} autoComplete="email"/>
          </FormGroup>
          <FormGroup>
            <Label for="formacao">Formação</Label>
            <Input type="text" name="formacao" id="formacao" value={professor.formacao || ''}
                   onChange={handleChange} autoComplete="formacao"/>
          </FormGroup>
            <FormGroup>
            <Alert severity="info">Tipos de Função para Professor: COORDINATOR,ADVISOR,RESEARCHER</Alert>
              <Label for="funcao">Função </Label>
              <select name="funcao" id="funcao" value={professor.funcao || ''}
                   onChange={handleChange} autoComplete="funcao">
                <option value='COORDINATOR'>COORDINATOR</option>
                <option value='ADVISOR'>ADVISOR</option>
                <option value='RESEARCHER'>RESEARCHER</option>
                <option value={professor.funcao} onChange={handleChange} autoComplete="funcao"></option>
              </select>
            </FormGroup>
            <FormGroup>
            <Label for="nameprojeto">Nome do Projeto</Label>
            <Input type="text" name="nameprojeto" id="nameprojeto" value={professor.nameprojeto || ''}
                   onChange={handleChange} autoComplete="nameprojeto"/>
          </FormGroup>
          <FormGroup>
            <Label for="descricaoprojeto">Descrição do Projeto</Label>
            <Input type="text" name="descricaoprojeto" id="descricaoprojeto" value={professor.descricaoprojeto || ''}
                   onChange={handleChange} autoComplete="descricaoprojeto"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/professores">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default ProfessorEdit;
