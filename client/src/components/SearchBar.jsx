import React,{ useEffect, useState, useCallback } from "react";
import { getGames, searchGames, setPage, saveSearchBar } from "../global/actions";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = (props)=>{
    const placeholder = 'search game';
    const savedSearchBar = useSelector(state=>state.searchbar);
    const dispatch = useDispatch();
    
    const [SearchBar, setSearchBar] = useState(savedSearchBar.state!==''?savedSearchBar:{
        state: 'blank',
        query: placeholder,
        input: ''
    })
    const save = useCallback(
        ()=>dispatch(saveSearchBar(SearchBar))
        , [dispatch, SearchBar]);

    const blank = useCallback(()=>{
        dispatch(getGames());
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
        dispatch(searchGames(SearchBar.input));
        save();
        setSearchBar(bar=>({...bar, state:param?'typing':'entered', query: bar.input, input: param?bar.input:''}))
    }
    , [dispatch, save, setSearchBar, SearchBar.input]);

    useEffect(() => {
        const delayedSearch = setTimeout(()=>SearchBar.input!==''&&SearchBar.state==='typing'?entered(true):null, 1000)
        return () => {
            clearTimeout(delayedSearch);
            save();
        }
    }, [SearchBar.input, SearchBar.state, entered, save, blank])

    return <div>
        <input autoFocus 
        onKeyDown={event=>event.key==='Enter'&&SearchBar.input!==''?entered():event.key==='Escape'?blank():null} 
        value={SearchBar.input} 
        onChange={event=>typing(event)} 
        type="text" 
        name="search" 
        id="search" 
        placeholder={SearchBar.query}></input>
        {SearchBar.state==='typing'?<button style={{backgroundColor:"lightgreen"}} onClick={entered}>&#x1F50E;&#xFE0E;</button>:
        SearchBar.state==='entered'?<button style={{backgroundColor:"crimson"}} onClick={blank}>{'\u2A2F'}</button>:null}
    </div>
};

export default SearchBar;