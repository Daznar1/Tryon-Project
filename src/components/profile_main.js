import filters from '../components/post_mobile_data'
import user_default_img from '../imgs/users/user_default.png'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from 'aos';
import background_loading from "../imgs/others/background_loading.png"
import 'aos/dist/aos.css';
import data from "../IGDBdata.json"



export default function Profile_main(props) {

    useEffect(() =>{
        AOS.init();
    }, [])

    const { id } = useParams();
    let [emailUser, setEmailUser] = useState("")
    let [favGameImg, setFavGameImg] = useState(background_loading)
    let [favGameName, setFavGameName] = useState("")

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (emailUser === "") {
                setEmailUser(user.email)
            }
        }
    });

    

    useEffect(()=>{
        data.map(game => {
            if(game.name === props.favGame){
                setFavGameImg(game.cover.url.replace("t_thumb", "t_cover_big"))
                setFavGameName(game.name)
            }
        })
     }, [props])




    if (props.age != undefined) {
        var today = new Date();
        var birthDate = new Date(props.age);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        var user_age = age
    }

    let platforms = []
    let user_platforms;
    if (props.platforms != undefined) {

        Object.entries(props.platforms).forEach(([key, value]) => {
            switch (key) {
                case 'playstation':

                    if (value === true) {
                        platforms.push(<div className="tag_post_profile background_playstation"><img src={require(`../imgs/icones_plataformas/${filters[1].options[0].icon}.png`)} />Playstation</div>)
                    }
                    break;

                case 'nintendo':
                    if (value === true) {
                        platforms.push(<div className="tag_post_profile background_nintendo"><img src={require(`../imgs/icones_plataformas/${filters[1].options[1].icon}.png`)} />Nintendo</div>)
                    }
                    break;


                case 'xbox':
                    if (value === true) {
                        platforms.push(<div className="tag_post_profile background_xbox"><img src={require(`../imgs/icones_plataformas/${filters[1].options[2].icon}.png`)} />Xbox</div>)
                    }
                    break;

                case 'pc':
                    if (value === true) {
                        platforms.push(<div className="tag_post_profile background_pc"><img src={require(`../imgs/icones_plataformas/${filters[1].options[3].icon}.png`)} />PC</div>)
                    }
                    break;

                case 'mobile':
                    if (value === true) {
                        platforms.push(<div className="tag_post_profile background_phone"><img src={require(`../imgs/icones_plataformas/${filters[1].options[4].icon}.png`)} />Mobile</div>)
                    }
                    break;
            }
        });

        user_platforms = platforms.map(item => <a key={item.props.children[1]}> {item} </a>)
    }


    let discord;
    if (id === emailUser) {
        if (props.usernameDiscord === "") {
            discord = <Link className="btn-discord-2" to={'/Tryon-Project/discord'}><i className="fa-brands fa-discord pe-2 lh-base" />Connect Discord</Link>
        } else {
            discord = <div className="tag_post_profile background_discord"><i className="fa-brands fa-discord pe-2 lh-base"></i>{props.usernameDiscord}</div>
        }
    } else {
        if (props.usernameDiscord != "") {
            discord = <div className="tag_post_profile background_discord"><i className="fa-brands fa-discord pe-2 lh-base"></i>{props.usernameDiscord}</div>
        } else {
            discord = <div className="tag_post_profile background_discord opacity-25"><i className="fa-brands fa-discord pe-2 lh-base"></i>No discord</div>
        }
    }


    let language;
    if (props.language != "") {
        switch (props.language) {
            case 'English':
                language = <img className="ps-2" style={{ width: '30px' }} src={require(`../imgs/icones_paises/${filters[3].options[0].icon}.png`)}></img>
                break;
            case 'Spanish':
                language = <img className="ps-2" style={{ width: '30px' }} src={require(`../imgs/icones_paises/${filters[3].options[1].icon}.png`)}></img>
                break;
            case 'French':
                language = <img className="ps-2" style={{ width: '30px' }} src={require(`../imgs/icones_paises/${filters[3].options[2].icon}.png`)}></img>
                break;
            case 'Italian':
                language = <img className="ps-2" style={{ width: '30px' }} src={require(`../imgs/icones_paises/${filters[3].options[3].icon}.png`)}></img>
                break;

            case 'Portuguese':
                language = <img className="ps-2" style={{ width: '30px' }} src={require(`../imgs/icones_paises/${filters[3].options[4].icon}.png`)}></img>
                break;
        }
    }

    let image;
    if (props.img != "") {
        image = <img className="rounded-circle shadow-1-strong me-3" src={props.img} style={{ objectFit: 'cover' }} alt="avatar" width="250" height="250" />
    } else {
        image = <img className="rounded-circle shadow-1-strong me-3" src={user_default_img} style={{ objectFit: 'cover' }} alt="avatar" width="250" height="250" />
    }

    let profileTop;
    let profileBottom;



    if (props.username !== undefined) {

        profileTop = <section data-aos="fade-in" data-aos-duration="1000" data-aos-delay="400"  className="row text-center mx-auto">
            <div className="position-relative mx-auto w-auto" style={{ marginTop: '12em' }}>
                {image}
            </div>
            <div className="mt-4">
                <h3>{props.username}{language}</h3>

            </div>

            <div className="mt-1">
                <h6 style={{ opacity: '40%' }}>{props.title}</h6>
            </div>
            <div className="mt-1">
                <h6>{props.gender} <span className="text-primary">|</span> {user_age} y.o</h6>
            </div>
        </section>

        profileBottom = <section data-aos="fade-in" data-aos-duration="1000" data-aos-delay="400"  className="container mt-5" style={{ maxWidth: '60rem' }}>

            <div className="row justify-content-center mx-auto">
                <div className="col-12 col-md-5 mx-3 mb-4 mb-md-0" style={{ backgroundColor: '#2a2633a4' }}>
                    <h4 className="mt-4 ms-3">Discord</h4>
                    <hr className="mx-3" />
                    <div className="mt-3 mb-4 mx-3 d-flex flex-wrap">
                        {discord}
                    </div>
                </div>
                <div  className=" col-12 col-md-5 mx-3 pb-5" style={{ backgroundColor: '#2a2633a4' }}>
                    <h4 className="mt-4 ms-3">Plataforms</h4>
                    <hr className="mx-3" />
                    <div className="mx-3 d-flex flex-wrap">
                        {user_platforms}
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-10 mt-4 mx-auto user_profile_fav_games" style={{ backgroundColor: '#2a2633a4'}}>
                <h4 className="mt-2" >Favourite Game</h4>
                <hr />

                <div className="game_imgs_perfil justify-content-center mx-auto text-center flex-sm-column flex-md-row d-sm-flex pt-4 pb-5">
                    <figure className="col-12 col-md-3 my-3 mx-2 ">
                        <Link className="text-white text-decoration-none" to={`/Tryon-Project/about_game/${favGameName}`}><img className="img-fluid" src={favGameImg} alt="Jogo" /><div className="mt-2">{favGameName}</div></Link>

                    </figure>
                </div>
            </div>
        </section>
    } else {
        
        profileTop = <div style={{ height: '50vh' }}></div>
        profileBottom = <div style={{ height: '50vh' }}></div>
    }

    return (

        <main className="container-fluid cardbg bg-blur profile_main" style={{paddingBottom:"13rem"}}>
            {profileTop}
            {profileBottom}
        </main>
    )
}