import './App.css';
import {Route, Switch} from "react-router-dom"
import React from 'react';
import PagInicial from './components/PagInicial.jsx';
import NavigationBar from './components/NavBar';
import GameDetail from './components/GameDetail';
import Home from './components/Home.jsx'

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/">
        <PagInicial className="PagInicial"/>
      </Route>
      <Route path="/">
        <Route path="/" component={NavigationBar}/>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/videogames/:id"><GameDetail/></Route>
        </Switch>
      </Route>
    </Switch>
    </div>
  );
}

export default App;
