import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import header_game from "../imgs/headers/fundo_games.png"
import loading from '../imgs/others/loading-img.svg'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import data from "../IGDBdata.json"

export default function Game_header() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [developer, setDeveloper] = useState("");
    const [description, setDescription] = useState("");
    const [verifiedDscription, setVerifiedDscription] = useState("");
    const [genre, setGenre] = useState("");
    const [platforms, setPlatforms] = useState("");
    const [img, setImg] = useState("");
    const [bg, setBG] = useState();

    
    if (description == "") {

        data.forEach(element => {
            switch (id) {
                case element.name:
                    setTitle(element.name)
                    setDeveloper(element.involved_companies[0].name)
                    setDescription(element.summary)
                    

                    if(window.innerWidth < 728){
                        if(element.summary.split(' ').length >= 70){
                            let shortDescription = element.summary.split(' ').slice(0,70).join(' ') + "..."
                            setDescription(shortDescription)
                        }
                    }

                    for(let i= 0; i<element.genres.length; i++){
                        if (i === 0){
                            setGenre(oldArray => [...oldArray, <a key={element.genres[i].id}>{element.genres[i].name}</a>])
                        }else{
                            setGenre(oldArray => [...oldArray, <a key={element.genres[i].id}> | {element.genres[i].name}</a>])
                        }
                    }

                    setImg(element.cover.url.replace("t_thumb", "t_cover_big"))


                    if (element.platforms == undefined) {
                        setPlatforms("No information to display.")
                    } else {
                        for(let i= 0; i<element.platforms.length; i++){
                            if (i === 0){
                                setPlatforms(oldArray => [...oldArray, element.platforms[i].name])
                            }else{
                                setPlatforms(oldArray => [...oldArray, ` | ${element.platforms[i].name}`])
                            }
                        }
                    }


                    if (element.screenshots == undefined) {
                        setBG(header_game)
                    } else {
                        setBG(element.screenshots[Math.floor(Math.random() * element.screenshots.length)].url.replace("t_thumb", "t_1080p"))
                    }
            }
        })

       

    }
        
        
        

       
        
    

   


    if (img === "") {
        return (
            <header className="header_game d-flex justify-content-center align-items-center">
            <img style={{ padding: '4rem' }} src={loading} alt="Capa Jogo" />
            </header>
        )
    } else {
        return (
            <header className="header_game">


                <div className="background_jogo_header" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 115%), url(${bg})` }}></div>

                <div className="conteudo_jogo_header row align-items-center justify-content-center">
                    <figure className="col-12 col-lg-5 capa_jogo_header text-lg-end">
                        <img className="imagem_capa_jogo_header" src={img} alt="Capa Jogo" />

                    </figure>
                    <article className="col-12 col-lg-7">

                    <h1 className="titulo_jogo_header my-2 text-center text-lg-start mt-lg-0">{title}</h1>
                    <h2 className="subtitulo_jogo_header text-center text-lg-start">{developer}</h2>

                        <p className="texto_jogo_header mx-0">{description}</p>
                        <div className="texto_jogo_header"><span>Genre</span>: {genre}</div>
                        <div className="texto_jogo_header"><span>Platforms</span>: {platforms}
                        </div>

                        <Link style={{width: "fit-content"}} className="btn btn-primary mt-4 d-block mx-auto mx-lg-0" to={`/Tryon-Project/feed_game/${id}`}>Find Players</Link>
                    </article>

                </div>

            </header>
        )
    }



}

