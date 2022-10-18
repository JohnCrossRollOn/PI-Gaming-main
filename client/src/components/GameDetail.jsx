import React, { useEffect } from "react";
import { getGameDetail, skeleGame } from "../global/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Style from "../styles/GameDetail.module.css"

const GameDetail = ()=>{
    const {id} = useParams();
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(skeleGame());
        dispatch(getGameDetail(id))
    },[dispatch, id])

    const game = useSelector(state=> state.game);
    return <div>
        {
        game!==null?<>
            <Link to="/videogames"><span>Go Back↩</span></Link>
            <hr/>
            <div className={Style.Page}>
            <div className={Style.Data}>
                <div style={{display: "flex", flexDirection:"row", justifyContent:"left"}}>
                    {game.launch_date && <h2>{game.launch_date.split('-')[0]},_</h2>} 
                    {game.name && <h2>{game.name}</h2>}
                </div>
                <p>{`Rating: ${game.rating}`}</p>
                <br/>
                <p>{game.description}</p>
                <br/>
                {game.platforms && <strong>{game.platforms.map(({name})=>name).join(', ')}</strong>}
            </div>
            <div className={Style.imageContainer}>
                <img className={Style.image} src={game.thumbnail} alt="una fotito del jueguito"/>
                <strong>{game.genres && game.genres.map(({name})=>name).join(', ')}</strong>
            </div>
        </div>
        </>
    :
    <h1>...</h1>
    }
</div>
}

export default GameDetail