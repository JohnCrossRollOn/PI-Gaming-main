import React from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand"

const Home = ()=>{
    return <div className="home-route">
        <div className="drop">
        <Brand/>

        </div>
        <div className="home-route">
            <div className="home-title">
                <p>Individual Project</p>
            </div>
            <Link to={"/videogames"} className="home-button">
                <div >
                        {'< enter the internet gaming database />'}
                </div>
            </Link>
        </div>
        <div className="henry-logo">
            <a href="https://www.soyhenry.com/">
            <img loading="lazy" className="henry-png" src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="Henry logo"/>
            </a>
        </div> 
    </div>
};

export default Home;