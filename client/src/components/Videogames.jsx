import React, { useEffect } from 'react';
import GameCards from "./GameCards";
import GamesSettings from "./GamesSettings";
import { useDispatch } from "react-redux";
import { getGames } from '../global/actions';

const Videogames = (props) => {
const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch(getGames())
  }, [dispatch]);
    return <>
        <GamesSettings/>
        <GameCards/>
    </>
};

export default Videogames;