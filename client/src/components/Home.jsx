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
                <span>Individual Project</span>
            </div>
            <Link to={"/videogames"} className="home-button">
                <div >
                        {'< enter the internet gaming database />'}
                </div>
            </Link>
        </div>
        <div className="myself-logo">
            <a href="https://www.linkedin.com/in/juan-rol%C3%B3n-4b58bb23a/">
            <img loading="lazy" className="henry-png" src="https://pngimg.com/uploads/linkedIn/linkedIn_PNG16.png" alt="HIRE ME"/>
            </a>
        </div>
        <div className="henry-logo">
            <a href="https://www.soyhenry.com/">
            <img loading="lazy" className="henry-png" src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="Henry logo"/>
            </a>
        </div>
        <img className="joystick_icon" src="./joystick.png"/>
    </div>
};

export default Home;