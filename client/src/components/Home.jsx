import React from "react";
import { Link } from "react-router-dom";
import { Welcome } from '../styles/PagInicial.module.css'

const Home = (props)=>{
    return <div className={Welcome}>
        <p>Proyecto Individual IGDB</p>
        <Link to={"/videogames"}>
            <button>
                Buscar Jueguitos
            </button>
        </Link>
    </div>
};

export default Home;