import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) =>{

    return <div>
      <strong>IGDB</strong>
            <NavLink to="/">
              <button>Home</button>
            </NavLink>
            <NavLink to="/videogames">
              <button>Videogames</button>
            </NavLink>
            <button>Genres</button>
            <button>AddGame</button>
        <hr/>
    </div>
}

export default NavBar;