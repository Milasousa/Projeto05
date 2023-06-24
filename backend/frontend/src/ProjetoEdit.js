import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';


const ProjetoEdit = () => {
  const initialFormState = {
    nameprojeto: '',
    descricaoprojeto: ''
    };
  const [projeto, setProjeto] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(['XSRF-TOKEN']);

  useEffect(() => {
    if (id !== 'new') {
      fetch(`/projetos/${id}`)
        .then(response => response.json())
        .then(data => setProjeto(data));
    }
  }, [id, setProjeto]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setProjeto({ ...projeto, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/projetos/${projeto.id ? `/${projeto.id}` : `${projeto.professorid}`}`, {
      method: (projeto.id) ? 'PUT' : 'POST',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projeto),
      credentials: 'include'
    });
    setProjeto(initialFormState);
    navigate('/projetos');
  }

  const title = <h2>{projeto.id ? 'Editar Projeto' : 'Adicionar Projeto'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nameprojeto">Nome</Label>
            <Input type="text" name="nameprojeto" id="nameprojeto" value={projeto.nameprojeto || ''}
                   onChange={handleChange} autoComplete="nameprojeto"/>
          </FormGroup>
          <FormGroup>
            <Label for="descricaoprojeto">Descrição</Label>
            <Input type="text" name="descricaoprojeto" id="descricaoprojeto" value={projeto.descricaoprojeto || ''}
                   onChange={handleChange} autoComplete="descricaoprojeto"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/projetos">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default ProjetoEdit;
