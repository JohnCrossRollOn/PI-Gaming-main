import React, { useEffect } from 'react';
import GameCards from "./GameCards";
import VideoOptions from "./VideoOptions";

const Videogames = () => {

    return <div className='videogames'>
        <nav className="videooptions-container">
                <VideoOptions/>
        </nav>
            <GameCards/>
    </div>
};

export default Videogames;