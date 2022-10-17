import React from "react";
import { useSelector } from "react-redux";
import GameCard from "./GameCard";
import Style from "../styles/Games.module.css"

const GameCards = ()=>{
    const {games, page} = useSelector(state=>state);
    const savedSort = useSelector(state=>state.sortbar);

    const sorter = (a_card, b_card)=>{
        const a = a_card.props.game;
        const b = b_card.props.game;

        const sort = {
            '': 0,
            'A-Z⬇': a.name>b.name?1:a.name<b.name?-1:0,
            'A_Z⬆': a.name>b.name?-1:a.name<b.name?1:0,
            'Rating⬆': a.rating>b.rating?1:a.rating<b.rating?-1:0,
            'Rating⬇': a.rating>b.rating?-1:a.rating<b.rating?1:0
            
        }
        return sort[savedSort]
    }

    return <div className={Style.GamesContainer}>
        <div className={Style.Games}>
            {games.map(
                game=><GameCard game={game} key={game.id}/>
            ).sort(sorter)
            .slice(page*15,page*15+15)}
        </div>        
    </div>
};

export default GameCards;