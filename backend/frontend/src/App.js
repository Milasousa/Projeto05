import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AlunoList from  "./components/AlunoList";
import AlunoEdit from "./components/AlunoEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={AlunoList}/> 
            <Route path='/alunos/:id' component={AlunoEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;