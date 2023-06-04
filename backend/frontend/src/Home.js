import React from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const Home = () => {
  return (
    <div class="btn-group btn-group-lg" role="group" aria-label="...">
      <AppNavbar/>
        <header>
        <Button ><Link to="/alunos" style={{ textDecoration: 'none', color: "white" }}>Alunos</Link></Button>
        <Button ><Link to="/professores" style={{ textDecoration: 'none', color: "white" }}>Professores</Link></Button>
        </header>
    </div>
  );
}

export default Home;