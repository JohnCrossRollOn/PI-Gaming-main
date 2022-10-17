import React from "react";
import { Link } from "react-router-dom";
import Style from "../styles/GameCard.module.css"

const GameCard = ({game})=>{
    return<Link to={`/videogame/${game.id}`} className={Style.GameCard}>
            <button className={Style.GameButton}>
            <div className={Style.GameDiv1}>
                <img 
                loading="lazy" decoding="async" src={game.thumbnail} alt="Probably a game, idk"/>
            </div>
            <div className={Style.GameDiv2}>
                <strong>{game.name}</strong>
                <p>{game.genres.map(({name})=>name).join(', ')}</p>
            </div>
            </button>
        </Link>
};

export default GameCard;