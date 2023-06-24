import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ProfessorList extends Component {

    constructor(props) {
        super(props);
        this.state = { professores: [] };
    }

    componentDidMount() {
        fetch('/professores')
            .then(response => response.json())
            .then(data => this.setState({ professores: data }));
    }

    async remove(id) {
        await fetch(`/professores/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProfessores = [...this.state.professores].filter(i => i.id !== id);
            this.setState({ professores: updatedProfessores });
        });
    }

    render() {
        const { professores } = this.state;

        const professorList = professores.map(professor => {
            return <tr key={professor.id}>
                <td>{professor.name}</td>
                <td>{professor.email}</td>
                <td>{professor.formacao}</td>
                <td>{professor.funcao}</td>
                <td>
                    <ButtonGroup>
                        <Button color="dark" tag={Link} to={"/projetos/"}>Visualizar</Button>
                    </ButtonGroup>
                </td>
                <td>
                    <ButtonGroup>
                        <Button color="primary" tag={Link} to={"/professores/" + professor.id}>Editar</Button>
                        <Button color="danger" onClick={() => this.remove(professor.id)}>Apagar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar />
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/professores/new" >Adicionar Professores</Button>
                    </div>
                    <h3>Professores</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="30%">Nome</th>
                                <th width="20%">E-mail</th>
                                <th width="20%">Formação</th>
                                <th width="20%">Funcão</th>
                                <th width="10%">Projeto</th>
                                <th width="40%">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professorList}
                        </tbody>
                    </Table>
                    <Button color="secondary" tag={Link} to="/" >Voltar</Button>
                </Container>
            </div>
        );

    }
}

export default ProfessorList;