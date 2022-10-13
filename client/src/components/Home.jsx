import React, { useState } from "react";
import Games from "./Games";
import GamesSettings from "./GamesSettings";

const Home = (props) => {
    const [page, setPage] = useState(0);
    return <>
        <GamesSettings setPage={setPage} page={page}/>
        <Games filters={"filters"} page={page}/>
    </>
};

export default Home;