import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class AlunoList extends Component {

    constructor(props) {
        super(props);
        this.state = {alunos: []};
    }

    componentDidMount() {
        fetch('/alunos')
            .then(response => response.json())
            .then(data => this.setState({alunos: data}));
    }

    async remove(id) {
        await fetch(`/alunos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedAlunos = [...this.state.alunos].filter(i => i.id !== id);
            this.setState({alunos: updatedAlunos});
        });
    }

    render() {
        const {alunos} = this.state;

        const alunoList = alunos.map(aluno => {
            return <tr key={aluno.id}>
                <td>{aluno.name}</td>
                <td>{aluno.email}</td>
                <td>{aluno.funcao}</td>
                <td>{aluno.projeto}</td>
                <td>
                    <ButtonGroup>
                        <Button  color="primary" tag={Link} to={"/alunos/" + aluno.id}>Editar</Button>
                        <Button  color="danger" onClick={() => this.remove(aluno.id)}>Apagar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/alunos/new" >Adicionar Alunos</Button>
                    </div>
                    <h3>Alunos</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Nome</th>
                            <th width="30%">E-mail</th>
                            <th width="20%">Função</th>
                            <th width="30%">Projeto</th>
                            <th width="40%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {alunoList}
                        </tbody>
                    </Table>
                    <Button color="secondary" tag={Link} to="/" >Voltar</Button>
                </Container>
            </div>
        );
    }
}

export default AlunoList;