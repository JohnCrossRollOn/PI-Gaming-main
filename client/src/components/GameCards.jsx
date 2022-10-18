import React, { useMemo } from "react";
import { useSelector, useDispatch  } from "react-redux";
import GameCard from "./GameCard";
import { arrayFilter } from "./utils"
import Style from "../styles/Games.module.css"
import { setPage } from "../global/actions";

const PagiButton = ({page}) => {
    const dispatch = useDispatch();
    const current = useSelector(state=>state.page);
    return <button style={current===page?{backgroundColor:"lightgreen"}:{}} key={page} onClick={()=>dispatch(setPage(page))}>{page}</button>
}

const Pagination = ({items}) => {
    const dispatch = useDispatch();
    const current = useSelector(state=>state.page)
    const pages = Math.ceil(items/15);

    const movePage = (page) => {
        dispatch(setPage(page));
        window.scrollTo(0, 0);
    }
    return <div style={{display: "flex", justifyContent: "center"}}>
        {current>=1?<button onClick={()=>movePage(false)}>{'<<<'}</button>:null}
        {/* <span>  {pages>0?`${current+1} de ${Math.ceil(pages/15)}`:'No pages'}  </span> */}
        {Array.from(Array(pages).keys()).slice(current-2>0?(current-2<=pages-6?current-2:pages-5):0, current+3>5?current+3:5).map(key=><PagiButton page={key}/>)}
        {current+1<Math.ceil(items/15)?<button onClick={()=>movePage(true)}>{'>>>'}</button>:null}
    </div>
};

const GameCards = ()=>{
    const {games, page, sortbar, filterbar} = useSelector(state=>state);
    const sorter = (a, b)=>{

        const sorting = {
            '': 0,
            'A-Z⬇': a.name>b.name?1:a.name<b.name?-1:0,
            'A_Z⬆': a.name>b.name?-1:a.name<b.name?1:0,
            'Rating⬆': a.rating>b.rating?1:a.rating<b.rating?-1:0,
            'Rating⬇': a.rating>b.rating?-1:a.rating<b.rating?1:0
            
        }
        return sorting[sortbar]
    }
    const ready = useMemo(()=>games
    .filter(game=>arrayFilter(game, filterbar))
    .sort(sorter), [games, filterbar, sortbar, page]);
    
    return <>
        <Pagination items={ready.length}/>
        <div className={Style.GamesContainer}>
            <div className={Style.Games}>
                {ready.slice(page*15,page*15+15).map(game=><GameCard game={game} key={game.id}/>)}
            </div>        
        </div>
        <hr/>
        <Pagination items={ready.length}/>
    </>
};

export default GameCards;