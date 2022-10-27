import React,{ useEffect, useState, useCallback } from "react";
import { getGames, searchGames, setPage, saveSearchBar, saveFilterBar } from "../global/actions";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = (props)=>{
    const placeholder = 'search game';
    const savedSearchBar = useSelector(state=>state.searchbar);
    const genres = useSelector(state=>state.genres.map(genre=>genre.name))
    const dispatch = useDispatch();

    
    const [SearchBar, setSearchBar] = useState(savedSearchBar.state!==''?savedSearchBar:{
        state: 'blank',
        query: placeholder,
        input: ''
    })

    const compare = (genre)=>genre.toLowerCase()===SearchBar.input.toLowerCase()
    const isAGenre = genres.some(compare);

    const save = useCallback(
        ()=>dispatch(saveSearchBar(SearchBar))
        , [dispatch, SearchBar]);

    const blank = useCallback(()=>{
        dispatch(getGames());
        document.querySelector(".bg").scrollTo(0,0);
        setSearchBar(bar=>({...bar, state:'blank', input:'', query: placeholder}))
    },[dispatch, setSearchBar])

    const typing = ({target})=>{
        target.value===''&&SearchBar.query!==placeholder&&blank();
        setSearchBar(bar=>({
        ...bar, 
        state:(target.value!==''?'typing':
        bar.query!==placeholder?'entered':
        'blank'), 
        input:target.value}))
    };

    const entered = useCallback(
        (param)=>{
        console.log(isAGenre)
        console.log(genres.filter(compare))
        dispatch(isAGenre?saveFilterBar({genres: genres.filter(compare)[0]}):searchGames(SearchBar.input));

        document.querySelector(".bg").scrollTo(0,0);
        setSearchBar(bar=>({...bar, state:'entered', query: bar.input, input: param?bar.input:''}))
        save();
    }
    , [dispatch, save, setSearchBar, SearchBar.input]);

    useEffect(() => {
        const delayedSearch = setTimeout(()=>SearchBar.input!==''&&SearchBar.state==='typing'?entered(true):null, 1000)
        return () => {
            clearTimeout(delayedSearch);
            save();
        }
    }, [SearchBar.input, SearchBar.state, entered, save, blank])

    return <>
        <input autoFocus autoComplete="off"
        className={props.className}
        onKeyDown={event=>event.key==='Enter'&&SearchBar.input!==''?entered():event.key==='Escape'?blank():null} 
        value={SearchBar.input} 
        onChange={event=>typing(event)} 
        type="text" 
        name="search" 
        id="search" 
        placeholder={SearchBar.query}></input>
        {SearchBar.state==='typing'?<button className="drop searchbar_search" onClick={()=>entered()}>&#x1F50E;&#xFE0E;</button>:
        SearchBar.state==='entered'?<button className="drop searchbar_clear" onClick={blank}>{'\u2A2F'}</button>:<p></p>}
    </>
};

export default SearchBar;