import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGames, getGenres } from '../global/actions';
import GameCard from "./GameCard";
import Style from "../styles/Games.module.css"

const Games = ({page})=>{
    const games = useSelector(state=>state.games)
  const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch]);
    
    return <div className={Style.GamesContainer}>
        <div className={Style.Games}>
            {games.map(
                game=><GameCard game={game} key = {game.id}/>
            )
            .slice(page*15,page*15+15)}
        </div>        
    </div>
};

export default Games;