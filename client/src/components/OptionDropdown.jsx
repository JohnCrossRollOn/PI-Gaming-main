import React,{ useState } from "react";

const OptionDropdown = (props)=>{
    const [value, setValue] = useState('')
    
    return <select className={props.className}
        onChange={e=>{
        props.onChange(e);
        setValue('');
    }} value={value} name={props.name}>
        <option value="" disabled hidden>{props.placeholder}</option>
        {props.options.sort().map(option=>option!==''?<option name={props.name} key={option} value={option}>{option}</option>:null)}
    </select>
};

export default OptionDropdown