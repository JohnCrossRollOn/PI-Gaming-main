import React,{ useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveFilterBar } from "../global/actions";

const Dropdown = (props)=>{
    const dispatch = useDispatch();
    const isActive = useSelector(state=>state.filterbar).some(filter=>props.type in filter);
    const filterbar = useSelector(state=>state.filterbar);
    const isSelected = (option)=>filterbar.some(filter=>option===filter[props.type]);

    return <select 
    defaultValue={''} 
    onChange={event=>dispatch(saveFilterBar({[props.type]: event.target.value}))} 
    style={{height: "max-content"}}>

        <option value="" disabled hidden>{props.placeholder}</option>

        {props.options.map(option=><option id={option} key={option} style={isSelected(option)?{backgroundColor: "gray", color: "white"}:{}}>
            {option}
        </option>)}

    </select>
};

export default Dropdown