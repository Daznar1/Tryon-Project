import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import icone_google from "../imgs/icones_plataformas/google_icon.png"
import { onAuthStateChanged } from "firebase/auth";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function Sign_in_main() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");

    useEffect(() => {
        AOS.init();
      }, [])

    const handleEmailChange = (e) => {
        setEmail(e.target.value);   

        let email_value = e.target.value
        let email_regex_verification = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


        
        if(email_value.match(email_regex_verification)){
            document.getElementById('email_SignIn').style.boxShadow = ''
        }else{
            if(email_value.length === 0){
                document.getElementById('email_SignIn').style.boxShadow = ''
            }else{
                document.getElementById('email_SignIn').style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem'
            }
        }

    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        document.getElementById('password_SignIn').style.boxShadow = ''
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/Tryon-Project/home");
            setErrEmail("");
            setErrPassword("");
        })
            .catch((err) => {
                setErrEmail("");
                setErrPassword("");

                switch (err.message) {
                    case "Firebase: Error (auth/wrong-password).":
                        setErrPassword("Wrong password, try(on) again.");
                        document.getElementById('password_SignIn').style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem'
                        break;
                    case "Firebase: Error (auth/user-not-found).":
                        setErrEmail("That email is not registered.");
                        document.getElementById('email_SignIn').style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem'
                        break;
                    case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
                        setErrEmail("To many failed attempts with these email. Wait a few minutes.");
                        document.getElementById('email_SignIn').style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem'
                        document.getElementById('password_SignIn').style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem'
                        break;
                    default:
                        setErrEmail("Invalid Sign In");
                        document.getElementById('email_SignIn').style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem'
                        document.getElementById('password_SignIn').style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem'
                        break;
                }

            });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/Tryon-Project/home')
        }
      });


    return (
        <section className="row justify-content-center align-content-center" style={{ height: '100vh' }}>
            <div id="sign_in_section" className="sign_section py-4 px-3 px-md-5 py-md-5 col-12 col-md-10 col-lg-7 col-xl-6"  data-aos="fade-up" data-aos-duration="900" data-aos-easing="ease-in-back">

                <div className="w-100">
                    <h1>Welcome back!</h1>
                    <hr />

                    <div>
                        <div>
                            <label className="d-block label">Email <span className="msg_warning">{errEmail}</span></label>
                            <input placeholder="Enter your email here" className="input" type="text" name="email_SignIn" id="email_SignIn" onChange={handleEmailChange} />
                        </div>
                        <div>
                            <label className="d-block label">Password <span className="msg_warning">{errPassword}</span></label>
                            <input placeholder="Enter your password here" className="input" type="password" name="password_SignIn" id="password_SignIn" onChange={handlePasswordChange} />
                            <div style={{ opacity: "40%", fontSize: "0.7rem" }}></div>
                        </div>

                        <button className="btn btn-primary d-block mt-3 w-100" type="button" onClick={handleSignIn}>Sign In</button>

                    </div>

                    <div className="text-center mt-5">
                        <div className="retangulo_sign_in mb-4 opacity-50"></div>

                        <p className="mb-0"><span className="opacity-50">Don't have an account? </span><br className="d-block d-sm-none" /><Link to={'/Tryon-Project/sign_up'} className="text-primary fw-semibold text-decoration-none" href="#">Create one.</Link></p>
                    </div>

                </div>

            </div>

        </section>
    )
}