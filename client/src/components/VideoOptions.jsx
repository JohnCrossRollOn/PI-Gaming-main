import React from "react";
import SearchBar from "./SearchBar";
import CurrentFilters from "./CurrentFilters";
import SortBar from "./SortBar";
import { useDispatch, useSelector } from "react-redux";
import FilterDropdown from "./FilterDropdown";
import { clearConstraints } from "../global/actions";

const sort_options = [
    {name:'A → Z',
     setting: (a,b)=>a.name>b.name?1:a.name<b.name?-1:0
    },
    {name:'Z → A',
    setting: (a,b)=>a.name>b.name?-1:a.name<b.name?1:0
    },
    {name:'★★★ → ★',
    setting: (a,b)=>a.rating>b.rating?-1:a.rating<b.rating?1:0
    }, 
    {name:'★ → ★★★',
    setting: (a,b)=>a.rating>b.rating?1:a.rating<b.rating?-1:0
    }
];

const VideoOptions = ()=>{
    const dispatch = useDispatch();
    const genres = useSelector(state=>state.genres.map(genre=>genre.name))
    const {filterbar, sortbar} = useSelector(state=>state)

    return <div  className="videooptions-container drop">
        <SearchBar className="searchbar"/>

        <FilterDropdown className="filter_source" placeholder='Source' type='source' options={['db', 'api']}/>
        <FilterDropdown className="filter_genre" placeholder='Genre' type='genres' options={genres}/>

        <SortBar  options={sort_options} className="sort"/>
        {[(filterbar.length>0 || sortbar.name!=='') && <span className="throw clear_filters" key={'clear-constraints'} onClick={()=>{
            dispatch(clearConstraints())
            document.querySelector(".bg").scrollTo(0,0);
        }}>Clear_Settings</span>]}
        <CurrentFilters className="filters"/>
    </div>
};

export default VideoOptions;