import React from "react";
import { useSelector } from "react-redux";

const Platforms = ()=>{
    const platforms = useSelector(state=>state.platforms)
    return <>
        <ul className="unordered_list drop">
            {platforms.length<1?<li className="loading_form_title"><div/></li>:platforms.map(platform=><li className="list_item" key={platform.id}><p>{platform.name}</p></li>)}
        </ul>
    </>
};

export default Platforms