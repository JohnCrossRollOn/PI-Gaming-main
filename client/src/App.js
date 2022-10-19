import './App.css';
import {Route, Switch} from "react-router-dom"
import React from 'react';
import Videogames from './components/Videogames';
import NavigationBar from './components/NavBar';
import GameDetail from './components/GameDetail';
import Home from './components/Home';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGames, getGenres } from './global/actions';
import Genres from './components/Genres';

const App = () => {
  const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch(getGames());
    dispatch(getGenres())
  }, [dispatch]);

  return <div className="App">
    <Switch>
      <Route exact path="/"component={Home}/>
      <Route path="/">
        <Route path="/" component={NavigationBar}/>
        <Switch>
          <Route path="/videogames" component={Videogames}/>
          <Route path="/videogame/:id" component={GameDetail}/>
          <Route path="/genres" component={Genres}/>
          <Route path="/postgame" component={Home}/>
        </Switch>
      </Route>
    </Switch>
  </div>
}

export default App;
