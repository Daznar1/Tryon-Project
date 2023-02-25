import React, { useState, useEffect } from "react";
import filters from './post_mobile_data';
import { auth, db } from './firebase';
import { uid } from 'uid';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import data from "../IGDBdata.json"


export default function Post_mobile() {


    const [listaPlataformas, setListaPlataformas] = useState([]);
    const [state_btn_post, set_state_btn_post] = useState('btn btn-primary w-100 disabled')
    const [user_has_discord, setUser_has_discord] = useState(false);

    useEffect(() => {

        let titulo_post_mobile = document.getElementById('titulo_post_mobile')
        let contador_titulo_mobile = document.getElementById('contador_titulo_mobile')
        let texto_post_mobile = document.getElementById('texto_post_mobile')
        let contador_texto_mobile = document.getElementById('contador_texto_mobile')
        let contador_mobile = 0

        titulo_post_mobile.addEventListener('input', () => {
            contador_mobile = titulo_post_mobile.value.length;
            contador_titulo_mobile.innerText = `${contador_mobile}/50`
            verificar_botao_post()

        })

        texto_post_mobile.addEventListener('input', () => {
            contador_mobile = texto_post_mobile.value.length;
            contador_texto_mobile.innerText = `${contador_mobile}/200`
            verificar_botao_post()
        })
    }, [])


    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "users", user.email);
            const docSnap = await getDoc(docRef);

            const data = docSnap.data();


            if (data.usernameDiscord != "") {
                setUser_has_discord(true)
            } else {
                setUser_has_discord(false)
            }

        } else {
            navigate('/Tryon-Project/sign_up')
        }
    });

    const [img_game_filter, set_img_game_filter] = useState(filters[0].img_off);
    const [img_platform_filter, set_img_platform_filter] = useState(filters[1].img_off);
    const [img_age_filter, set_img_age_filter] = useState(filters[2].img_off);
    const [img_language_filter, set_img_language_filter] = useState(filters[3].img_off);
    const [img_chat_filter, set_img_chat_filter] = useState(filters[4].img_off);
    const [img_people_filter, set_img_people_filter] = useState(filters[5].img_off);
    const [img_gender_filter, set_img_gender_filter] = useState(filters[6].img_off);
    const [img_time_filter, set_img_time_filter] = useState(filters[7].img_off);



    const handleChangeHours = (event) => {

        switch (event.target.id) {
            case 'horas_input_mobile':
                if (event.target.value > 23) {
                    event.target.value = '';
                }
                break;
            case 'minutos_input_mobile':
                if (event.target.value > 59) {
                    event.target.value = '';
                }
                break;
        }

        const tags_section_mobile = document.getElementById('tags_post_mobile')
        const horas = document.getElementById('horas_input_mobile')
        const minutos = document.getElementById('minutos_input_mobile')

        if (horas.value != '' && minutos.value != '') {

            if (document.getElementById(`tag_time_filtro`)) {
                document.getElementById(`tag_time_filtro`).remove()
            }

            tags_section_mobile.innerHTML += `<div id="tag_time_filtro"  class="tag_post_mobile"><img src=${require(`../imgs/icones_filtros/${filters[7].icon}.png`)}>Starts playing at ${horas.value} : ${minutos.value}</div>`;
            set_img_time_filter(filters[7].img_on)
            document.querySelectorAll('#tags_post_mobile div').forEach(div => div.addEventListener('click', remover_tag))
            document.getElementById('close_modal_time').click()
            horas.value = ''
            minutos.value = ''
        }

        verificar_botao_post()

    };


    function Filtros_mobile_operacao(event) {

        let filtro_selecionado = event.target.id;

        filters.map(element => {

            if (filtro_selecionado === element.id) {
                let lista_opcoes = document.querySelectorAll(`#${element.idOpcoesModal} li`)

                lista_opcoes.forEach(li => {
                    li.removeEventListener('click', inserir_tag)
                    li.addEventListener('click', inserir_tag)
                    li.myParam = filtro_selecionado
                });

            }
        })
    }

    function inserir_tag(event) {

        const tags_section_mobile = document.getElementById('tags_post_mobile')

        let tag_texto = event.target.attributes.info.value
        let filtro_associado = event.currentTarget.myParam;

        filters.map(element => {

            if (filtro_associado == element.id) {



                if (document.getElementById(`tag_${filtro_associado}`)) {
                    document.getElementById(`tag_${filtro_associado}`).remove()
                }

                if (filtro_associado === 'game_filtro') {
                    carregar_plataformas(tag_texto)
                    tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"class="tag_post_mobile bg-primary"><img src=${require(`../imgs/icones_filtros/${element.icon}.png`)}>${tag_texto}</div>`;
                    set_img_game_filter(filters[0].img_on)

                    document.getElementById('platform_filtro').classList.remove('filtro_inativo');
                    document.getElementById('platform_filtro').setAttribute('data-bs-toggle', 'modal')
                    document.getElementById('platform_filtro').setAttribute('data-bs-target', '#platform_modal')
                    set_img_platform_filter(filters[1].img_off)

                    if (document.getElementById('tag_platform_filtro')) {
                        document.getElementById('tag_platform_filtro').remove()
                    }
                }

                if (filtro_associado === 'platform_filtro') {

                    let icon;
                    let background;
                    switch (tag_texto) {
                        case 'Playstation':
                            icon = element.options[0].icon
                            background = 'background_playstation';
                            break;
                        case 'Nintendo':
                            icon = element.options[1].icon
                            background = 'background_nintendo';
                            break;
                        case 'Xbox':
                            icon = element.options[2].icon
                            background = 'background_xbox';
                            break;
                        case 'PC':
                            icon = element.options[3].icon
                            background = 'background_pc';
                            break;
                        case 'Mobile':
                            icon = element.options[4].icon
                            background = 'background_phone';
                            break;
                    }

                    tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile ${background}"><img src=${require(`../imgs/icones_plataformas/${icon}.png`)}>${tag_texto}</div>`;

                    set_img_platform_filter(filters[1].img_on)
                }

                if (filtro_associado === 'age_filtro') {
                    tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"   class="tag_post_mobile"><img src=${require(`../imgs/icones_filtros/${element.icon}.png`)} >${tag_texto}</div>`;
                    set_img_age_filter(filters[2].img_on)
                }

                if (filtro_associado === 'language_filtro') {
                    let icon;
                    switch (tag_texto) {
                        case 'English':
                            icon = element.options[0].icon;
                            break;
                        case 'Espanõl':
                            icon = element.options[1].icon;
                            break;
                        case 'Français':
                            icon = element.options[2].icon;
                            break;
                        case 'Italiano':
                            icon = element.options[3].icon;
                            break;
                        case 'Português':
                            icon = element.options[4].icon;
                            break;
                        case 'Any language':
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile">${tag_texto}</div>`;
                            break;
                    }


                    if (icon != undefined) {
                        tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile"><img src=${require(`../imgs/icones_paises/${icon}.png`)}>${tag_texto}</div>`;
                    }


                    set_img_language_filter(filters[3].img_on)

                }

                if (filtro_associado === 'chat_filtro') {
                    switch (tag_texto) {
                        case 'Discord Call':
                            if (user_has_discord === true) {
                                tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile background_discord"><i class="fa-brands fa-discord lh-base pe-2"></i> ${tag_texto}</div>`;
                                set_img_chat_filter(filters[4].img_on)
                            }
                            break;
                        case 'Discord Texting':
                            if (user_has_discord === true) {
                                tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile background_discord"><i class="fa-brands fa-discord lh-base pe-2"></i> ${tag_texto}</div>`;
                                set_img_chat_filter(filters[4].img_on)
                            }
                            break;
                        case 'Chat via call':
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile bg-primary"><img src=${require(`../imgs/icones_filtros/${element.options[2].icon}.png`)}>${tag_texto}</div>`;
                            set_img_chat_filter(filters[4].img_on)
                            break;
                        case 'Chat via texting':
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile bg-primary"><img src=${require(`../imgs/icones_filtros/${element.options[3].icon}.png`)}>${tag_texto}</div>`;
                            set_img_chat_filter(filters[4].img_on)
                            break;
                        default:
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile">${tag_texto}</div>`;
                            set_img_chat_filter(filters[4].img_on)
                            break;
                    }



                }

                if (filtro_associado === 'people_filtro') {
                    tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile"><img src=${require(`../imgs/icones_filtros/${element.icon}.png`)}>${tag_texto}</div>`;
                    set_img_people_filter(filters[5].img_on)
                }

                if (filtro_associado == 'gender_filtro') {
                    switch (tag_texto) {
                        case 'Plays with any gender':
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile"><i class="fa-sharp fa-solid fa-genderless pe-2 lh-base"></i> ${tag_texto}</div>`;
                            break;
                        case 'Searching for male players':
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile"><i class="fa-solid fa-mars pe-2 lh-base"></i> ${tag_texto}</div>`;
                            break;
                        case 'Searching for female players':
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile"><i class="fa-solid fa-venus pe-2 lh-base"></i> ${tag_texto}</div>`;
                            break;
                        case 'Searching for non-binary players':
                            tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile"><i class="fa-solid fa-mars-and-venus pe-2 lh-base"></i> ${tag_texto}</div>`;
                            break;
                    }
                    set_img_gender_filter(filters[6].img_on)
                }

                if (filtro_associado === 'time_filtro') {
                    tags_section_mobile.innerHTML += `<div id="tag_${filtro_associado}"  class="tag_post_mobile"><img src=${require(`../imgs/icones_filtros/${element.icon}.png`)}>${tag_texto}</div>`;
                    set_img_time_filter(filters[7].img_on)
                }

                verificar_botao_post()

                document.querySelectorAll('#tags_post_mobile div').forEach(div => div.addEventListener('click', remover_tag))

            }


        })



    }




    function carregar_plataformas(game) {

        let playstation = false
        let xbox = false
        let nintendo = false
        let pc = false
        let mobile = false
        setListaPlataformas([])


        data.map(element => {
            if (element.name === game) {
                element.platforms.map(platform => {



                    if (platform.name === "PlayStation 4" || platform.name === "PlayStation 5" || platform.name === "PlayStation 3") {

                        if (playstation === false) {
                            setListaPlataformas(oldArray => [...oldArray, (<li key={platform.id} info="Playstation" data-bs-dismiss="modal" aria-label="Close">
                                <a className="dropdown-item background_playstation" href="#">
                                    <img src={require(`../imgs/icones_plataformas/playstation_icon.png`)} /> Playstation</a></li>)])
                            playstation = true;
                        }
                    }

                    if (platform.name === "Xbox One" || platform.name === "Xbox Series X|S" || platform.name === "Xbox 360") {

                        if (xbox === false) {
                            setListaPlataformas(oldArray => [...oldArray, (<li key={platform.id} info="Xbox" data-bs-dismiss="modal" aria-label="Close">
                                <a className="dropdown-item background_xbox" href="#">
                                    <img src={require(`../imgs/icones_plataformas/xbox_icon.png`)} /> Xbox</a></li>)])
                            xbox = true;
                        }
                    }

                    if (platform.name === "Nintendo Switch") {

                        if (nintendo === false) {
                            setListaPlataformas(oldArray => [...oldArray, (<li key={platform.id} info="Nintendo" data-bs-dismiss="modal" aria-label="Close">
                                <a className="dropdown-item background_nintendo" href="#">
                                    <img src={require(`../imgs/icones_plataformas/nintendo_icon.png`)} /> Nintendo</a></li>)])
                            nintendo = true;
                        }
                    }

                    if (platform.name === "PC (Microsoft Windows)" || platform.name === "Web browser" || platform.name === "Mac" || platform.name === "Linux") {

                        if (pc === false) {
                            setListaPlataformas(oldArray => [...oldArray, (<li key={platform.id} info="PC" data-bs-dismiss="modal" aria-label="Close">
                                <a className="dropdown-item background_pc" href="#">
                                    <img src={require(`../imgs/icones_plataformas/pc_icon.png`)} /> PC</a></li>)])
                            pc = true;
                        }
                    }

                    if (platform.name === "Android" || platform.name === "iOS") {

                        if (mobile === false) {
                            setListaPlataformas(oldArray => [...oldArray, (<li key={platform.id} info="Mobile" data-bs-dismiss="modal" aria-label="Close">
                                <a className="dropdown-item background_phone" href="#">
                                    <img src={require(`../imgs/icones_plataformas/phone_icon.png`)} /> Mobile</a></li>)])
                            mobile = true;
                        }
                    }


                })
            }
        })



    }



    function remover_tag(event) {

        for (let filtro of filters) {

            if (event.target.id === `tag_${filtro.id}`) {


                if (event.target.id === 'tag_game_filtro') {
                    set_img_game_filter(filtro.img_off)

                    if (document.getElementById('tag_platform_filtro')) {
                        document.getElementById('tag_platform_filtro').remove()
                        set_img_platform_filter(filters[1].img_off)
                    }

                    document.getElementById('platform_filtro').classList.add('filtro_inativo')
                    document.getElementById('platform_filtro').removeAttribute('data-bs-toggle')
                    document.getElementById('platform_filtro').removeAttribute('data-bs-target')
                }

                if (event.target.id === 'tag_platform_filtro') {
                    set_img_platform_filter(filtro.img_off)
                }

                if (event.target.id === 'tag_age_filtro') {
                    set_img_age_filter(filtro.img_off)
                }

                if (event.target.id === 'tag_language_filtro') {
                    set_img_language_filter(filtro.img_off)
                }

                if (event.target.id === 'tag_chat_filtro') {
                    set_img_chat_filter(filtro.img_off)
                }

                if (event.target.id === 'tag_people_filtro') {
                    set_img_people_filter(filtro.img_off)
                }

                if (event.target.id === 'tag_gender_filtro') {
                    set_img_gender_filter(filtro.img_off)
                }

                if (event.target.id === 'tag_time_filtro') {
                    set_img_time_filter(filtro.img_off)
                }


            }

        }

        event.currentTarget.remove()

        verificar_botao_post()

    }

    function verificar_botao_post() {

        const titulo_post_mobile = document.getElementById('titulo_post_mobile')
        const texto_post_mobile = document.getElementById('texto_post_mobile')
        const tags_section_mobile = document.getElementById('tags_post_mobile')

        // console.log('valor do titulo: '+ titulo_post_mobile.value)
        // console.log('valor do texto: '+ texto_post_mobile.value)

        if (tags_section_mobile.querySelectorAll('div').length === 8 && titulo_post_mobile.value.length > 1 && texto_post_mobile.value.length > 1) {
            set_state_btn_post('btn btn-primary w-100')
        } else {
            set_state_btn_post('btn btn-primary w-100 disabled')
        }


    }

    let filters_list = filters.map(filter => {


        if (filter.id === 'game_filtro') {



            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} data-bs-toggle="modal" data-bs-target={`#${filter.idModal}`} className="p-2" width="60px" src={require(`../imgs/icones_filtros/${img_game_filter}.png`)} alt={filter.title} />

            )
        }

        if (filter.id === 'platform_filtro') {
            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} className="p-2 filtro_inativo" width="60px" src={require(`../imgs/icones_filtros/${img_platform_filter}.png`)} alt={filter.title} />
            )
        }

        if (filter.id === 'age_filtro') {
            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} data-bs-toggle="modal" data-bs-target={`#${filter.idModal}`} className="p-2" width="60px" src={require(`../imgs/icones_filtros/${img_age_filter}.png`)} alt={filter.title} />
            )
        }

        if (filter.id === 'language_filtro') {
            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} data-bs-toggle="modal" data-bs-target={`#${filter.idModal}`} className="p-2" width="60px" src={require(`../imgs/icones_filtros/${img_language_filter}.png`)} alt={filter.title} />
            )
        }

        if (filter.id === 'chat_filtro') {
            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} data-bs-toggle="modal" data-bs-target={`#${filter.idModal}`} className="p-2" width="60px" src={require(`../imgs/icones_filtros/${img_chat_filter}.png`)} alt={filter.title} />
            )
        }

        if (filter.id === 'people_filtro') {
            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} data-bs-toggle="modal" data-bs-target={`#${filter.idModal}`} className="p-2" width="60px" src={require(`../imgs/icones_filtros/${img_people_filter}.png`)} alt={filter.title} />
            )
        }

        if (filter.id === 'gender_filtro') {
            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} data-bs-toggle="modal" data-bs-target={`#${filter.idModal}`} className="p-2" width="60px" src={require(`../imgs/icones_filtros/${img_gender_filter}.png`)} alt={filter.title} />
            )
        }

        if (filter.id === 'time_filtro') {
            return (
                <img onClick={event => Filtros_mobile_operacao(event)} key={filter.title} id={filter.id} data-bs-toggle="modal" data-bs-target={`#${filter.idModal}`} className="p-2" width="60px" src={require(`../imgs/icones_filtros/${img_time_filter}.png`)} alt={filter.title} />
            )
        }

    })


    let content = filters.map(filter => {

        if (filter.id === 'platform_filtro') {
            return (
                <div key={filter.idModal} className="modal fade modal_post" id={filter.idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5 className="modal-title fw-semibold" id="exampleModalLabel">{filter.title}</h5>
                                <p>{filter.subtitle}</p>
                                <ul id={filter.idOpcoesModal}>

                                    {listaPlataformas}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (filter.id === 'time_filtro') {
            return (
                <div key={filter.idModal} className="modal fade modal_post" id={filter.idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="close_modal_time" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5 className="modal-title fw-semibold" id="exampleModalLabel">{filter.title}</h5>
                                <p>{filter.subtitle}</p>
                                <ul id={filter.idOpcoesModal}>
                                    {filter.options.map(option => {
                                        return (
                                            <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close"><a
                                                className="dropdown-item" href="#">{option.name}</a></li>
                                        )
                                    })}

                                    <h5 className="mt-5 fw-semibold">Custom time</h5>
                                    <p className=" mb-3">Or choose a custom time</p>

                                    <div className="text-center fw-semibold">

                                        <input
                                            id="horas_input_mobile"
                                            min="0"
                                            max="23"
                                            placeholder="00"
                                            className="input"
                                            name="Horas"
                                            onBlur={handleChangeHours}
                                            type="number"
                                            maxLength="2"
                                            defaultValue={''} />

                                        <input disabled type="text" value=":" />
                                        <input
                                            id="minutos_input_mobile"
                                            min="0"
                                            max="59"
                                            placeholder="00"
                                            className="input"
                                            name="Minutos"
                                            onBlur={handleChangeHours}
                                            type="number"
                                            maxLength="2" />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (filter.id === 'game_filtro') {
            return (
                <div key={filter.idModal} className="modal fade modal_post" id={filter.idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5 className="modal-title fw-semibold" id="exampleModalLabel">{filter.title}</h5>
                                <p>{filter.subtitle}</p>
                                <ul id={filter.idOpcoesModal}>



                                    {data.map(element => {
                                        return (
                                            <li key={element.id} info={element.name} data-bs-dismiss="modal" aria-label="Close"><a
                                                className="dropdown-item" href="#">{element.name}</a></li>
                                        )
                                    })}




                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div key={filter.idModal} className="modal fade modal_post" id={filter.idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5 className="modal-title fw-semibold" id="exampleModalLabel">{filter.title}</h5>
                                <p>{filter.subtitle}</p>
                                <ul id={filter.idOpcoesModal}>


                                    {filter.options.map(option => {




                                        if (filter.id === 'language_filtro') {


                                            if (option.name !== 'Any language') {
                                                return (
                                                    <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close">
                                                        <a className="dropdown-item" href="#">
                                                            <img src={require(`../imgs/icones_paises/${option.icon}.png`)} /> {option.name}</a>
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close">
                                                        <a className="dropdown-item" href="#">{option.name}</a></li>
                                                )
                                            }

                                        }

                                        if (filter.id === 'chat_filtro') {

                                            if (option.name === 'Discord Call' || option.name === 'Discord Texting') {

                                                if (user_has_discord === true) {
                                                    return (
                                                        <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close">
                                                            <a className="dropdown-item background_discord" href="#"><i className="fa-brands fa-discord lh-base pe-2"></i> {option.name}</a></li>
                                                    )
                                                } else {
                                                    return (
                                                        <li className="opacity-50" key={option.key} info={option.key}>
                                                            <a className="dropdown-item background_discord" href="#"><i className="fa-brands fa-discord lh-base pe-2"></i> {option.name}</a></li>
                                                    )
                                                }


                                            }


                                            if (option.name === 'Chat via call') {
                                                return (
                                                    <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close">
                                                        <a className="dropdown-item" href="#">{option.name}</a></li>
                                                )
                                            }


                                            if (option.name === 'Chat via texting') {
                                                return (
                                                    <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close">
                                                        <a className="dropdown-item" href="#">{option.name}</a></li>
                                                )
                                            }

                                            if (option.name === 'No chat') {
                                                return (
                                                    <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close">
                                                        <a className="dropdown-item" href="#">{option.name}</a></li>
                                                )
                                            }

                                        }

                                        if (filter.id === 'age_filtro' || filter.id === 'people_filtro' || filter.id === 'gender_filtro' || filter.id === 'time_filtro') {
                                            return (
                                                <li key={option.key} info={option.key} data-bs-dismiss="modal" aria-label="Close">
                                                    <a className="dropdown-item" href="#">{option.name}</a></li>
                                            )
                                        }

                                    })}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }



    })

    const navigate = useNavigate();

    function fazer_post() {



        const titulo_post = document.getElementById('titulo_post_mobile')
        const texto_post = document.getElementById('texto_post_mobile')


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

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid_post = uid();
                const uid_user = user.uid
                await setDoc(doc(db, "posts", user.email), {
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
                    user: uid_user,
                    email: user.email,
                    id: uid_post
                });


                navigate("/Tryon-Project/feed")
            }
        })

    }


    return (
        <section id="section_post_mobile mt-5" className="d-lg-none">

            <p className="mb-0 opacity-25 px-2 small"> - Time according to GMT.</p>
            <p className="mb-2 opacity-50 px-2 small"> - Please select all option before posting.</p>

            <div className="row">

                <div className="col-2 pe-1 ps-2 mb-2">
                    <section id="filtros_post_mobile"
                        className="h-100 d-flex flex-column align-items-center justify-content-center">

                        {filters_list}

                    </section>
                </div>

                <div className="col-10 ps-1 pe-2">

                    <section id="textos_post_mobile" className="h-100">

                        <div className="position-relative">
                            <input placeholder="Title" maxLength="50" className="input mb-2" type="text"
                                name="titulo_post_mobile" id="titulo_post_mobile" />
                            <span id="contador_titulo_mobile">0/50</span>
                        </div>

                        <div className="position-relative h-100">
                            <textarea placeholder="Text" maxLength="200" name="texto_post_mobile"
                                id="texto_post_mobile"></textarea>
                            <span id="contador_texto_mobile">0/200</span>
                        </div>

                    </section>

                </div>

            </div>



            <div className=" px-2">
                <div className="accordion">
                    <div className="accordion-item" id="tags_post_mobile_section">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Selected Tags
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div className="accordion-body" id="tags_post_mobile">
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-12 px-2 py-3">
                <button id="botao_post_mobile" onClick={fazer_post} type="button" className={state_btn_post}>Post</button>
            </div>

            <div className="col-12 px-2 mb-5">
                <span className="text-primary fw-semibold">Reminder:</span><span className="opacity-50"> your post will expire
                    in 2 hours after posting.</span>
            </div>


            {content}



        </section>
    )

}