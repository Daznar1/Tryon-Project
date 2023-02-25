import React from "react";
import { useState } from "react";
import logo from "../imgs/logo/logo_branco.png";
import user_photo from "../imgs/users/user_default.png"
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from './firebase'
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";





export default function Navbar_session() {


  let [data, setData] = useState("")

  const navigate_SignOut = useNavigate();


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


  onAuthStateChanged(auth, async (user) => {

    if (user) {
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);

      if (data === "") {
        if (docSnap.exists()) {
          setData(docSnap.data())
        }
      }

    }

  })


  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate_SignOut("/Tryon-Project/home")
    })
      .catch(err => { console.log(err) })
  }

  return (
    <div className="container-fluid">
      <section className="row">
        <nav className="navbar navbar-expand-lg navbar-dark my-0 py-0 position-fixed nav_registered_user">
          <div className="container-fluid ms-0 ps-0">
            <Link to='/Tryon-Project/home' className="poligono_nav_registered_user">
              <div className="navbar-brand d-none d-lg-block poligono_nav_registered_user_interior" >
                <img src={logo} width="80%" />
              </div>
            </Link>
            <Link to='/Tryon-Project/home' className="text-center mx-auto d-lg-none" style={{ width: "50%" }}>
                <img className="logo_nav_mobile_registered" src={logo}/>
            </Link>
            <button className="navbar-toggler p-3" style={{ borderRadius: 0, borderColor: "#ffffff00" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbar3" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i style={{ fontSize: "1.5rem" }} className="fas fa-bars"></i>
            </button>

            <div className="navbar-collapse collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item mx-2">
                  <Link to='/Tryon-Project/game_list' className="nav-link botao2" ><div className="botao2_conteudo" style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }}>GAMES</div></Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to='/Tryon-Project/feed' className="nav-link botao2" ><div className="botao2_conteudo" style={{ paddingLeft: "1.75rem", paddingRight: "1.75rem" }}>FEED</div></Link>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link botao_navbar_discord" href="https://discord.gg/ZH6fMMhKdN" target={"_blank"}><div className="botao_nav_discord_conteudo">DISCORD</div></a>
                </li>
              </ul>
              <ul className="navbar-nav d-flex flex-row ms-auto" >
                <li className="nav-item dropdown d-flex">
                  <div className="nav-link me-3 d-flex align-items-center navdrop_bloco_user" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa-solid fa-caret-down me-3"></i>
                    <div>
                      <strong className="fw-semibold">{data.username ? data.username : 'User'}</strong>
                      <div className="subtitulo_nav_registered_user">{data.title ? data.title : 'User'}</div>
                    </div>
                  </div>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to={`/Tryon-Project/profile/${data.email}`} state={{ from: data.email }} className="dropdown-item py-2 drop_nav_user_pc" ><i className="fa-solid fa-user mx-2"></i>Profile</Link>
                    {/* ----- BUTTON LOG OUT ------------ */}
                    <div onClick={handleSignOut} className="dropdown-item text-danger py-2  drop_nav_user_pc" ><i className="fa-solid fa-right-from-bracket mx-2"></i>Log out</div>
                  </div>
                </li>
                <li className="nav-item">
                  {data.img ? <img className="horizontal-gradient" src={data.img} height="65" width="130"
                    alt="user" style={{ objectFit: 'cover' }} /> : <img className="horizontal-gradient" src={user_photo} height="65" width="130" alt="user" />}
                </li>
              </ul>
            </div>
          </div>
        </nav>


        <div className="navbar-collapse collapse mx-auto text-center bg-white text-black position-fixed" style={{ marginTop: "3.6rem" }} id="navbar3">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to='/Tryon-Project/game_list' className="nav-link py-3">GAMES</Link></li>
            <li className="nav-item"><Link to='/Tryon-Project/feed' className="nav-link py-3">FEED</Link></li>
            <li className="nav-item"><a href="https://discord.gg/ZH6fMMhKdN" target={"_blank"} className="nav-link py-3">DISCORD</a></li>
            <li className="nav-item"><Link to={`/Tryon-Project/profile/${data.email}`} state={{ from: data.email }} className="nav-link py-3">PROFILE</Link></li>
            {/* ----- BUTTON LOG OUT ------------ */}
            <li onClick={handleSignOut} className="nav-item"><div className="nav-link py-3 text-danger">LOG OUT</div></li>
          </ul>
        </div>

      </section>
    </div>
  )





}