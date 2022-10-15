import React from "react";
import { setPage } from "../global/actions";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
    const dispatch = useDispatch();
    const games = useSelector(state=>state.games.length)
    const { page } = useSelector(state=>state)

    const movePage = (page) => {
        dispatch(setPage(page));
        window.scrollTo(0, 0);
    }
    return <div style={{display: "flex", justifyContent: "center"}}>
        {page>=1?<button onClick={()=>movePage(false)}>{'<<<'}</button>:null}
        <span>  {games>0?`${page+1} de ${Math.ceil(games/15)}`:'No pages'}  </span>
        {page+1<Math.ceil(games/15)?<button onClick={()=>movePage(true)}>{'>>>'}</button>:null}
    </div>
};

export default Pagination;