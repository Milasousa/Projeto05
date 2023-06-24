import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table,Alert } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ProjetoList extends Component {

    constructor(props) {
        super(props);
        this.state = {projetos: []};
    }

    componentDidMount() {
        fetch('/projetos')
            .then(response => response.json())
            .then(data => this.setState({projetos: data}));
    }

    async remove(id) {
        await fetch(`/projetos/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProjetos = [...this.state.projetos].filter(i => i.id !== id);
            this.setState({projetos: updatedProjetos});
        });
    }

    render() {
        const {projetos} = this.state;

        const projetoList = projetos.map(projeto => {
            return <tr key={projeto.id}>
                <td>{projeto.id}</td>
                <td>{projeto.nameprojeto}</td>
                <td>{projeto.descricaoprojeto}</td>
                <td>{projeto.name}</td>
                <td>
                    <ButtonGroup>
                        <Button  color="primary" tag={Link} to={"/professores/" + projeto.id}>Editar</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/professores" >Adicionar Projetos</Button>
                        <Alert severity="info">Para adicionar um projeto, será necessário associar a um professor existente ou criar.</Alert>
                    </div>
                    <h3>Projetos</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">Código</th>
                            <th width="30%">Nome</th>
                            <th width="30%">Descrição</th>
                            <th width="30%">Professor</th>
                            <th width="30%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projetoList}
                        </tbody>
                    </Table>
                    <Button color="secondary" tag={Link} to="/" >Voltar</Button>
                </Container>
            </div>
        );
    }
}

export default ProjetoList;