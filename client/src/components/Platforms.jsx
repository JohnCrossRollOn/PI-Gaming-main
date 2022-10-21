import React from "react";
import { useSelector } from "react-redux";

const Platforms = ()=>{
    const platforms = useSelector(state=>state.platforms)
    return <div>
        <ul>
            {platforms.map(platform=><li key={platform.id}>{platform.name}</li>)}
        </ul>
    </div>
};

export default Platforms