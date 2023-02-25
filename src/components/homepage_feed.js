import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function Homepage_feed() {

    useEffect(() => {
        AOS.init();
      }, [])


    return (

        <div className="friends_online">
            <section className="d-none d-lg-block" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back">

                <div className="goto_feed2_2">

                    <div className="text-end">
                        <h3 className="my-4 me-5">Don't have any friends online?</h3>
                        <p className="mb-2 me-5">
                            Afraid not, we are here to help you find a lot of new friends.</p>
                        <p className="mb-2 me-5">Join us and have fun playing with new people online.</p>
                        <p className="mb-4 me-5">Click in the button bellow to go to <span style={{color:"red"}}>Feed</span>.</p>
                    </div>

                    <Link to='/Tryon-Project/feed'><button className="btn btn-primary me-5 mb-4">Go to FEED</button></Link>

                </div>

                <div className="goto_feed2"></div>

            </section>

            <section className="py-5 d-lg-none d-block" style={{backgroundColor : '#211C2A'}}  data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back">
                <div className="text-center mx-auto">
                    <h3 className="fw-semibold">Don't have any friends online?</h3>
                    <div id="goto_feed_2_mobile" style={{fontSize : '0.7rem'}}>
                        <p className="mb-0">
                            Afraid not, we are here to help you find a lot of new friends.</p>
                        <p className="mb-0">Join us and have fun playing with new people online.</p>
                        <p>
                            Click in the button bellow to go to Feed.</p><Link to='/Tryon-Project/feed'><button className="btn btn-primary">Go to FEED</button></Link>
                    </div>
                </div>
            </section>
        </div>

    )
}