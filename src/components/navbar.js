import React, { Component } from "react";
import logo from "../imgs/logo/logo_branco.png"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { useEffect } from "react";

export default function Navbar1() {
    useEffect(() => {

        let nav = document.querySelector("nav");
        window.addEventListener("scroll", () => {
            if (document.documentElement.scrollTop > 1) {
                nav.classList.add("sticky");
            } else {
                nav.classList.remove("sticky");
            }
        })


    }, [])

    return (
      
        <div>
            <nav className="navbar d-none d-md-block navbar-expand-md navbar-dark position-fixed w-100">

                <div className="container-fluid px-0 w-100">

                    <div className="collapse navbar-collapse justify-content-md-center">

                        <ul id="nav_menu_pc" className="navbar-nav">

                            <Link to="/Tryon-Project/game_list"  style={{textDecoration: 'none'}}><li className="nav-item"><button className="botao2 mr-2"><span
                                className="botao2_conteudo">&nbsp;GAMES&nbsp;</span></button></li></Link>

                            <Link to='/Tryon-Project/feed' style={{textDecoration: 'none'}}><li className="nav-item"><button className="botao2 mx-3"><span
                                className="botao2_conteudo">&nbsp;&nbsp;&nbsp;FEED&nbsp;&nbsp;&nbsp;</span></button></li></Link>

                            <li className="nav-item">

                                <Link to="/Tryon-Project/home" style={{textDecoration: 'none'}}><div className="div_logo_1">
                                    <div className="div_logo_2">
                                        <img src={logo} style={{ width: '57%', marginTop: '1.2rem' }} />
                                    </div>
                                </div></Link>

                            </li>

                            <Link to="/Tryon-Project/sign_in" style={{textDecoration: 'none'}}><li className="nav-item"><button className="botao1 mx-3"><span className="botao1_conteudo">SIGN IN</span></button></li></Link>
                            <Link to="/Tryon-Project/sign_up" style={{textDecoration: 'none'}}><li className="nav-item"><button className="botao1 ml-2"><span className="botao1_conteudo">SIGN UP</span></button></li></Link>

                        </ul>

                    </div>
                </div>
            </nav>

            <nav id="nav_mobile" className="d-block d-md-none navbar-dark">

                <div className="float-start">
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_toogle"
                        aria-controls="navbar_toogle" aria-expanded="false" aria-label="Toggle navigation"><span
                            className="navbar-toggler-icon"></span></button>
                </div>

                <Link to="/Tryon-Project/home" ><img id="logo_nav_sm" src={logo} /></Link>

                <div className="d-md-none container-fluid mx-0 px-0 collapse" id="navbar_toogle">

                    <ul className="bg-white text-dark">

                        <Link to="/Tryon-Project/game_list" style={{textDecoration: 'none'}} className="nav_mobile_menu_list">
                            <div className="nav-item py-2">GAMES</div>
                        </Link>
                        <Link to='/Tryon-Project/feed' style={{textDecoration: 'none'}} className="nav_mobile_menu_list" >
                            <div className="nav-item py-2">FEED</div>
                        </Link>
                        <Link to="/Tryon-Project/sign_in" style={{textDecoration: 'none'}} className="nav_mobile_menu_list" >
                            <div className="nav-item py-2">SIGN IN</div>
                        </Link>
                        <Link to="/Tryon-Project/sign_up" style={{textDecoration: 'none'}} className="nav_mobile_menu_list">
                            <div className="nav-item py-2">SIGN UP</div>
                        </Link>
                    </ul>
                </div>
            </nav>

        </div>
 
    )
}

