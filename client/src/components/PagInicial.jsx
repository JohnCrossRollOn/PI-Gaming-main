import React from "react";
import { Link } from "react-router-dom";
import { Welcome } from '../styles/PagInicial.module.css'

const PagInicial = (props)=>{
    return <div className={Welcome}>
        <p>Proyecto Individual IGDB</p>
        <Link to={"home"}>
            <button>
                home
            </button>
        </Link>
    </div>
};

export default PagInicial;