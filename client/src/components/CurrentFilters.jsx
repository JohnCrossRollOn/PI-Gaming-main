import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveFilterBar } from "../global/actions";

const CurrentFilters = (props)=>{
    const dispatch = useDispatch();
    const filterbar = useSelector(state=>state.filterbar);
    return <div className={props.className}>
        {filterbar.map(filter=>
            <button className="throw tags" key={Object.entries(filter)[0][1]} onClick={()=>dispatch(saveFilterBar(filter))}> &times; {Object.entries(filter)[0][1]}</button>
        )}
    </div>
}

export default CurrentFilters