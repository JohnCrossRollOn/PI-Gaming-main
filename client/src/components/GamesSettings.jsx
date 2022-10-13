import React,{ useEffect, useState, useCallback } from "react";
import { getGames, setPage } from "../global/actions";
import { useDispatch, useSelector } from "react-redux";

const GamesSettings = (props)=>{
    const [searchInput, setSearchInput] = useState('');
    const [allowSearch, setAllowSearch] = useState(false);
    const dispatch = useDispatch();
    const games = useSelector(state=>state.games.length)
    const { page } = useSelector(state=>state)
    
    const Search = useCallback(()=>{
        console.log('usecallback buscar')
        if (allowSearch) {
            dispatch(setPage(0));
            dispatch(getGames(searchInput));
        }
    },[allowSearch, dispatch, searchInput, setPage])

    useEffect(() => {
        const delayedSearch = setTimeout(Search, 1000)
        return () => clearTimeout(delayedSearch)
    }, [searchInput, Search])

    const SearchAndStay = () => {
        allowSearch?setAllowSearch(false):setAllowSearch(true);
        Search();
        setSearchInput('')
    };
    
    const ClearAndSearch = ()=>{
        setSearchInput('');
        setAllowSearch(true)
        Search();
    }

    return <div>
        <input autoFocus 
        onKeyDown={event=>event.key==='Enter'?SearchAndStay():null} 
        value={searchInput} 
        onChange={(event)=>{
            setSearchInput(event.target.value);
            setAllowSearch(true)
        }} 
        type="text" 
        name="search" 
        id="search" 
        placeholder="Search your game"/>
        <button onClick={()=>SearchAndStay('button')}>Search</button>
        <button onClick={ClearAndSearch}>Clear Search Query</button>
        <hr/>
        {games>0?
        <>
            {page>=1?<button onClick={()=>dispatch(setPage(false))}>Anterior</button>:null}
            <span>  {page+1} de {Math.ceil(games/15)}  </span>
            {page<Math.floor(games/15)?<button onClick={()=>dispatch(setPage(true))}>siguiente</button>:null}
        </>
        :<>
            <span>No Results</span>
            
        </>}
        <hr/>
    </div>
};

export default GamesSettings;