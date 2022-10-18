import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage, getGames } from "../global/actions";

const NavBar = () =>{
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const insist = (path, action)=>{
    dispatch(setPage(0));
    return pathname===path?dispatch((action)()):null
  };
  return <div>
          <NavLink to="/">
            <button>
              <strong>IGDB</strong>
            </button>
          </NavLink>
          <NavLink to="/videogames">
            <button onClick={()=>insist('/videogames',getGames)}>Videogames</button>
          </NavLink>
          <button>Genres</button>
          <button>AddGame</button>
      <hr/>
  </div>
}

export default NavBar;