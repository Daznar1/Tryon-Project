import React from "react";
import { useParams } from "react-router";

export default function About_game_title() {

    const {id}= useParams();

    return (
        <section className="row text-center mx-auto justify-content-center">
            <div className="col-12">
                <h1 className="titulo_jogo_header mt-5 mb-3 text-center">{id}</h1>
                <div className="borda_titulo_jogo_feed"></div>
            </div>
            <div className="text-center mx-auto justify-content-center">
                <h3 className="subtitulo_feed_jogos text-center mx-auto mt-2">Feed</h3>
            </div>

        </section>

    )
}