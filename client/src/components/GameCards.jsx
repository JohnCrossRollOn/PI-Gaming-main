import React, { useEffect } from "react";
import { useSelector, useDispatch  } from "react-redux";
import GameCard from "./GameCard";
import Style from "../styles/Games.module.css"
import { setPage } from "../global/actions";
import CurrentFilters from "./CurrentFilters";


const PagiButton = ({page}) => {
    const dispatch = useDispatch();
    const current = useSelector(state=>state.page);
    return <button style={current===page?{backgroundColor:"lightgreen"}:{}} key={page} onClick={()=>dispatch(setPage(page))}>{page+1}</button>
}

const Pagination = ({items}) => {
    const dispatch = useDispatch();
    const current = useSelector(state=>state.page)
    const pages = Math.ceil(items/15);

    const movePage = (page) => {
        dispatch(setPage(page));
        window.scrollTo(0, 0);
    }
    return <>
        {current>=1?<button onClick={()=>movePage(false)}>{'<<<'}</button>:null}
        {Array.from(Array(pages).keys()).map(page=><PagiButton page={page} key={page}/>)}
        {current+1<Math.ceil(items/15)?<button onClick={()=>movePage(true)}>{'>>>'}</button>:null}
    </>
};

const GameCards = ()=>{
    const {display, page} = useSelector(state=>state);

    return <div>
        <CurrentFilters/>
        <hr/>
        <Pagination items={display.length}/>
        <hr/>
        {display.length>0 && <div className={Style.Games}>
            {display.slice(page*15,page*15+15).map(game=><GameCard game={game} key={game.id}/>)}      
        </div>}
        <hr/>
        <Pagination items={display.length}/>
    </div>
};

export default GameCards