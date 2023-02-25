import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function Homepage_hero() {
    
    useEffect(() => {
        AOS.init();
      }, [])

    return (
        <section className="hero" data-aos="fade-up" data-aos-duration="1000">
            <div className="background_hero"></div>

            <div className="content_hero">
                <h1>The oportunity to win is here</h1>

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-4 p-0 mt-0 mb-5 mb-md-4 m-lg-0">
                        <span className="fa-stack fa-3x">
                            <i className="fa-solid fa-circle fa-stack-2x"></i>
                            <i className="fa-solid fa-earth-americas fa-stack-1x fa-inverse"></i>
                        </span>
                        <p><span>Connect</span> with other players online.</p>
                    </div>
                    <div className="col-12 col-lg-4 p-0 my-5 my-md-4 m-lg-0">
                        <span className="fa-stack fa-3x">
                            <i className="fa-solid fa-circle fa-stack-2x"></i>
                            <i className="fa-solid fa-microphone fa-stack-1x fa-inverse"></i>
                        </span>
                        <p>Communicate <span>with your</span> new friends.</p>
                    </div>
                    <div className="col-12 col-lg-4 p-0 my-5 my-md-4 m-lg-0">
                        <span className="fa-stack fa-3x">
                            <i className="fa-solid fa-circle fa-stack-2x"></i>
                            <i className="fa-solid fa-trophy fa-stack-1x fa-inverse"></i>
                        </span>
                        <p>Achieve more fun and wins <span>while gaming.</span></p>
                    </div>
                </div>
            </div>

        </section>
    )
}