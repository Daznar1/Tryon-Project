import React, { useState, useEffect } from "react";
import filters from './post_mobile_data'

import { auth, db } from './firebase';
import { uid } from 'uid';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import data from "../IGDBdata.json"

export default function Post_pc() {




    useEffect(() => {

        // Contador titulo e texto pc
        let titulo_post = document.getElementById('titulo_post')
        let contador_titulo = document.getElementById('contador_titulo')
        let texto_post = document.getElementById('texto_post')
        let contador_texto = document.getElementById('contador_texto')
        let contador = 0

        titulo_post.addEventListener('input', () => {
            contador = titulo_post.value.length;
            contador_titulo.innerText = `${contador}/50`
            verificar_botao_post()
        })

        texto_post.addEventListener('input', () => {
            contador = texto_post.value.length;
            contador_texto.innerText = `${contador}/200`
            verificar_botao_post()
        })


    }, [])

    const [state_btn_post, set_state_btn_post] = useState('btn btn-primary fw-semibold disabled')
    const [user_has_discord, setUser_has_discord] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userId, setUserId] = useState("")

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            if(userEmail === "" && userId === ""){
                setUserEmail(user.email)
                setUserId(user.uid)
            }
            const docRef = doc(db, "users", user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.usernameDiscord != "") {
                    setUser_has_discord(true)
                }
            }


        }else{
            navigate('/Tryon-Project/sign_up')
        }
    });


    var lista_games = [];

    data.forEach(element => {
        lista_games.push(<li key={element.id}><a key={element.id} data-key={element.name} data-filter="game_filtro" onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);">{element.name}</a></li>)
    });
    


    let lista_age = []

    filters.map(filter => {
        if (filter.id === 'age_filtro') {
            filter.options.map(option => {
                lista_age.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);">{option.name}</a></li>)

            })
        }
    })


    let lista_language = []

    filters.map(filter => {
        if (filter.id === 'language_filtro') {
            filter.options.map(option => {

                if (option.name !== 'Any language') {
                    lista_language.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);"> <img className="pe-2"
                        width="25px" src={require(`../imgs/icones_paises/${option.icon}.png`)} /> {option.name}</a></li>)

                } else {
                    lista_language.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);">{option.name}</a></li>)
                }

            })
        }
    })


    let lista_chat = []

    filters.map(filter => {
        if (filter.id === 'chat_filtro') {
            filter.options.map(option => {
                if (option.name === 'Discord Call' || option.name === 'Discord Texting') {
                    if (user_has_discord === true) {
                        lista_chat.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);"><i className="fa-brands fa-discord cor_discord pe-2"></i>{option.name}</a></li>)
                    } else {
                        lista_chat.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} className="dropdown-item opacity-25" href="javascript:void(0);"><i className="fa-brands fa-discord cor_discord pe-2"></i>{option.name}</a></li>)
                    }

                } else if (option.name === 'Chat via call' || option.name === 'Chat via texting') {
                    lista_chat.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);"><img className="me-1"
                        width="20px" src={require(`../imgs/icones_filtros/${option.icon}.png`)} /> {option.name}</a></li>)
                } else {
                    lista_chat.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);">{option.name}</a></li>)
                }

            })
        }
    })


    let lista_people = []

    filters.map(filter => {
        if (filter.id === 'people_filtro') {
            filter.options.map(option => {
                lista_people.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);">{option.name}</a></li>)

            })
        }
    })


    let lista_gender = []

    filters.map(filter => {
        if (filter.id === 'gender_filtro') {
            filter.options.map(option => {
                lista_gender.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);">{option.name}</a></li>)

            })
        }
    })


    let lista_time = []

    filters.map(filter => {
        if (filter.id === 'time_filtro') {
            filter.options.map(option => {
                lista_time.push(<li key={option.key}><a key={option.key} data-key={option.key} data-filter={filter.id} onClick={inserir_tag} className="dropdown-item" href="javascript:void(0);">{option.name}</a></li>)

            })
        }
    })


    function inserir_tag(event) {

        let tag_section = document.getElementById('tags_post')
        let tag_texto = event.target.dataset.key
        let filtro_associado = event.target.dataset.filter




        if (document.getElementById(`tag_${filtro_associado}`)) {
            document.getElementById(`tag_${filtro_associado}`).remove()
        }

        document.querySelector(`#${filtro_associado} button`).style.color = 'white'

        if (filtro_associado === 'game_filtro') {


            if (document.getElementById('tag_platform_filtro')) {
                document.querySelector('#platform_filtro button').style.color = '#757575'
                document.getElementById('tag_platform_filtro').remove()
            }

            document.querySelector('#platform_filtro button').classList.remove('disabled')
            tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post bg-primary"><img src=${require(`../imgs/icones_filtros/${filters[0].icon}.png`)} > ${tag_texto}</div>`
            carregar_platformas(tag_texto)
        }

        if (filtro_associado === 'platform_filtro') {
            if (tag_texto === 'Playstation') {
                tag_section.innerHTML += `<div  data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post background_playstation"><img src=${require(`../imgs/icones_plataformas/${filters[1].options[0].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Nintendo') {
                tag_section.innerHTML += `<div  data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post background_nintendo"><img src=${require(`../imgs/icones_plataformas/${filters[1].options[1].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Xbox') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post background_xbox"><img src=${require(`../imgs/icones_plataformas/${filters[1].options[2].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'PC') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post background_pc"><img src=${require(`../imgs/icones_plataformas/${filters[1].options[3].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Mobile') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post background_phone"><img src=${require(`../imgs/icones_plataformas/${filters[1].options[4].icon}.png`)} > ${tag_texto}</div>`
            }

        }

        if (filtro_associado === 'age_filtro') {
            tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_filtros/${filters[2].icon}.png`)} > ${tag_texto}</div>`
        }

        if (filtro_associado === 'language_filtro') {
            if (tag_texto === 'English') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_paises/${filters[3].options[0].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Espanõl') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_paises/${filters[3].options[1].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Français') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_paises/${filters[3].options[2].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Italiano') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_paises/${filters[3].options[3].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Português') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_paises/${filters[3].options[4].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Any language') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post">${tag_texto}</div>`
            }

        }

        if (filtro_associado === 'chat_filtro') {
            if (tag_texto === 'Discord Call' || tag_texto === 'Discord Texting') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}" class="tag_post background_discord"> <i class="fa-brands fa-discord lh-base pe-2"></i>${tag_texto}</div>`
            }

            if (tag_texto === 'Chat via call') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}" class="tag_post bg-primary"><img src=${require(`../imgs/icones_filtros/${filters[4].options[2].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'Chat via texting') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}" class="tag_post bg-primary"><img src=${require(`../imgs/icones_filtros/${filters[4].options[3].icon}.png`)} > ${tag_texto}</div>`
            }

            if (tag_texto === 'No chat') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}" class="tag_post">${tag_texto}</div>`
            }
        }

        if (filtro_associado === 'people_filtro') {
            tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_filtros/${filters[5].icon}.png`)} > ${tag_texto}</div>`
        }

        if (filtro_associado === 'gender_filtro') {
            if (tag_texto === 'Plays with any gender') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><i class="fa-sharp fa-solid fa-genderless pe-2 lh-base"></i> ${tag_texto}</div>`
            }

            if (tag_texto === 'Searching for male players') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><i class="fa-solid fa-mars pe-2 lh-base"></i> ${tag_texto}</div>`
            }

            if (tag_texto === 'Searching for female players') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><i class="fa-solid fa-venus pe-2 lh-base"></i> ${tag_texto}</div>`
            }

            if (tag_texto === 'Searching for non-binary players') {
                tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><i class="fa-solid fa-mars-and-venus pe-2 lh-base"></i> ${tag_texto}</div>`
            }

        }

        if (filtro_associado === 'time_filtro') {
            tag_section.innerHTML += `<div data-filter="${filtro_associado}" id="tag_${filtro_associado}"class="tag_post"><img src=${require(`../imgs/icones_filtros/${filters[7].icon}.png`)} >${tag_texto}</div>`
        }

        document.querySelectorAll('#tags_post div').forEach(element => {
            element.addEventListener('click', remover_tag)
        })

        verificar_botao_post()

    }



    const [lista_plataformas, SetLista_plataformas] = useState([]);

    function carregar_platformas(game) {

        let playstation = false
        let xbox = false
        let nintendo = false
        let pc = false
        let mobile = false
        SetLista_plataformas([])

        data.forEach(element => {
            if (element.name === game) {
                element.platforms.forEach(platform => {

                    


                    if (platform.name === "PlayStation 4" || platform.name === "PlayStation 5" || platform.name === "PlayStation 3") {
                        if (playstation === false) {
                            SetLista_plataformas(oldArray => [...oldArray, (<li key="Playstation"><a key="Playstation" data-key="Playstation" data-filter="platform_filtro" onClick={inserir_tag} className="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                <img className="pe-2" width="29px" src={require(`../imgs/icones_plataformas/playstation_icon.png`)} />Playstation</a></li>)])
                            playstation = true
                        }

                    }

                    if (platform.name === "Xbox One" || platform.name === "Xbox Series X|S" || platform.name === "Xbox 360") {
                        if (xbox === false) {
                            SetLista_plataformas(oldArray => [...oldArray, (<li key="Xbox"><a key="Xbox" data-key="Xbox" data-filter="platform_filtro" onClick={inserir_tag} className="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                <img className="pe-2" width="29px" src={require(`../imgs/icones_plataformas/xbox_icon.png`)} />Xbox</a></li>)])
                            xbox = true
                        }
                    }

                    if (platform.name === "Nintendo Switch") {
                        if (nintendo === false) {
                            SetLista_plataformas(oldArray => [...oldArray, (<li key="Nintendo"><a key="Nintendo" data-key="Nintendo" data-filter="platform_filtro" onClick={inserir_tag} className="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                <img className="pe-2" width="29px" src={require(`../imgs/icones_plataformas/nintendo_icon.png`)} />Nintendo</a></li>)])
                            nintendo = true
                        }
                    }

                    if (platform.name === "PC (Microsoft Windows)" || platform.name === "Web browser" || platform.name === "Mac" || platform.name === "Linux") {
                        if (pc === false) {
                            SetLista_plataformas(oldArray => [...oldArray, (<li key="PC"><a key="PC" data-key="PC" data-filter="platform_filtro" onClick={inserir_tag} className="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                <img className="pe-2" width="29px" src={require(`../imgs/icones_plataformas/pc_icon.png`)} />PC</a></li>)])
                            pc = true
                        }
                    }

                    if (platform.name === "Android" || platform.name === "iOS") {
                        if (mobile === false) {
                            SetLista_plataformas(oldArray => [...oldArray, (<li key="Mobile"><a key="Mobile" data-key="Mobile" data-filter="platform_filtro" onClick={inserir_tag} className="dropdown-item d-flex align-items-center" href="javascript:void(0);">
                                <img className="pe-2" width="29px" src={require(`../imgs/icones_plataformas/phone_icon.png`)} />Mobile</a></li>)])
                            mobile = true
                        }
                    }

                })
            }
        })
    }





    function remover_tag(event) {

    
        event.currentTarget.remove()

        document.querySelector(`#${event.currentTarget.dataset.filter} button`).style.color = '#757575'

        if (event.currentTarget.id === 'tag_game_filtro') {
            document.querySelector('#platform_filtro button').style.color = '#757575'
            document.querySelector('#platform_filtro button').classList.add('disabled')
            if (document.getElementById('tag_platform_filtro')) {
                document.getElementById('tag_platform_filtro').remove()
            }
        }

        verificar_botao_post()

    }


    function inserir_tag_time(event) {

        if (event.target.type === 'text') {
            if (document.getElementById('tag_time_filtro')) {
                document.getElementById('tag_time_filtro').remove()
            }


            event.target.type = 'time'
            event.target.value = '00:00'
            event.target.readOnly = false

            event.target.addEventListener('blur', inserir)

            function inserir() {

                document.getElementById('tags_post').innerHTML += `<div data-filter="${event.target.dataset.filter}" id="tag_time_filtro"class="tag_post"><img src=${require(`../imgs/icones_filtros/${filters[7].icon}.png`)} >Starts playing at ${event.target.value}</div>`

                document.querySelector('#time_filtro button').style.color = 'white'

                event.target.removeEventListener('blur', inserir)
                event.target.type = 'text'
                event.target.value = 'Custom Time'
                event.target.readOnly = false


                document.querySelectorAll('#tags_post div').forEach(element => {
                    element.addEventListener('click', remover_tag)
                })

                verificar_botao_post()

            }

        }
    }


    function verificar_botao_post() {


        const titulo_post = document.getElementById('titulo_post')
        const texto_post = document.getElementById('texto_post')
        const tags_section = document.getElementById('tags_post')


        if (tags_section.querySelectorAll('div').length === 8 && titulo_post.value.length > 1 && texto_post.value.length > 1) {
            set_state_btn_post('btn btn-primary semibold')
        } else {
            set_state_btn_post('btn btn-primary fw-semibold disabled')
        }




    }

    const navigate = useNavigate();

    function fazer_post() {

        const titulo_post = document.getElementById('titulo_post')
        const texto_post = document.getElementById('texto_post')


        let titulo = titulo_post.value
        let texto = texto_post.value
        let tag_game = document.getElementById('tag_game_filtro').innerText
        let tag_platform = document.getElementById('tag_platform_filtro').innerText
        let tag_age = document.getElementById('tag_age_filtro').innerText
        let tag_language = document.getElementById('tag_language_filtro').innerText
        let tag_chat = document.getElementById('tag_chat_filtro').innerText
        let tag_people = document.getElementById('tag_people_filtro').innerText
        let tag_gender = document.getElementById('tag_gender_filtro').innerText
        let tag_time = document.getElementById('tag_time_filtro').innerText

        

        async function uploadPost(){
            const postUid = uid()
            await setDoc(doc(db, "posts", userEmail), {
                title: titulo,
                text: texto,
                game: tag_game,
                platform: tag_platform,
                age: tag_age,
                language: tag_language,
                chat: tag_chat,
                people: tag_people,
                gender: tag_gender,
                time: tag_time,
                date: new Date,
                user: userId,
                email: userEmail,
                id: postUid
            });

            navigate("/Tryon-Project/feed")

        }
      

        uploadPost()

    }



    return (
        <section id="section_post_pc" className="d-none d-lg-block">


            <p className="mb-0 opacity-25"> - Time according to GMT.</p>
            <p className="mb-0 opacity-50"> - Please select all options before posting.</p>



            <div id="filtros_post">

                <div id="game_filtro" className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">Game</button>
                    <ul id="opcoes_game" className="dropdown-menu">
                        {lista_games}
                    </ul>
                </div>

                <div id="platform_filtro" className="dropdown">
                    <button className="dropdown-toggle disabled" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">Platform</button>
                    <ul id="opcoes_platform" className="dropdown-menu">
                        {lista_plataformas}
                    </ul>
                </div>

                <div id="age_filtro" className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">Age</button>
                    <ul id="opcoes_language" className="dropdown-menu">
                        {lista_age}
                    </ul>
                </div>

                <div id="language_filtro" className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">Language</button>
                    <ul id="opcoes_age" className="dropdown-menu">
                        {lista_language}
                    </ul>
                </div>

                <div id="chat_filtro" className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">Chat</button>
                    <ul id="opcoes_age" className="dropdown-menu">
                        {lista_chat}
                    </ul>
                </div>

                <div id="people_filtro" className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">People</button>
                    <ul id="opcoes_age" className="dropdown-menu">
                        {lista_people}
                    </ul>
                </div>

                <div id="gender_filtro" className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">Gender</button>
                    <ul id="opcoes_age" className="dropdown-menu">
                        {lista_gender}
                    </ul>
                </div>


                <div id="time_filtro" className="dropdown">
                    <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">Time</button>
                    <ul id="opcoes_time" className="dropdown-menu">
                        {lista_time}
                        <li><input readOnly className="input mb-0" defaultValue="Custom time" type="text" onClick={inserir_tag_time} data-filter="time_filtro" data-key="Custom Time" name="time_filtro" id="time_filtro" /></li>
                    </ul>
                </div>



            </div>

            <div id="textos_post">
                <div className="position-relative">
                    <input maxLength={50} placeholder="Title" className="input" type="text" name="titulo_post"
                        id="titulo_post" />
                    <span id="contador_titulo">0/50</span>
                </div>

                <div className="position-relative">
                    <textarea maxLength={200} placeholder="Text" name="texto_post" id="texto_post" cols="30"
                        rows="5"></textarea>
                    <span id="contador_texto">0/200</span>
                </div>

            </div>

            <section id="tags_post_section" className="row">
                <div className="col-auto">Tags:</div>
                <div id="tags_post" className="col-11 p-0"></div>
            </section>

            <div className="row">
                <div className="col-6 p-0">
                    <span className="text-primary fw-semibold">Reminder:</span><span className="opacity-50"> Your post will
                        expire in 2 hours after posting.</span>
                </div>

                <div className="col-6 p-0 text-end">
                    <button id="botao_post" type="button" onClick={fazer_post} className={state_btn_post}>Post</button>
                </div>

            </div>

        </section>
    )


}