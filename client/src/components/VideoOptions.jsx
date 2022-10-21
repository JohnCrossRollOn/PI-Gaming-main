import React from "react";
import SearchBar from "./SearchBar";
import CurrentFilters from "./CurrentFilters";
import SortBar from "./SortBar";
import { useDispatch, useSelector } from "react-redux";
import FilterDropdown from "./FilterDropdown";
import { clearConstraints } from "../global/actions";

const sort_options = [
    {name:'A-Z ⬇',
     setting: (a,b)=>a.name>b.name?1:a.name<b.name?-1:0
    },
    {name:'A-Z ⬆',
    setting: (a,b)=>a.name>b.name?-1:a.name<b.name?1:0
    },
    {name:'Rating ⬇',
    setting: (a,b)=>a.rating>b.rating?-1:a.rating<b.rating?1:0
    }, 
    {name:'Rating ⬆',
    setting: (a,b)=>a.rating>b.rating?1:a.rating<b.rating?-1:0
    }
];

const VideoOptions = ()=>{
    const dispatch = useDispatch();
    const genres = useSelector(state=>state.genres.map(genre=>genre.name))
    const {filterbar, sortbar} = useSelector(state=>state)
    return <div>
        <SearchBar/>
        <hr/>
        <div style={{display: "flex", alignItems:"center", justifyContent:"space-evenly"}}>
            <FilterDropdown placeholder='Source' type='source' options={['db', 'api']}/>
            <FilterDropdown placeholder='Genre' type='genres' options={genres}/>
        </div>
        <SortBar 
        options={sort_options}/>
        <hr/>
        {[(filterbar.length>0 || sortbar.name!=='') && <button key={'clear-constraints'} style={{height: "max-content", backgroundColor:"crimson"}} onClick={()=>dispatch(clearConstraints())}>Clear Filters &times;</button>]}
        <CurrentFilters/>
    </div>
};

export default VideoOptions;