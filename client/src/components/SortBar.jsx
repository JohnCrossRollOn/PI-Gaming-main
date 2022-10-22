import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSortBar } from "../global/actions";

const SortBar = (props)=>{
    const dispatch = useDispatch();
    const saved = useSelector(state=>state.sortbar.name);

    return <div className={props.className}>
        {props.options.map(({setting, name})=>{
        const isActive = name===saved;
        return <button 
        className={isActive?"sort_button_active":"sort_button"}
        onClick={()=>{
            dispatch(saveSortBar({name, setting}));
            document.querySelector(".bg").scrollTo(0,0);
        }} 
        key={`${setting}`}>
            {name}
        </button>
    })}
    </div>
};

export default SortBar