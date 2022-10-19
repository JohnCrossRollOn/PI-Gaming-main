import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGames, getGenres } from "../global/actions";

const NavBar = () =>{
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const insist = (path, action)=>{
    return pathname===path?dispatch((action)()):null
  };
  return <div>
    <nav>
      <ul style={{display:"flex", justifyContent: "space-evenly"}}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/videogames" onClick={()=>insist('/videogames',getGames)}>Videogames</NavLink>
        </li>
        <li>
          <NavLink to="/genres" onClick={()=>insist('/genres',getGenres)}>Genres</NavLink>
        </li>
        <li>
          <NavLink to="/postgame" onClick={()=>insist('postgame')}>Create Game</NavLink>
        </li>
      </ul>
    </nav>
      <hr/>
  </div>
}

export default NavBar;