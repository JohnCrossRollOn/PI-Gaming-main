import React from "react";
import { Link } from "react-router-dom";
import Style from "../styles/GameCard.module.css"

const GameCard = ({game})=>{
    return<Link to={`/videogames/${game.id}`} className={Style.GameCard}>
            <button>
            <div>
                <img src={game.thumbnail} style={{width:"200px", height:"200px", margin: 0}} alt="Probably a game, idk"/>
                <hr/>
            </div>
            <div>
                <strong>{game.name}</strong>
                <p>{game.genres.map(genre=>genre.name).join(', ')}</p>
            </div>
            </button>
        </Link>
};

export default GameCard;