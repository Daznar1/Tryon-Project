import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from 'react-router-dom';
import React from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default  function ERROR404(){

    useEffect(() => {
        AOS.init();
      }, [])


    return(
    <section data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-in-back" style={{color:"white", fontSize:"5rem", height:"80vh", display:"flex", alignItems:"center"}}>
        <div className="text-center mx-auto">
        <h2 style={{opacity:"40%"}}>GAME OVER</h2>   
        <h1 className='error404'>ERROR:404</h1>
        <h5 style={{opacity:"40%"}}>Something went wrong...</h5>
        <Link className="btn btn-primary" to="/Tryon-Project/home">Go to Homepage</Link>
        </div>
    </section>
    )
}
