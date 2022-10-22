import React from "react";
import { useSelector } from "react-redux";
import GameCard from "./GameCard";
import Pagination from "./Pagination";

const GameCards = ()=>{
    const {display, page} = useSelector(state=>state);

    return <div>
        <Pagination items={display.length}/>
        <ul className="cards">
        {display.length>0 &&
            <>{display.slice(page*15,page*15+15).map(game=><GameCard game={game} key={game.id}/>)}</>
        }
        </ul>
        <Pagination items={display.length}/>
    </div>
};

export default GameCards