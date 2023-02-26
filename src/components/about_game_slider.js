import React from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import data from "../IGDBdata.json"




export default function About_game_slider(props) {

    const id = props.game
    const [img, setImg] = useState("");
    const [art, setArt] = useState("");

    useEffect(() => {

        setImg("")
        setArt("")

        data.forEach(element => {


            switch (id) {

                case element.name:

                    element.screenshots.forEach(scrn => setImg(oldArray => [...oldArray, <figure key={scrn.id} className="mx-1"><img src={scrn.url.replace("t_thumb", "t_1080p")} alt="" /></figure>]))

                    if (element.artworks == undefined) {

                        setArt("");

                    } else {

                        element.artworks.forEach(artw => setArt(oldArray => [...oldArray, <figure key={artw.id} className="mx-1"><img src={artw.url.replace("t_thumb", "t_1080p")} alt="" /></figure>]))

                    }



            }

        });


    }, [props.game])




    const windowWidth = window.innerWidth

    let valor;



    if (windowWidth < 576) {

        valor = 1;

    }



    if (windowWidth >= 576 && windowWidth < 768) {

        valor = 1

    }



    if (windowWidth >= 768 && windowWidth < 1200) {

        valor = 2

    }



    if (windowWidth >= 1200) {

        valor = 3

    }



    if (img !== "") {

        return (


            <div id="game_slider" className="content">



                <div className="game_info_about_container">

                    <div className="game_info_about row">

                        <article className="col-12 col-xl-4 text-center text-xl-start my-0">

                            <h1>Game Media</h1>

                            <hr className="mx-auto ms-xl-0" />

                        </article>

                    </div>



                </div>



                <div className="container-fluid">

                    <OwlCarousel dotsEach={true} items={valor} className="owl-theme">

                        {img}{art}

                    </OwlCarousel>

                </div>

            </div>



        )



    } else {

        <div className="text-center mx-auto">Loading media...</div>

    }






}