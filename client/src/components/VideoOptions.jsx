import React from "react";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";
import { useSelector } from "react-redux";

const VideoOptions = ()=>{
    const genres = useSelector(state=>state.genres.map(genre=>genre.name))
    return <div>
        <SearchBar/>
        <hr/>
        <FilterBar options={['db', 'api']} type={'source'}/>
        <FilterBar options={genres} type={'genres'}/>
        <hr/>
        <SortBar options={['A-Z⬇', 'A_Z⬆']}/>
        <SortBar options={['Rating⬇', 'Rating⬆']}/>
    </div>
};

export default VideoOptions;