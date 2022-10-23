import React from "react";
import { useSelector } from "react-redux";
import GameCard from "./GameCard";
import Pagination from "./Pagination";
import SkeleCard from "./SkeleCard";
import ThereIsNothing from "./ThereIsNothing"

const GameCards = ()=>{
    const {display, page} = useSelector(state=>state);

    return <div className="drop">
        <Pagination items={display.length}/>
        <div className="cards drop">
        {display.length>0?
        display.slice(page*15,page*15+15).map(game=>game['skeleton']?<SkeleCard id={game.id}/>:<GameCard game={game} key={game.id}/>)
        :<ThereIsNothing/>
        }
        </div>
        <Pagination items={display.length}/>
    </div>
};

export default GameCards