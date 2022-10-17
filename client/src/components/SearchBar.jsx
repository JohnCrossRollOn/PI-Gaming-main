import React,{ useEffect, useState, useCallback } from "react";
import { getGames, setPage, saveSearchBar } from "../global/actions";
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
    const save = ()=>dispatch(saveSearchBar(SearchBar));
    
    const search = useCallback(()=>{
        dispatch(setPage(0));
        dispatch(getGames(SearchBar.input));
        save();
    },[dispatch, SearchBar])
    
    const blank = ()=>{
        dispatch(getGames());
        setSearchBar(bar=>({...bar, state:'blank', input:'', query: placeholder}))
    };
    const typing = ({target})=>{
        setSearchBar(bar=>({
        ...bar, 
        state:(target.value!==''?'typing':
        bar.query!==placeholder?'entered':
        'blank'), 
        input:target.value}))
    };
    const entered = ()=>{
        dispatch(setPage(0));
        dispatch(getGames(SearchBar.input));
        save();
        setSearchBar(bar=>({...bar, state:'entered', query: bar.input, input: ''}))
    };

    useEffect(() => {
        const delayedSearch = setTimeout(()=>SearchBar.state!=='entered'&&SearchBar.input!==''?search():null, 1000)
        return () => {
            clearTimeout(delayedSearch);
            save();
        }
    }, [search, dispatch])

    return <div>
        <input autoFocus 
        onKeyDown={event=>event.key==='Enter'&&SearchBar.input!==''?entered():null} 
        value={SearchBar.input} 
        onChange={event=>typing(event)} 
        type="text" 
        name="search" 
        id="search" 
        placeholder={SearchBar.query}></input>
        {SearchBar.state==='typing'?<button onClick={entered}>Search</button>:
        SearchBar.state==='entered'?<button onClick={blank}>x</button>:null}
    </div>
};

export default SearchBar;