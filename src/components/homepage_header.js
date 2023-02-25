import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function Homepage_header() {

    useEffect(() => {
        AOS.init();
      }, [])

    return (
        <header className="header_homepage">
            
            <h1 data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" className="titulo_header_homepage">THE MOMENT TO <br className="d-none d-sm-block"/> <span>START PLAYING</span> IS NOW
            </h1>
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" className="texto_header">Find your <span>new teammates</span> to play with in your next time playing a game.</p>

        </header>
    )
}