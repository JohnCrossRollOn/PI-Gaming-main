import React from 'react';
import GameCards from "./GameCards";
import Pagination from './Pagination';
import VideoOptions from "./VideoOptions";

const Videogames = (props) => {
    return <>
        <VideoOptions/>
        <hr/>
        <GameCards/>
        <hr/>
        <Pagination/>
    </>
};

export default Videogames;