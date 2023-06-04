import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label,Alert } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';


const AlunoEdit = () => {
  const initialFormState = {
    name: '',
    email: '',
    funcao: ''
  };
  const [aluno, setAluno] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(['XSRF-TOKEN']);

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/alunos/${id}`)
        .then(response => response.json())
        .then(data => setAluno(data));
    }
  }, [id, setAluno]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setAluno({ ...aluno, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/alunos/${aluno.id ? `/${aluno.id}` : ''}`, {
      method: (aluno.id) ? 'PUT' : 'POST',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(aluno),
      credentials: 'include'
    });
    setAluno(initialFormState);
    navigate('/alunos');
  }

  const title = <h2>{aluno.id ? 'Editar Aluno' : 'Adicionar Aluno'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={aluno.name || ''}
                   onChange={handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="email">email</Label>
            <Input type="email" name="email" id="email" value={aluno.email || ''}
                   onChange={handleChange} autoComplete="email"/>
          </FormGroup>
            <FormGroup>
            <Alert severity="info">Tipos de Função para Aluno: ESTAGIO, JUNIOR, PLENO, SENIOR, MASTER</Alert>
              <Label for="funcao">Função </Label>
              <select name="funcao" id="funcao" value={aluno.funcao || ''}
                   onChange={handleChange} autoComplete="funcao">
                <option value='ESTAGIO'>ESTAGIO</option>
                <option value='JUNIOR'>JUNIOR</option>
                <option value='PLENO'>PLENO</option>
                <option value='SENIOR'>SENIOR</option>
                <option value='SENIOR'>MASTER</option>
              </select>
            </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/alunos">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default AlunoEdit;
