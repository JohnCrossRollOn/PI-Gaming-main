import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveFilterBar } from "../global/actions";

const CurrentFilters = ()=>{
    const dispatch = useDispatch();
    const filterbar = useSelector(state=>state.filterbar);
    return <>
        {filterbar.map(filter=>
            <button style={{backgroundColor:"lightgreen"}} onClick={()=>dispatch(saveFilterBar(filter))}>{Object.entries(filter)[0][1]} &times;</button>
        )}
    </>
}

export default CurrentFilters