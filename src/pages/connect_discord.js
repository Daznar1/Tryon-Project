import React from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { auth, db } from "../components/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import discord_img from '../imgs/icones_plataformas/discord_icon.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";

export default function Discord() {

    let [discordPage, setDiscordPage] = useState("")

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    let code = searchParams.get('code')

    const { pathName } = useLocation();

    const [username_discord, setUsername_discord] = useState("")

    const [id_discord, setId_discord] = useState("")


    let connect = <div className="d-flex justify-content-center align-items-center py-5 my-md-5">
        <div className="discord_sign_up d-flex justify-content-center align-items-center mt-5 flex-column">
            <img src={discord_img} className="mt-3" />
            <h1 className="text-white w-100 mb-3 mt-4 fw-semibold">Discord</h1>
            <p className="opacity-50">Connect your Discord account and share it easily with other people. In two clicks and it's done!. Your will miss</p>
            <a href="https://discord.com/api/oauth2/authorize?client_id=1078388049790119977&redirect_uri=https%3A%2F%2Fdaznar1.github.io%2FTryon-Project&response_type=code&scope=identify" className="btn btn-discord w-100 w-md-50 w-lg-25 mx-auto mt-4">Connect discord account</a>
            <Link to='/Tryon-Project/home' className="mt-4 opacity-75 text-decoration-none text-white">No thanks</Link>
        </div>
    </div>

    let connected = <div className="d-flex justify-content-center align-items-center py-5 my-md-5" style={{ height: '90vh' }}>
        <div className="discord_sign_up d-flex justify-content-center align-items-center mt-5 flex-column">
            <h1 className="text-white w-100 mb-3 mt-5 fw-semibold">Enjoy!   </h1>
            <p className="opacity-50">Your discord is now registered! Time to start talking to other players and have some fun.</p>
            <Link to={'/Tryon-Project/home'} className="btn btn-primary w-100 w-md-50 w-lg-25 mx-auto my-5">Start exploring</Link>
        </div>
    </div>



    useEffect(() => {

    
        if (code != null) {

            const params = new URLSearchParams({
                client_id: process.env.REACT_APP_DISCORD_CLIENT_ID,
                client_secret: process.env.REACT_APP_DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REACT_APP_DISCORD_REDIRECT_URL
    
            })
    
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
    
            async function callApi() {
    
                const response = await axios.post(
                    "https://discord.com/api/oauth2/token",
                    params,
                    {
                        headers
                    }
                );
    
    
                const userResponse = await axios.get('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${response.data.access_token}`
                    }
    
                })
    
                const { id, username } = userResponse.data;
                setUsername_discord(username)
                setId_discord(id)
            }
    
            callApi()

        }else{
            onAuthStateChanged(auth, async (user) => {
                if (user) {
    
                    const docRef = doc(db, "users", user.email);
                    const docSnap = await getDoc(docRef);
    
                    
                    if (docSnap.exists()) {
                        let data = docSnap.data()
                    
                        if (data.idDiscord === "") {
                            setDiscordPage(connect)
                        } else {
                            setDiscordPage(connected)
                        }
    
                    } else {
                        setDiscordPage(connect)
                    }
    
                } else {
                    navigate('/Tryon-Project/sign_up')
                }
    
            })
        }
    
       
    }, [])


    useEffect(() => {

        if(code !== null){
            if (username_discord != "" && id_discord != "") {
    
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const userdb = doc(db, "users", user.email);
                        await updateDoc(userdb, {
                            usernameDiscord: username_discord,
                            idDiscord: id_discord
                        });
    
                        setUsername_discord("")
                        setId_discord("")
                       
                        setDiscordPage(connected)
    
                    }
                })
            }
        }
        

    }, [username_discord, id_discord])


    return (
        <div style={{ height: '100vh' }} className=" d-flex justify-content-center align-items-center">
            {discordPage}
        </div>
    )


}