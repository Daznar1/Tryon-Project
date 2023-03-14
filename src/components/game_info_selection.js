import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";


export default function Game_info_selection() {
    const {id}= useParams();
    return (
        <section className="game_info_selection row d-none d-sm-flex">

            <Link  className="col-6 text-center py-3 selected text-decoration-none "  to={`/Tryon-Project/about_game/${id}`}><div>
                <p>About the game</p>
            </div>
            </Link>

            <Link style={{clipPath:" polygon(3% 0, 100% 0%, 100% 100%, 0% 100%)"}} className="col-6 text-center py-3 unselected text-decoration-none " to={`/Tryon-Project/feed_game/${id}`}><div>
                <p>Find Players</p>
            </div>
            </Link>

        </section>
    )

}