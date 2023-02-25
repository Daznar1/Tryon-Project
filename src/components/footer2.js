import { render } from "@testing-library/react";
import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import footer_img1 from "../imgs/footer/footer_imagem_1.png"
import footer_img2 from "../imgs/footer/footer_imagem_2.png"
import footer_logo from "../imgs/logo/logo_branco.png"
import Home from "../pages/home";
import Games from "../pages/games";
import About_us from "../pages/about_us";
import Profile_user from "../pages/profile";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth, db } from './firebase'
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";


export default function Footer2() {

    

        return (
           
            <footer className="footer container-fluid ">
            <div className="row justify-content-center m-0">

                <div className="col-3 p-0 text-start d-none d-xl-block align-self-end">
                    <img className="image_footer" src={footer_img1} alt="Imagem Footer" />
                </div>


                <div className="col-12 col-md-8 col-xl-6 text-center align-self-center">
                    <Link  style={{textDecoration: 'none'}} to="/Tryon-Project/home"><img className="logo_footer" src={footer_logo} alt="Tryon" />
                        <div className="retangulo_footer"></div></Link>

                        <div className="row caixa_conteudo_footer">

                            <div className="col-10 my-4 my-md-0 col-md-4">
                                <h1 className="titulo_footer">General</h1>
                                <Link className="text-white"  style={{textDecoration: 'none'}} to="/Tryon-Project/home"><p>Homepage</p></Link>
                                <Link className="text-white"  style={{textDecoration: 'none'}} to="/Tryon-Project/game_list"><p>Games</p></Link>
                            </div>

                            <div className="col-10 my-4 my-md-0 col-md-4">
                                <h1 className="titulo_footer">Social</h1>
                                <Link className="text-white"  style={{textDecoration: 'none'}} to='/Tryon-Project/feed'><p className="text-white">Feed</p></Link>
                                <Link className="text-white"  style={{textDecoration: 'none'}} to={`/Tryon-Project/sign_up`}><p>Register</p></Link>
                            </div>

                            <div className="col-10 my-4 my-md-0 col-md-4">
                                <h1 className="titulo_footer">Help</h1>
                                <Link className="text-white"  style={{textDecoration: 'none'}} to="/Tryon-Project/about_us"><p>Contacts</p></Link>
                                <Link className="text-white"  style={{textDecoration: 'none'}} to="/Tryon-Project/about_us"><p>About Us</p></Link>
                            </div>

                        </div>
                        <div className="retangulo_2_footer"></div>

                        <div className="py-5">
                            <a href="https://twitter.com/" target={"_blank"}><span className="fa-stack fa-2x">
                                <i className="fa-solid fa-circle fa-stack-2x"></i>
                                <i className="fa-brands fa-twitter fa-stack-1x fa-inverse"></i>
                            </span></a>

                            <a href="https://www.facebook.com/" target={"_blank"}><span className="fa-stack fa-2x">
                                <i className="fa-solid fa-circle fa-stack-2x"></i>
                                <i className="fa-brands fa-facebook fa-stack-1x fa-inverse"></i>
                            </span></a>

                            <a href="https://www.instagram.com/" target={"_blank"}><span className="fa-stack fa-2x">
                                <i className="fa-solid fa-circle fa-stack-2x"></i>
                                <i className="fa-brands fa-instagram fa-stack-1x fa-inverse"></i>
                            </span></a>
                        </div>

                </div>

                <div className="col-3 p-0 text-end d-none d-xl-block align-self-end">
                    <img className="image_footer" src={footer_img2}  alt="Imagem Footer" />
                </div>

            </div>

            <div className="copyright_footer">
                <p>Copyrights © 2022 TRYON.</p>
            </div>
             
           </footer>


    );
}

