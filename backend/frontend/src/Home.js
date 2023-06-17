import React from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import logo from './components/4183.jpg';


const Home = () => {
  return (
    <div class="btn-group btn-group-lg" role="group" aria-label="...">
      <AppNavbar/>
        <header>
        <Button ><Link to="/alunos" style={{ textDecoration: 'none', color: "white" }}>ALUNO</Link></Button>
        <Button ><Link to="/professores" style={{ textDecoration: 'none', color: "white" }}>PROFESSOR</Link></Button>
        <Button ><Link to="/projetos" style={{ textDecoration: 'none', color: "white" }}>PROJETO</Link></Button>
        </header>
        <div class="text-center" style={{display:'block'}}>
          <h1 style={{marginTop:"100px", marginLeft:"250px"}}>Bem-Vindo a Plataforma Study</h1>
        <style>{'body { background-color: RGB(230, 232, 230); }'}</style>
        <img src={logo} class="img-fluid" alt="logo"/>
        {/*<a href="https://br.freepik.com/vetores-gratis/rapaz-sentado-na-pilha-de-pastas-com-livros-de-leitura-ilustracao-vetorial-de-esboco-desenhado-a-mao_30138240.htm#query=vintage%20aluno&position=13&from_view=search&track=ais">Imagem de Rochak Shukla</a> no Freepik*/}
        </div>
    </div>
  );
}

export default Home;