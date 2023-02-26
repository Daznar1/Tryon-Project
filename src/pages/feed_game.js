import React from "react";

import Game_header from "../components/game_header";
import Game_info_selection from "../components/game_info_selection";
import About_game_hero from "../components/about_game_hero";
import About_game_title from "../components/feed_game_title";
import Feed_game_filters from "../components/feed_game_filters";
import Feed_game_post from "../components/feed_game_post";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function Feed_game() {
const {id}=useParams();

    return (
        <main className="container-fluid">
            <Game_header game={id} />
            <section className="game_info_selection row d-none d-sm-flex">
            <Link className="col-6 text-center py-3 unselected text-decoration-none " style={{ clipPath: "polygon(0 0, 100% 0, 97% 100%, 0% 100%)"}} to={`/Tryon-Project/about_game/${id}`}><div>
                <p>About the game</p>
            </div>
            </Link>
            <Link className="col-6 text-center py-3 selected text-decoration-none " to={`/Tryon-Project/feed_game/${id}`}><div>
                <p>Find Players</p>
            </div>
            </Link>
        </section>
            <About_game_title />
            <Feed_game_filters />
        </main>
    )

}

export default Feed_game