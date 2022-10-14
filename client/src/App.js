import './App.css';
import {Route, Switch} from "react-router-dom"
import React from 'react';
import Videogames from './components/Videogames';
import NavigationBar from './components/NavBar';
import GameDetail from './components/GameDetail';
import Home from './components/Home.jsx'


const App = () => <div className="App">
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/">
        <Route path="/" component={NavigationBar}/>
        <Switch>
          <Route path="/videogames" component={Videogames}/>
          <Route path="/videogame/:id" component={GameDetail}/>
        </Switch>
      </Route>
    </Switch>
    </div>;

export default App;
