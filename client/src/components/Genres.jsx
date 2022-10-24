import React from "react";
import { useSelector } from "react-redux";

const Genres = ()=>{
    const genres = useSelector(state=>state.genres)
    return <>
        <ul className="unordered_list drop">
            {genres.length<1?<li className="loading_form_title"><div/></li>
            :genres.sort((a, b)=>a.name-b.name).map(genre=>
            <li className="list_item" key={genre.id}>
                <p className="home-button">{genre.name}</p>
            </li>)}
        </ul>
    </>
};

export default Genres