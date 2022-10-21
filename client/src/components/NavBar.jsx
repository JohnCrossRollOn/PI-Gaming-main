import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGames } from '../global/actions';

const NavBar = () =>{
  const dispatch = useDispatch();
  const get = {
    Videogames: ()=>dispatch(getGames())
  }

  const insist = (e) => {
    get[e.target.innerText]()
  }

  return <div>
    <nav>
      <ul style={{display:"flex", justifyContent: "space-evenly"}}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/videogames" onClick={insist}>Videogames</NavLink>
        </li>
        <li>
          <NavLink to="/genres">Genres</NavLink>
        </li>
        <li>
          <NavLink to="/platforms">Platforms</NavLink>
        </li>
        <li>
          <NavLink to="/create">Create Game</NavLink>
        </li>
      </ul>
    </nav>
      <hr/>
  </div>
}

export default NavBar;