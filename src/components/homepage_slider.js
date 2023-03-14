import React from "react";
import { useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/carrossel_homepage.css'


export default function Homepage_slider() {
    useEffect(() => {
        AOS.init();
      }, [])
    return (

        <div className="slider">
            <div data-aos="fade-up" data-aos-duration="1000" className="container">
                <div className="slide_texto_topo d-none d-sm-flex justify-content-start" id="#div2">
                        <p className="m-0 text-white"><span className="fw-semibold">How to start?</span> Follow this 3 simple steps:</p>
                </div>


                <div className="barra_slide d-none d-sm-block"></div>


                <OwlCarousel className="owl-theme" autoplay={false} autoplaySpeed={500} dragEndSpeed={500} nav navSpeed={500} loop={true} dotsSpeed={700} items={1}>

                    
                    <section className="slide">
                        <section className="slide_1 pe-md-0 py-5 pt-md-0 pb-md-5 row">
                            <div className="col-12 col-md-8 px-0 ps-md-5 justify-content-center d-flex flex-column text-center text-md-start">


                                <h3 className="fw-semibold w-100 mt-1 mb-1 fw-lighter">Create your account</h3>
                                <hr className="mx-auto ms-md-0" />
                                <p className="mt-1 mx-auto ms-md-0">Find new teammates and friends here so you don't have to play alone no more.
                                    You can have a lot more fun while playing together with a friend, and that's possible here for free!</p>


                                <Link className="btn btn-primary mt-3 mx-auto ms-md-0" to="/Tryon-Project/sign_up">Create account</Link>
                            </div>

                            <div className="background_retangulo d-none d-md-block">
                                <div className="retangulo"></div>
                            </div>

                        </section>
                        <div className="d-none d-md-block background_retangulo_lado"></div>
                    </section>

                    <section className="slide">
                        <section className="slide_2 pe-md-0 py-5 pt-md-0 pb-md-5 row">
                            <div className="col-12 col-md-8 px-0 ps-md-5 justify-content-center d-flex flex-column text-center text-md-start">


                                <h3 className="fw-semibold w-100 mt-1 mb-1 fw-lighter">Find new teammates</h3>
                                <hr className="mx-auto ms-md-0" />
                                <p className="mt-1 mx-auto ms-md-0">You can have a lot more fun while playing together with a friend, and that's possible here for free!</p>


                                <Link to='/Tryon-Project/feed' className="btn btn-primary mt-3 mx-auto ms-md-0">Go to Feed</Link>
                            </div>

                            <div className="background_retangulo d-none d-md-block">
                                <div className="retangulo"></div>
                            </div>

                        </section>
                        <div className="d-none d-md-block background_retangulo_lado"></div>
                    </section>

                    <section className="slide">
                        <section className="slide_3 pe-md-0 py-5 pt-md-0 pb-md-5 row">
                            <div className="col-12 col-md-8 px-0 ps-md-5 justify-content-center d-flex flex-column text-center text-md-start">


                                <h3 className="fw-semibold w-100 mt-1 mb-1 fw-lighter">Have fun together</h3>
                                <hr className="mx-auto ms-md-0" />
                                <p className="mt-1 mx-auto ms-md-0">You can enjoy your online games alot more with new friends who can join you and make your gaming more fun and enjoyable.</p>


                                <Link to="/Tryon-Project/game_list" className="btn btn-primary mt-3 mx-auto ms-md-0">Explore Games</Link>
                            </div>

                            <div className="background_retangulo d-none d-md-block">
                                <div className="retangulo"></div>
                            </div>

                        </section>
                        <div className="d-none d-md-block background_retangulo_lado"></div>
                    </section>
                  
                </OwlCarousel>
            </div>
        </div>
    )
}