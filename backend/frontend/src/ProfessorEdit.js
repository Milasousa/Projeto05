import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label,Alert } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';


const ProfessorEdit = () => {
  const initialFormState = {
    name: '',
    email: '',
    funcao: ''
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

  const title = <h2>{professor.id ? 'Editar Professor' : 'Adicionar Professor'}</h2>;

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
            <Label for="email">email</Label>
            <Input type="email" name="email" id="email" value={professor.email || ''}
                   onChange={handleChange} autoComplete="email"/>
          </FormGroup>
            <FormGroup>
            <Alert severity="info">Tipos de Função para Professor: ESTAGIO, JUNIOR, PLENO, SENIOR, MASTER</Alert>
              <Label for="funcao">Função </Label>
              <select name="funcao" id="funcao" value={professor.funcao || ''}
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
            <Button color="secondary" tag={Link} to="/professores">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default ProfessorEdit;
