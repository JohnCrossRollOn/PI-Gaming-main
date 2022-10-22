import React,{ useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveFilterBar } from "../global/actions";

const FilterDropdown = (props)=>{
    const [value, setValue] =useState('')
    const dispatch = useDispatch();
    const filterbar = useSelector(state=>state.filterbar);

    const isActive = filterbar.some(filter=>props.type in filter);
    
    return <select className={isActive?"active_select":props.className}
    onChange={event=>{
        dispatch(saveFilterBar({[props.type]: event.target.value}));
        setValue('');
        document.querySelector(".bg").scrollTo(0,0);
    }} 
    value={value}>
        <option value="" disabled hidden>{props.placeholder}</option>

        {props.options.map(option=><option id={option} key={option}>
            {option}
        </option>)}

    </select>
};

export default FilterDropdown