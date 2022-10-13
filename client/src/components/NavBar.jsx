import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) =>{

    return <div>
      <strong>IGDB</strong>
            <NavLink to="/home">
              <button>Home</button>
            </NavLink>
            <button>AddGame</button>
        <hr/>
    </div>
}

export default NavBar;