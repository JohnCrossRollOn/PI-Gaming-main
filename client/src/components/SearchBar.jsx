import React,{ useEffect, useState, useCallback } from "react";
import { getGames, setPage, setSearchBar } from "../global/actions";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = (props)=>{
    const defaultPlaceHolder = 'search game';
    
    const {input, query} = useSelector(state=>state.searchbar)
    const [searchInput, setSearchInput] = useState(input.length>0?input: '');
    const [placeHolder, setPlaceHolder] = useState(query.length>0?query:defaultPlaceHolder);
    const [allowSearch, setAllowSearch] = useState(false);
    const [hasClearButton, setClearButton] = useState(query.length>0);
    const [hasSearchButton, setSearchButton] = useState(false);

    const dispatch = useDispatch();
    const dispatchSearchBar = (input, query) => dispatch(setSearchBar(input, placeHolder===defaultPlaceHolder?'':query));

    const search = useCallback(()=>{
        if (allowSearch) {
            dispatch(setPage(0));
            dispatch(getGames(searchInput));
            dispatchSearchBar(searchInput, placeHolder)
        }
    },[allowSearch, dispatch, searchInput])

    useEffect(() => {
        const delayedSearch = setTimeout(search, 1000)
        return () => {
            clearTimeout(delayedSearch);
            dispatchSearchBar(searchInput, placeHolder);
        }
    }, [searchInput, search, dispatch])

    const enterSearch = () => {
        if (searchInput.length>0){
            setPlaceHolder(searchInput);
            allowSearch?setAllowSearch(false):setAllowSearch(true);
            search();
            setSearchInput('');
            setClearButton(true);
            setSearchButton(false)
        }
    };
    
    const clear = ()=>{
        setSearchInput('');
        setPlaceHolder('search game');
        setAllowSearch(true);
        setClearButton(false);
        setSearchButton(false);
        search()
    }

    return <div>
        <input autoFocus 
        onKeyDown={event=>event.key==='Enter'?enterSearch():null} 
        value={searchInput} 
        onChange={(event)=>{
            setSearchInput(event.target.value);
            setSearchButton(event.target.value!=='');
            setAllowSearch(true)
        }} 
        type="text" 
        name="search" 
        id="search" 
        placeholder={placeHolder}/>
        {hasSearchButton?<button onClick={enterSearch}>Search</button>:
        hasClearButton?<button onClick={clear}>x</button>:null}
        {/* {hasClearButton && <button onClick={clear}>x</button>}
        {hasSearchButton && <button onClick={enterSearch}>Search</button>} */}
    </div>
};

export default SearchBar;