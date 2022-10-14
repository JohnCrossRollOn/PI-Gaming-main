import React, { useEffect } from "react";
import { getGameDetail } from "../global/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const GameDetail = ()=>{
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getGameDetail(id))
    },[dispatch, id])
    const game = useSelector(state=> state.game);
    const { name, description, launch_date, platforms, thumbnail, rating, genres } = game?game:{};
    console.log(platforms)
    return <div style={{display:'flex', justifyContent: "space-evenly"}}>
        {
        game!==null?<><div>
            <h2>{`${launch_date.split('-')[0]}, ${name}`}</h2>
            <p>{`Rating: ${rating}`}</p>
            <p>{description}</p>
            <strong>{platforms.map(({name})=>name).join(', ')}</strong>
        </div>
        <div style={{display: "flex", flexDirection:"column"}}>
            <img style={{width:"500px", height: "500px"}}src={thumbnail} alt="una fotito del jueguito"/>
            <strong>{genres.map(({name})=>name).join(', ')}</strong>
        </div></>
    :
    <p>Todo mal, mala URL, osea 404 NotFaun</p>
    }
</div>
}

export default GameDetail