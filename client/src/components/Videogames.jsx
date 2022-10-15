import React from 'react';
import GameCards from "./GameCards";
import Pagination from './Pagination';
import VideoOptions from "./VideoOptions";
import Style from "../styles/Videogames.module.css"

const Videogames = (props) => {
    return <div className={Style.Videogames}>
        <div className={Style.VideoOptions}>
            <VideoOptions/>
        </div>
        <div className={Style.Page}>
            <GameCards/>
            <hr/>
            <Pagination/>
        </div>
    </div>
};

export default Videogames;