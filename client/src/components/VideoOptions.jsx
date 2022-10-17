import React from "react";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";

const VideoOptions = ()=>{

    return <div>
        <SearchBar/>
        <SortBar settings={['A-Z⬇', 'A_Z⬆']}/>
        <SortBar settings={['Rating⬆', 'Rating⬇']}/>
    </div>
};

export default VideoOptions;