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
    const { name, description, launch_date, platforms, thumbnail, rating, genres } = game?game:{};
    return <div>
        {
        game!==null?<>
            <Link to="/videogames"><span>Go Back↩</span></Link>
            <hr/>
            <div className={Style.Page}>
            <div className={Style.Data}>
                <h2>{`${launch_date.split('-')[0]}, ${name}`}</h2>
                <p>{`Rating: ${rating}`}</p>
                <br/>
                <p>{description}</p>
                <br/>
                <strong>{platforms.map(({name})=>name).join(', ')}</strong>
            </div>
            <div className={Style.imageContainer}>
                <img className={Style.image} src={thumbnail} alt="una fotito del jueguito"/>
                <strong>{genres.map(({name})=>name).join(', ')}</strong>
            </div>
        </div>
        </>
    :
    <h1>...</h1>
    }
</div>
}

export default GameDetail