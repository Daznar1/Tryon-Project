import React, { useEffect, useState } from "react";


import relogio from "../imgs/icones_filtros/time.png";
import filters from './post_mobile_data'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from './firebase'

import userImgDefault from '../imgs/users/user_default.png'

import AOS from 'aos';
import 'aos/dist/aos.css';



export default function Feed_game_post(props) {

    useEffect(() =>{
        AOS.init();
    }, [])

    // Informações acerca do USER
    let [userImg, setUserImg] = useState("")
    let [userName, setUserName] = useState("")
    let [userTitle, setUserTitle] = useState("")
    let [userDiscord, setUserDiscord] = useState("")
    // let userEmail = props.email

    // Informações acerca do POST
    let postTitle = props.title
    let postText = props.text
    let postGame = props.game
    let postPlatform;
    let postLanguage;
    let postAge = props.age
    let postChat;
    let postPeople = props.people
    let postGender;
    let postTime;
    let imgPost;
    let post_section;
    let discord_btn;

    useEffect(() => {
        async function getUser() {
            const docRef = doc(db, 'users', props.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let data = docSnap.data()
                setUserName(data.username)
                setUserImg(data.img)
                setUserTitle(data.title)
                setUserDiscord(data.idDiscord)
            }
        }

        getUser()
    }, [props])


    switch (props.platform) {
        case "Playstation":
            postPlatform = <div className="tag_post background_playstation"><img src={require(`../imgs/icones_plataformas/${filters[1].options[0].icon}.png`)} /> Playstation</div>
            break;
        case "Nintendo":
            postPlatform = <div className="tag_post background_nintendo"><img src={require(`../imgs/icones_plataformas/${filters[1].options[1].icon}.png`)} /> Nintendo</div>
            break;
        case "Xbox":
            postPlatform = <div className="tag_post background_xbox"><img src={require(`../imgs/icones_plataformas/${filters[1].options[2].icon}.png`)} /> Xbox </div>
            break;
        case "PC":
            postPlatform = <div className="tag_post background_pc"><img src={require(`../imgs/icones_plataformas/${filters[1].options[3].icon}.png`)} /> PC</div>
            break;
        case "Mobile":
            postPlatform = <div className="tag_post background_phone"><img src={require(`../imgs/icones_plataformas/${filters[1].options[4].icon}.png`)} /> Mobile</div>
            break;
    }

    switch (props.language) {
        case "English":
            postLanguage = <div className="tag_post"><img src={require(`../imgs/icones_paises/${filters[3].options[0].icon}.png`)} className="pe-2" /> English</div>
            break;
        case "Espanõl":
            postLanguage = <div className="tag_post"><img src={require(`../imgs/icones_paises/${filters[3].options[1].icon}.png`)} className="pe-2" /> Spanish</div>
            break;
        case "Français":
            postLanguage = <div className="tag_post"><img src={require(`../imgs/icones_paises/${filters[3].options[2].icon}.png`)} className="pe-2" /> French</div>
            break;
        case "Italiano":
            postLanguage = <div className="tag_post"><img src={require(`../imgs/icones_paises/${filters[3].options[3].icon}.png`)} className="pe-2" /> Italiano</div>
            break;
        case "Português":
            postLanguage = <div className="tag_post"><img src={require(`../imgs/icones_paises/${filters[3].options[4].icon}.png`)} className="pe-2" /> Portuguese</div>
            break;
        case "Any Language":
            postLanguage = <div className="tag_post">Any Language</div>

            break;
    }

    switch (props.chat) {
        case 'Discord Call':
            postChat = <div className="tag_post background_discord"><i className="fa-brands fa-discord pe-2 lh-base"></i>Discord call</div>
            break;
        case 'Discord Texting':
            postChat = <div className="tag_post background_discord"><i className="fa-brands fa-discord pe-2 lh-base"></i>Discord texting</div>
            break;
        case 'Chat via call':
            postChat = <div className="tag_post bg-primary"><img src={require(`../imgs/icones_filtros/${filters[4].options[2].icon}.png`)} />Chat via call</div>
            break;
        case 'Chat via texting':
            postChat = <div className="tag_post  bg-primary"><img src={require(`../imgs/icones_filtros/${filters[4].options[3].icon}.png`)} />Chat via texting</div>
            break;
        case 'No chat':
            postChat = <div className="tag_post">No chat</div>
            break;
    }

    switch (props.gender) {
        case 'Plays with any gender':
            postGender = <div className="tag_post"><i className="fa-sharp fa-solid fa-genderless pe-2 lh-base"></i>{props.gender}</div>
            break;
        case 'Searching for men players':
            postGender = <div className="tag_post"><i className="fa-sharp fa-solid fa-mars pe-2 lh-base"></i>{props.gender}</div>
            break;
        case 'Searching for women players':
            postGender = <div className="tag_post"><i className="fa-sharp fa-solid fa-venus pe-2 lh-base"></i>{props.gender}</div>
            break;
        case 'Searching for non-binary players':
            postGender = <div className="tag_post"><i className="fa-sharp fa-solid fa-mars-and-venus pe-2 lh-base"></i>{props.gender}</div>
            break;
    }

    switch (props.time) {
        case 'Player starting any time':
            postTime = 'Any time'
            break;
        case 'Player starting soon':
            postTime = 'Soon'
            break;
        case 'Player starting in some hours':
            postTime = 'In some time'
            break;
        default:
            postTime = props.time//.slice(17, 23)
            break;
    }

    if (props.chat === 'Discord Call' || props.chat === 'Discord Texting') {
        discord_btn = <a target={'_blank'} href={`https://discordapp.com/users/${userDiscord}`} className="post_contactar"> <p><i className="fa-brands fa-discord pe-2"></i>Contact via Discord</p> </a>
    } else {
        discord_btn = <div></div>
    }

    switch (userImg) {
        case "":
            imgPost = <Link to={`/Tryon-Project/profile/${props.email}`} state={{ from:props.email }}><img className="rounded-circle me-3 opacity_img_user_post" style={{ objectFit: 'cover' }} src={userImgDefault} alt="avatar" width="70" height="70" /></Link>
            break;
        default:
            imgPost = <Link to={`/Tryon-Project/profile/${props.email}`} state={{ from:props.email }}><img className="rounded-circle me-3 opacity_img_user_post" style={{ objectFit: 'cover' }} src={userImg} alt="avatar" width="70" height="70" /></Link>
            break;

    }



    post_section = <div className="postFeed">

        <section className="post_time_mobile">
            <img src={relogio} height="21px" width="21px" /> {postTime}
        </section>

       

        <section className="post_user_info">
            <div className="d-flex">    
                {imgPost}
                <div>
                    <Link className="username_posts" to={`/Tryon-Project/profile/${props.email}`} state={{ from:props.email }}><h5>{userName}</h5></Link>
                    <Link className="mb-0 subtitulo_user_posts" to={`/Tryon-Project/profile/${props.email}`} state={{ from:props.email }}>   <p>{userTitle}</p></Link>
                </div>
            </div>
        </section>

        <section className="post_conteudo">
            <h4 style={{ wordBreak: 'break-all', fontSize: '1.3rem' }}>{postTitle}</h4>
            <p style={{ wordBreak: 'break-all' }}>{postText}</p>
        </section>

        <section className="post_tags">
            <p>Tags:</p>
            <div className="row section_tags_posts">
                <div className="tag_post bg-primary"><img src={require(`../imgs/icones_filtros/${filters[0].icon}.png`)} /> {postGame}</div>
                <div className="tag_post"><img src={require(`../imgs/icones_filtros/${filters[2].icon}.png`)} /> {postAge}</div>
                {postPlatform}
                {postLanguage}
                {postChat}
                <div className="tag_post"><img src={require(`../imgs/icones_filtros/${filters[5].icon}.png`)} />{postPeople}</div>
                {postGender}
                <div className="tag_post"><img src={require(`../imgs/icones_filtros/${filters[7].icon}.png`)} />{props.time}</div>
            </div>
        </section>

        {discord_btn}
    </div>






    return (
        <article data-aos="fade-up" data-aos-duration="600" className="flex post px-1 px-sm-3">
                {post_section}
        </article>
    )


}