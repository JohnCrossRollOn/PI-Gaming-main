import React,{ useState } from "react";

const OptionDropdown = (props)=>{
    const [value, setValue] = useState('')
    
    return <select onChange={e=>{
        props.onChange(e);
        setValue('');
    }} value={value} name={props.name}>
        <option value="" disabled hidden>{props.placeholder}</option>
        {props.options.map(opt=><option name={props.name} key={opt} value={opt}>{opt}</option>)}
    </select>
};

export default OptionDropdown