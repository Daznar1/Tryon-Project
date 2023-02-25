import React from "react";

import Game_header from "../components/game_header";
import Game_info_selection from "../components/game_info_selection";
import About_game_info from "../components/about_game_info";
import About_game_slider from "../components/about_game_slider";
import About_game_hero from "../components/about_game_hero";
import { useParams } from "react-router";

function About_game() {

    

    //if (id=="")

    return (
        <main className="container-fluid">
             
            <Game_header />
            <Game_info_selection />
            <About_game_info />
            <About_game_slider />
            <About_game_hero />
        </main>
    )

}

export default About_game