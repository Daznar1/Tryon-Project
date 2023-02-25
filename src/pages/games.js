import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import data from "../IGDBdata.json"


export default function Games() {
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => { 
        AOS.init();
    }, [])


    return (

        <main id="header" className="container-fluid mb-5">

            <header className="header_feed">
                <h1 data-aos="fade-up" data-aos-duration="1000" className="titulo_header">GAMES</h1>
                <p data-aos="fade-up" data-aos-duration="1000" className="texto_header"><span>Find your favourite games</span> to play with other teammates and have <span>fun
                    together.</span></p>
            </header>

            <section className="row justify-content-center mx-auto text-center">
                <div className="App ">
                    <input type="search" id='searchbar1' className="searchbar1 mt-5 mb-3" placeholder="Search your game here..."
                        onInput={event => { setSearchTerm(event.target.value); }} />
                    <button className="botao_searchbar d-none d-md-inline"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </section>

            <section className="row mt-3">
                <div className="col-12 w-100 mb-4 borda_filtros_feed"></div>
            </section>

            <section data-aos="fade-up" data-aos-duration="700" className="container">
                {/* <div className='jogos_estilos'> */}
                <div className="lista_games_search row justify-content-center">

                    {
                        data.filter((jogo) => {
                            if (searchTerm == "") {
                                return jogo;
                            } else if (jogo.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return jogo;
                            }
                        }).map((jogo, key) => {
                            return (

                                <Link key={jogo.id} to={`/Tryon-Project/about_game/${jogo.name}`} className="text-decoration-none text-center col-8 col-sm-6 col-md-4 col-lg-3 col-xl-2"><div className="mt-2 mx-3">
                                    <img className="games_jogo img-fluid" src={jogo.cover.url.replace("t_thumb", "t_cover_big")} /><p className="text-white">{jogo.name}</p>
                                </div>
                                </Link>

                            );
                        })}
                </div>
            </section>


        </main>
    )
}