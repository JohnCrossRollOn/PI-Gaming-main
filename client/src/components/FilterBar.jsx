import React from "react";
import { saveFilterBar, setPage } from "../global/actions";
import { useSelector, useDispatch } from "react-redux";

const FilterBar = ({type, options})=>{
    const dispatch = useDispatch();
    const saved = useSelector(state=>state.filterbar);

    return <div>
        {options.map(setting=>{
        const isActive = saved.some(saved=>saved[type]===setting);
        const save = ()=>{
            dispatch(setPage(0))
            dispatch(saveFilterBar({[type]:setting}))
        }
        return <button 
        onClick={save} 
        key={setting}
        style={isActive?{backgroundColor: "lightgreen"}:{}}>
            {setting}
        </button>})}
    </div>
};

export default FilterBar;