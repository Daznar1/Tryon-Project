import React from "react";

import Game_header from "../components/game_header";
import Game_info_selection from "../components/game_info_selection";
import About_game_info from "../components/about_game_info";
import About_game_slider from "../components/about_game_slider";
import About_game_hero from "../components/about_game_hero";
import { useState } from "react";
import { useParams } from "react-router";

function About_game() {

    const { id } = useParams();
    const [render, setRender] = useState(0)

    if (render != 0) {
        setRender(0)
    }

    function gameClicked() {
        setRender(1)
    }


    return (
        <main className="container-fluid">

            <Game_header game={id} render={render} />
            <Game_info_selection />
            <About_game_info game={id} render={render} handleClick={gameClicked} />
            <About_game_slider game={id} render={render} />
            <About_game_hero />
        </main>
    )

}

export default About_game