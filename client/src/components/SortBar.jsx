import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSortBar } from "../global/actions";

const SortBar = ({settings})=>{
    const dispatch = useDispatch();
    const saved = useSelector(state=>state.sortbar);

    const [sortBar, setSort] = useState(saved);

    return <div>
        {settings.map(setting=>{
        const isActive = setting===saved;
        return <button 
        onClick={()=>dispatch(saveSortBar(isActive?'':setting))} 
        key={`${setting}`}
        style={isActive?{backgroundColor: "lightgreen"}:{}}>
            {setting}
        </button>
    })}
    </div>
};

export default SortBar