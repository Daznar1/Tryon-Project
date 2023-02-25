import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function Discord_hero() {
    useEffect(() => {
        AOS.init();
      }, [])

    return (
       <div data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" className="mt-5" > 
        <section className="hero_go_to_feed2 d-none d-lg-block mt-5 text-center position-relative" style={{borderBottom:"0.3rem red solid"}}>
            <div></div>
            <div>
                <h1>Connect to our discord and join a lot of other players</h1>
                <p>There you can find news abaout games, free games, more friends and a lot more amazing things!</p>
                <a href="https://discord.gg/ZH6fMMhKdN" target={"_blank"}><button className="btn botao_discord">Join Discord group <i className="fab fa-discord ps-1"></i></button></a>
            </div>

        </section>
        <section className="py-5 d-lg-none d-block mt-5" style={{backgroundColor : '#5865f269', borderBottom:"0.3rem red solid"}}>
                <div className="text-center mx-auto">
                    <h3 className="fw-semibold">Connect to our discord and join a lot of other players</h3>
                    <div id="goto_feed_2_mobile" style={{fontSize : '0.7rem'}}>
                        <p className="mb-3">
                        There you can find news abaout games, free games, more friends and a lot more amazing things!</p>
                       <a href="https://discord.gg/ZH6fMMhKdN" target={"_blank"}><button className="btn botao_discord">Join Discord <i className="fab fa-discord ps-1"></i></button></a>
                    </div>
                </div>
            </section>
        </div>
    )

}
