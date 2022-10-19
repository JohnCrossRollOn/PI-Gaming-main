import React from 'react';
import GameCards from "./GameCards";
import VideoOptions from "./VideoOptions";
import Style from "../styles/Videogames.module.css"

const Videogames = () => {
    return <div className={Style.Videogames}>
        <div className={Style.VideoOptions}>
            <VideoOptions/>
        </div>
        <div className={Style.Page}>
            <GameCards/>
        </div>
    </div>
};

export default Videogames;