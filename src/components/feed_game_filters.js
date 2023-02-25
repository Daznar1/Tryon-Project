import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Link,
    useSearchParams,
    useLocation
} from "react-router-dom";
import filters from "./post_mobile_data";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import Feed_game_post from "./feed_game_post";
import Masonry from "react-responsive-masonry";
import { query, orderBy, limit } from "firebase/firestore";
import data from "../IGDBdata.json"



export default function Feed_game_filters(props) {

    let noPosts = <div style={{ height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><i className="fa-regular fa-circle-xmark opacity-25 fa-3x mb-3 my-5"></i> <h5 className="mb-5 opacity-25 fw-semibold ">No posts yet. Make one!</h5></div>

    useEffect(() => {
        setGameValue("")
        setPlatformValue("")
        setAgeValue("")
        setLanguageValue("")
        setChatValue("")
        setPeopleValue("")
        setGenderValue("")
        setStartingValue("")
    }, [])

    let [gameValue, setGameValue] = useState("")
    let [platformValue, setPlatformValue] = useState("")
    let [ageValue, setAgeValue] = useState("")
    let [languageValue, setLanguageValue] = useState("")
    let [chatValue, setChatValue] = useState("")
    let [peopleValue, setPeopleValue] = useState("")
    let [genderValue, setGenderValue] = useState("")
    let [startingValue, setStartingValue] = useState("")


    let [posts, setPosts] = useState([])

    const location = useLocation();

    let gameName;

    if (location.pathname !== '/Tryon-Project/feed' && document.querySelector('.titulo_jogo_header')) {
        gameName = document.querySelector('.titulo_jogo_header').textContent
    }

    useEffect(() => {

        async function checkPosts() {


            setPosts([])


            const queryPost = query(await getDocs(collection(db, "posts"), orderBy('date')))
            if (queryPost) {
                queryPost.forEach((docs) => {
                    let post_info = docs.data()
                    let post_check_game = true
                    let post_check_platform = true
                    let post_check_age = true
                    let post_check_language = true
                    let post_check_chat = true
                    let post_check_people = true
                    let post_check_gender = true
                    let post_check_time = true
                    let post_check_lifetime = true

                    let date = new Date

                    let minutes = (Math.abs(date.getTime() - post_info.date.toDate().getTime()) / 1000) / 60;

                    if (minutes >= 120) {

                        post_check_lifetime = false

                        async function movePost() {

                            await setDoc(doc(db, "postsDeleted", post_info.email), {
                                title: post_info.title,
                                text: post_info.text,
                                game: post_info.game,
                                platform: post_info.platform,
                                age: post_info.age,
                                language: post_info.language,
                                chat: post_info.chat,
                                people: post_info.people,
                                gender: post_info.gender,
                                time: post_info.time,
                                date: post_info.date.toDate(),
                                deleteOn: date,
                                user: post_info.user,
                                email: post_info.email,
                                id: post_info.id
                            });

                            await deleteDoc(doc(db, "posts", post_info.email));
                        }

                        movePost()

                    }



                    if (location.pathname === '/Tryon-Project/feed') {
                        // console.log(post_info.game)
                        // console.log(gameValue)
                        if (gameValue != "") {
                            if (post_info.game === gameValue) {
                                post_check_game = true
                            } else {
                                post_check_game = false
                            }
                        }
                    } else {
                        if (post_info.game === gameName) {
                            post_check_game = true
                        } else {
                            post_check_game = false
                        }
                    }

                    if (platformValue != "") {
                        if (post_info.platform === platformValue) {
                            post_check_platform = true
                        } else {
                            post_check_platform = false
                        }
                    }

                    if (ageValue != "") {
                        if (post_info.age === ageValue) {
                            post_check_age = true
                        } else {
                            post_check_age = false
                        }
                    }

                    if (languageValue != "") {
                        if (post_info.language === languageValue) {
                            post_check_language = true
                        } else {
                            post_check_language = false
                        }
                    }

                    if (chatValue != "") {
                        if (post_info.chat === chatValue) {
                            post_check_chat = true
                        } else {
                            post_check_chat = false
                        }
                    }

                    if (peopleValue != "") {
                        if (post_info.people === peopleValue) {
                            post_check_people = true
                        } else {
                            post_check_people = false
                        }
                    }


                    if (genderValue != "") {
                        if (post_info.gender === genderValue) {
                            post_check_gender = true
                        } else {
                            post_check_gender = false
                        }
                    }

                    if (startingValue != "") {

                        post_check_time = false

                        if (post_info.time === 'Player starting any time' && startingValue === 'Any time') {
                            post_check_time = true
                        }

                        if (post_info.time === 'Player starting soon' && startingValue === 'Soon') {
                            post_check_time = true
                        }

                        if (post_info.time === 'Player starting in some hours' && startingValue === 'In some hours') {
                            post_check_time = true
                        }

                        if (post_info.time != 'Player starting any time' && post_info.time != 'Player starting soon' && post_info.time != 'Player starting in some hours' && startingValue === 'Custom Time') {
                            post_check_time = true
                        }

                    }

                    if (post_check_game === true && post_check_platform === true && post_check_age == true && post_check_language === true && post_check_chat === true && post_check_people == true && post_check_gender === true && post_check_time === true && post_check_lifetime === true) {
                        setPosts(posts => [...posts, <Feed_game_post {...post_info} />])
                    }


                })
            }

        }

        checkPosts()



    }, [gameValue, platformValue, ageValue, languageValue, chatValue, peopleValue, genderValue, startingValue])

    function clearFilters() {
        setGameValue("")
        setPlatformValue("")
        setAgeValue("")
        setLanguageValue("")
        setChatValue("")
        setPeopleValue("")
        setGenderValue("")
        setStartingValue("")
        document.querySelectorAll('input:checked').forEach(element => {
            element.checked = false
        })
    }

    let [games, setGames] = useState([])
    let [platforms, setPlatforms] = useState([])
    let [ages, setAges] = useState([])
    let [languages, setLanguages] = useState([])
    let [chats, setChats] = useState([])
    let [peoples, setPeoples] = useState([])
    let [genders, setGenders] = useState([])
    let [starting, setStarting] = useState([])


    const searchPosts = (event) => {

        let text = event.target.dataset.text // Texto da opção que selecionei
        let filter = event.target.dataset.filter // Filtro a que pertence da opção que selecionei
        let value = event.target.checked // Se está ativo ou não

        if (filter === 'game') {
            if (value === true) {
                setGameValue(text)
            } else {
                setGameValue("")
            }
        }


        if (filter === 'platform') {
            if (value === true) {
                setPlatformValue(text)
            } else {
                setPlatformValue("")
            }
        }


        if (filter === 'age') {
            if (value === true) {
                setAgeValue(text)
            } else {
                setAgeValue('')
            }
        }


        if (filter === 'language') {
            if (value === true) {
                setLanguageValue(text)
            } else {
                setLanguageValue("")
            }
        }


        if (filter === 'chat') {
            if (value === true) {
                setChatValue(text)
            } else {
                setChatValue("")
            }
        }


        if (filter === 'people') {
            if (value === true) {
                setPeopleValue(text)
            } else {
                setPeopleValue("")
            }
        }


        if (filter === 'gender') {
            if (value === true) {
                setGenderValue(text)
            } else {
                setGenderValue("")
            }
        }


        if (filter === 'starting') {
            if (value === true) {
                setStartingValue(text)
            } else {
                setStartingValue("")
            }
        }

    }


    if (games.length === 0 && location.pathname === '/Tryon-Project/feed') {
        data.map(game => {
            setGames(array => [...array, <li key={game.id} className="form-check">
                <input data-filter='game' data-text={game.name} onChange={searchPosts} name="games_radios" className="form-check-input" type="radio" id="games" />
                <label className="form-check-label" htmlFor="games">
                    {game.name}
                </label>
            </li>])
        })
    }

    if (platforms.length === 0) {
        filters.map(filter => {
            if (filter.id === 'platform_filtro') {
                filter.options.map(option => {
                    setPlatforms(array => [...array, <li key={option.name} className="form-check">
                        <input data-filter='platform' data-text={option.name} onChange={searchPosts} className="form-check-input" name="platforms_radios" type="radio" id="platforms" />
                        <label className="form-check-label" htmlFor="platforms">
                            {option.name}
                        </label>
                    </li>])
                })
            }
        })
    }

    if (ages.length === 0) {
        filters.map(filter => {
            if (filter.id === 'age_filtro') {
                filter.options.map(option => {
                    setAges(array => [...array, <li key={option.name} className="form-check">
                        <input data-filter='age' data-text={option.name} onChange={searchPosts} className="form-check-input" name="ages_radio" type="radio" id="ages" />
                        <label className="form-check-label" htmlFor="ages">
                            {option.name}
                        </label>
                    </li>])
                })
            }
        })
    }

    if (languages.length === 0) {
        filters.map(filter => {
            if (filter.id === 'language_filtro') {
                filter.options.map(option => {
                    setLanguages(array => [...array, <li key={option.name} className="form-check">
                        <input data-filter='language' data-text={option.name} onChange={searchPosts} name="languages_radio" type="radio" className="form-check-input" id="languages" />
                        <label className="form-check-label" htmlFor="languages">
                            {option.name}
                        </label>
                    </li>])
                })
            }
        })
    }

    if (chats.length === 0) {
        filters.map(filter => {
            if (filter.id === 'chat_filtro') {
                filter.options.map(option => {
                    setChats(array => [...array, <li key={option.name} className="form-check">
                        <input data-filter='chat' data-text={option.name} onChange={searchPosts} className="form-check-input" name="chats_radio" type="radio" id="chats" />
                        <label className="form-check-label" htmlFor="chats">
                            {option.name}
                        </label>
                    </li>])
                })
            }
        })
    }

    if (peoples.length === 0) {
        filters.map(filter => {
            if (filter.id === 'people_filtro') {
                filter.options.map(option => {
                    setPeoples(array => [...array, <li key={option.name} className="form-check">
                        <input data-filter='people' data-text={option.name} onChange={searchPosts} className="form-check-input" name="peoples_radio" type="radio" id="peoples" />
                        <label className="form-check-label" htmlFor="peoples">
                            {option.name}
                        </label>
                    </li>])
                })
            }
        })
    }

    if (genders.length === 0) {
        filters.map(filter => {
            if (filter.id === 'gender_filtro') {
                filter.options.map(option => {
                    setGenders(array => [...array, <li key={option.name} className="form-check">
                        <input data-filter='gender' data-text={option.name} onChange={searchPosts} className="form-check-input" name="genders_radio" type="radio" id="genders" />
                        <label className="form-check-label" htmlFor="genders">
                            {option.key}
                        </label>
                    </li>])
                })
            }
        })
    }

    if (starting.length === 0) {
        filters.map(filter => {
            if (filter.id === 'time_filtro') {
                filter.options.map(option => {
                    setStarting(array => [...array, <li key={option.name} className="form-check">
                        <input data-filter='starting' data-text={option.name} onChange={searchPosts} className="form-check-input" name="starting_radio" type="radio" id="starting" />
                        <label className="form-check-label" htmlFor="starting">
                            {option.key}
                        </label>
                    </li>])
                })
            }
        })
    }

    let numberOfPosts
    const windowWidth = window.innerWidth

    if (windowWidth < 576) {
        numberOfPosts = 1;
    }

    if (windowWidth >= 576 && windowWidth < 768) {
        numberOfPosts = 1
    }


    if (windowWidth >= 768 && windowWidth < 1200) {
        numberOfPosts = 2
    }

    if (windowWidth >= 1200) {
        numberOfPosts = 3
    }

    return (
        <section className="row mt-4 justify-content-center text-center mx-auto">

            <div className="mt-4 mb-5">
                <Link to='/Tryon-Project/post' className="btn btn-primary btn_make_a_post mt-4 mb-2 text-decoration-none d-flex justify-content-center align-items-center">
                    Make a Post <i style={{ marginLeft: '0.5rem' }} className="fa-regular fa-square-plus"></i>
                </Link>
            </div>

            <article className="filters_post">

                {location.pathname === '/Tryon-Project/feed' ? <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Games
                    </button>

                    <ul style={{ overflowY: 'scroll' }} className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {games}
                    </ul>
                </div> : ''}


                <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Platform
                    </button>

                    <ul className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {platforms}
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Age
                    </button>

                    <ul className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {ages}
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Language
                    </button>

                    <ul className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {languages}
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Chat
                    </button>

                    <ul className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {chats}
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        People
                    </button>

                    <ul className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {peoples}
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Gender
                    </button>

                    <ul className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {genders}
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="btn_filter_feed dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Time
                    </button>

                    <ul className="dropdown-menu opcoes_filtros_feed px-2 rounded-0" aria-labelledby="dropdownMenuButton1">
                        {starting}


                        <li key='Custom Time' className="form-check">
                            <input data-filter='starting' data-text='Custom Time' onChange={searchPosts} className="form-check-input" name="starting_radio" type="radio" id="starting" />
                            <label className="form-check-label" htmlFor="starting">
                                Custom Time
                            </label>

                        </li>
                    </ul>
                </div>


                <button onClick={clearFilters} className="btn_clear_filter_feed"><i className="fa-solid fa-filter-circle-xmark"></i></button>


            </article>

            <section className="row mt-3 p-0">
                <div className="col-12 w-100 borda_filtros_feed"></div>
            </section>

            <section style={{ maxWidth: '1900px', marginBottom:"7rem"}} className="postsFeed_section">
                {posts.length > 0 ? <Masonry columnsCount={numberOfPosts} gutter="10px">{posts}</Masonry> : noPosts}
            </section>

        </section>
    )
}