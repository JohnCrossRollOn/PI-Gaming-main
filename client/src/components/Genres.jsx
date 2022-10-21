import React from "react";
import { useSelector } from "react-redux";

const Genres = ()=>{

    const genres = useSelector(state=>state.genres)
    return <div>
        <ul>
            {genres.map(genre=><li key={genre.id}>{genre.name}</li>)}
        </ul>
    </div>
};

export default Genres