import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { useState } from "react";
import data from "../IGDBdata.json"

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Homepage_games() {

    useEffect(() => {
        AOS.init();
    }, [])

    const [jogo_0, setJogo0] = useState("");
    const [jogo_1, setJogo1] = useState("");
    const [jogo_2, setJogo2] = useState("");
    const [jogo_3, setJogo3] = useState("");
    const [jogo_4, setJogo4] = useState("");
    const [jogo_0Img, setJogo0Img] = useState("");
    const [jogo_1Img, setJogo1Img] = useState("");
    const [jogo_2Img, setJogo2Img] = useState("");
    const [jogo_3Img, setJogo3Img] = useState("");
    const [jogo_4Img, setJogo4Img] = useState("");

    if (jogo_0 === "") {
        setJogo0(data[3]);
        setJogo1(data[14]);
        setJogo2(data[15]);
        setJogo3(data[6]);
        setJogo4(data[7]);
        setJogo0Img(data[3].cover.url.replace("t_thumb", "t_cover_big"))
        setJogo1Img(data[14].cover.url.replace("t_thumb", "t_cover_big"))
        setJogo2Img(data[15].cover.url.replace("t_thumb", "t_cover_big"))
        setJogo3Img(data[6].cover.url.replace("t_thumb", "t_cover_big"))
        setJogo4Img(data[7].cover.url.replace("t_thumb", "t_cover_big"))
    }

    return (

        <section className="jogos_homepage" data-aos="fade-up" data-aos-duration="1000">

            <div className="background_jogos_homepage"></div>

            <div className="content_jogos_homepage">
                <h1>Explore Games</h1>

                <div className="listagem_jogos_homepage row justify-content-center pb-5">

                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0">
                        <Link className="text-white text-decoration-none" to={`/Tryon-Project/about_game/${jogo_0.name}`}><img className="capa_jogo" src={jogo_0Img} alt="Jogo" /><p>{jogo_0.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0">
                        <Link className="text-white text-decoration-none" to={`/Tryon-Project/about_game/${jogo_1.name}`}><img className="capa_jogo" src={jogo_1Img} alt="Jogo" /><p>{jogo_1.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0">
                        <Link className="text-white text-decoration-none" to={`/Tryon-Project/about_game/${jogo_2.name}`}><img className="capa_jogo" src={jogo_2Img} alt="Jogo" /><p>{jogo_2.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0">
                        <Link className="text-white text-decoration-none" to={`/Tryon-Project/about_game/${jogo_3.name}`}><img className="capa_jogo" src={jogo_3Img} alt="Jogo" /><p>{jogo_3.name}</p></Link>
                    </figure>
                    <figure className="col-9 col-sm-4 col-lg-2 mb-3 m-sm-0">
                        <Link className="text-white text-decoration-none" to={`/Tryon-Project/about_game/${jogo_4.name}`}><img className="capa_jogo" src={jogo_4Img} alt="Jogo" /><p>{jogo_4.name}</p></Link>
                    </figure>




                </div>

                <Link to='/Tryon-Project/game_list'><button className="btn btn-primary">See more</button></Link>

            </div>


        </section>

    )
}