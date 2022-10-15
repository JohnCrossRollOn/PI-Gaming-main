import React from "react";
import SearchBar from "./SearchBar";

const VideoOptions = ()=>{

    return <div>
        <SearchBar/>
        <button onClick={()=>console.log('hiciste click para ordenar!')}>Ordenar</button>
    </div>
};

export default VideoOptions;