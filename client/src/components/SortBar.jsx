import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSortBar } from "../global/actions";

const SortBar = ({options})=>{
    const dispatch = useDispatch();
    const saved = useSelector(state=>state.sortbar.name);

    return <>
        {options.map(({setting, name})=>{
        const isActive = name===saved;
        return <button 
        onClick={()=>dispatch(saveSortBar({name, setting}))} 
        key={`${setting}`}>
            {name}
        </button>
    })}
    </>
};

export default SortBar