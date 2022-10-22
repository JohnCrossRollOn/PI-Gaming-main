import './App.css';
import {Route, Switch} from "react-router-dom"
import React from 'react';
import Videogames from './components/Videogames';
import NavigationBar from './components/NavBar';
import GameDetail from './components/GameDetail';
import Home from './components/Home';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGames, getGenres, getPlatforms } from './global/actions';
import Genres from './components/Genres';
import Platforms from './components/Platforms';
import CreateVideogame from './components/CreateVideogame';

const App = () => {
  const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch(getGames());
    dispatch(getGenres());
    dispatch(getPlatforms())
  }, [dispatch]);

  return <div className="App bg">
    <Switch>
      <Route exact path="/"component={Home}/>
      <Route path="/">
        <Route path="/" component={NavigationBar}/>
        <Switch>
          <Route path="/videogames" component={Videogames}/>
          <Route path="/videogame/:id" component={GameDetail}/>
          <Route path="/genres" component={Genres}/>
          <Route path="/platforms" component={Platforms}/>
          <Route path="/create" component={CreateVideogame}/>
        </Switch>
      </Route>
    </Switch>
  </div>
}

export default App;
