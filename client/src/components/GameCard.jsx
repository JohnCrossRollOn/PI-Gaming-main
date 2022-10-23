import React, { useState } from "react";
import { Link } from "react-router-dom";

const GameCard = ({game})=>{
    const [imgStyle, setImageStyle] = useState("imgnotloaded")

    return <Link to={`/videogame/${game.id}`} className="card">
            <img
            onLoad={()=>setImageStyle('imgloaded')}
            loading="lazy"
            className={"thumbnail "+imgStyle}
            src={game.thumbnail} alt="Quite possibly, a game."/>
            <div className="card__content">
                <strong className="card__title">{game.name}</strong>
                <p style={{fontStyle:"italic"}}>{['☆','☆','☆','☆','☆'].fill('★', 0, Math.floor(game.rating))}</p>
            </div>
            <div className="card__info">
                <p className="card__description">{game.genres.join(', ')}</p>
            </div>
        </Link>
};

export default GameCard;