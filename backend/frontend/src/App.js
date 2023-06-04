import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlunoList from './AlunoList';
import AlunoEdit from './AlunoEdit';
import ProfessorList from "./ProfessorList";
import ProfessorEdit from "./ProfessorEdit";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/alunos" exact={true} element={<AlunoList />} />
        <Route path="/alunos/:id" exact={true} element={<AlunoEdit />} />
        <Route path="/professores" exact={true} element={<ProfessorList />} />
        <Route path="/professores/:id" exact={true} element={<ProfessorEdit />} />
      </Routes>
    </Router>
  )
}

export default App;
