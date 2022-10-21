import React,{ useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveFilterBar } from "../global/actions";

const FilterDropdown = (props)=>{
    const [value, setValue] =useState('')
    const dispatch = useDispatch();
    const filterbar = useSelector(state=>state.filterbar);

    const isActive = filterbar.some(filter=>props.type in filter);
    const isSelected = (option)=>filterbar.some(filter=>option===filter[props.type]);
    
    return <select
    style={isActive?{height: "max-content", backgroundColor: isActive?'lightgreen':'auto'}:{height: "max-content"}}
    onChange={event=>{
        dispatch(saveFilterBar({[props.type]: event.target.value}))
        setValue('')
    }} 
    value={value}>

        <option value="" disabled hidden>{props.placeholder}</option>

        {props.options.map(option=><option id={option} key={option} style={isSelected(option)?{backgroundColor: "gray", color: "white"}:{}}>
            {option}
        </option>)}

    </select>
};

export default FilterDropdown