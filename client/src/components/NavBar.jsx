import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getGames } from '../global/actions';
import NavBrand from "./NavBrand.jsx";

const NavBar = () =>{
  const dispatch = useDispatch();
  const get = {
    Videogames: ()=>dispatch(getGames())
  }

  const insist = (e) => {
    get[e.target.innerText]()
  }

  return <nav className="sticky-top drop">
      <div className="nav">
        <NavLink to="/" style={{textDecoration: "none"}} className="left">
          <NavBrand/>
        </NavLink>
        <NavLink to="/videogames" activeClassName="selected" onClick={insist} className="nav-button">Videogames</NavLink>
        <NavLink to="/genres" activeClassName="selected" className="nav-button">Genres</NavLink>
        <NavLink to="/platforms"activeClassName="selected" className="nav-button">Platforms</NavLink>
        <NavLink to="/create" activeClassName="selected" className="nav-button">Add_Game</NavLink>
      </div>
    </nav>
}

export default NavBar;