import React from "react";
import { useSelector } from "react-redux";
import GameCard from "./GameCard";
import Style from "../styles/Games.module.css"

const GameCards = ()=>{
  const {games, page} = useSelector(state=>state);

    return <div className={Style.GamesContainer}>
        <div className={Style.Games}>
            {games.map(
                game=><GameCard game={game} key = {game.id}/>
            )
            .slice(page*15,page*15+15)}
        </div>        
    </div>
};

export default GameCards;