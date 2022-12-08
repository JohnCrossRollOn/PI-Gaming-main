import React, { useEffect, useState } from "react";
import { getGameDetail } from "../global/actions";
import { useParams, Link } from "react-router-dom";
import ThereIsNothing from "./ThereIsNothing";
import SkeleDetail from "./SkeleDetail";

const GameDetail = () => {
  const [game, setGame] = useState({ skeleton: true });
  const { id } = useParams();

  useEffect(() => {
    getGameDetail(id).then((data) => setGame(data));
  }, []);

  return (
    <div className="drop">
      {game !== null ? (
        <>
          <Link to="/videogames" className="goback drop">
            <p className="goback_button">Go Back↩</p>
          </Link>
          {game.skeleton ? (
            <SkeleDetail />
          ) : (
            <div className="form">
              <div className="form_content">
                <div className="form_title">
                  {game.launch_date && (
                    <span>
                      {game.launch_date.split("-")[0] + ", " + game.name}
                    </span>
                  )}
                </div>
                <div className="form_paragraph">
                  <p style={{ fontStyle: "italic", fontWeight: "bolder" }}>
                    {game.genres &&
                      game.genres.map(({ name }) => name).join(", ")}
                  </p>
                  <br />
                  <p>{game.description}</p>
                  <br />
                  <p style={{ fontSize: "1.5rem" }}>
                    {["☆", "☆", "☆", "☆", "☆"]
                      .fill("★", 0, Math.floor(game.rating))
                      .join("") +
                      " " +
                      `[${game.rating}]`}
                  </p>
                </div>
              </div>
              <div className="form_card">
                <img src={game.thumbnail} alt="una fotito del jueguito" />
                <p>{game.launch_date}</p>
                {game.platforms && (
                  <ul>
                    {game.platforms.map(({ name }) => (
                      <li>{name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <ThereIsNothing />
      )}
    </div>
  );
};

export default GameDetail;
