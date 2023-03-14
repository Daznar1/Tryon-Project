import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';


export default function About_game_hero() {

    return (
        <section className="hero_go_to_feed my-5 text-center position-relative">
            <div></div>
            <div>
                <h1>Need someone to play with you?</h1>
                <Link to='/Tryon-Project/feed'><button className="btn btn-primary">Find Players</button></Link>
            </div>

        </section>
    )

}
