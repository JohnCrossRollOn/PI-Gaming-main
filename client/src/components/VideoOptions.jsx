import React from "react";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import { clearConstraints, saveFilterBar } from "../global/actions";

const VideoOptions = ()=>{
    const dispatch = useDispatch();
    const genres = useSelector(state=>state.genres.map(genre=>genre.name))
    const {filterbar, sortbar} = useSelector(state=>state)
    return <div>
        <SearchBar/>
        <hr/>
        <div style={{display: "flex", alignItems:"center", justifyContent:"space-evenly"}}>
            <Dropdown placeholder='Source' type='source' options={['db', 'api']}/>
            <Dropdown placeholder='Genre' type='genres' options={genres}/>

            
        </div>
        <SortBar 
        options={[
            {name:'A-Z⬇',
             setting: (a,b)=>a.name>b.name?1:a.name<b.name?-1:0
            },
            {name:'A_Z⬆',
            setting: (a,b)=>a.name>b.name?-1:a.name<b.name?1:0
            },
            {name:'Rating⬇',
            setting: (a,b)=>a.rating>b.rating?-1:a.rating<b.rating?1:0
            }, 
            {name:'Rating⬆',
            setting: (a,b)=>a.rating>b.rating?1:a.rating<b.rating?-1:0
            }]}/>
        <hr/>
        {[(filterbar.length>0 || sortbar.name!=='') && <button key={'clear-constraints'} style={{height: "max-content", backgroundColor:"crimson"}} onClick={()=>dispatch(clearConstraints())}>Clear Filters &times;</button>]}
    </div>
};

export default VideoOptions;