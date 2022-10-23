import React from 'react';
import GameCards from "./GameCards";
import VideoOptions from "./VideoOptions";

const Videogames = () => {

    return <div className='videogames'>
            <VideoOptions/>
            <GameCards/>
    </div>
};

export default Videogames;