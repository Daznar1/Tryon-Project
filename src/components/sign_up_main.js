import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, db } from './firebase'
import { uid } from 'uid'
import { storage } from "./firebase";
import { ref as ref_img, uploadBytes, getDownloadURL } from "firebase/storage";
import loading_svg from "../imgs/others/loading-svg1.svg";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import data from "../IGDBdata.json"
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Sign_up_main() {

    const [usersEmails, setUsersEmails] = useState([])


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState('Choose your gender')
    const [age, setAge] = useState('')
    const [language, setLanguage] = useState('Choose your language')
    const [title, setTitle] = useState('Choose your title')
    const [image, setImage] = useState(null);


    useEffect(() => {


        async function getAllEmails() {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                setUsersEmails(users => [...users, doc.id])
            });
        }

        getAllEmails()

    
        AOS.init();

    }, [])

    const [playstation, setPlaystation] = useState(false)
    const [nintendo, setNintendo] = useState(false)
    const [xbox, setXbox] = useState(false)
    const [pc, setPc] = useState(false)
    const [mobile, setMobile] = useState(false)

    const [favGame, setFavGame] = useState("")

    const [btn1, setBtn1] = useState(true)
    const [btn2, setBtn2] = useState(true)
    const [btn3, setBtn3] = useState(true)

    const navigate = useNavigate()

    const [signUpBtn, setSignUpBtn] = useState("Create Account")


    const account_info_section = document.getElementById('accountInfo')
    const additional_info_section = document.getElementById('additionalInfo')
    const preferences_section = document.getElementById('preferences')

    const submitBtn = document.getElementById('submitSignUp')


    // ACCOUNT INFO
    function account_info_inspection(e) {

        let all_correct = 0

        switch (e.target.id) {
            case 'user_email':
                setEmail(e.target.value)
                break;
            case 'username':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
        }


        // EMAIL VERIFICATION
        let email = document.getElementById('user_email')
        let value_email = email.value
        let warning_email_msg = document.querySelector('#msg_warning_email')
        let email_regex_verification = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        warning_email_msg.innerText = '';
        email.style.boxShadow = null;

        if (value_email) {
            if (value_email.match(email_regex_verification)) {
                let emailValid = false
                usersEmails.forEach(userEmail => {
                    if (value_email === userEmail) {
                        warning_email_msg.innerText = 'Email already in use.';
                        email.style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem';
                        all_correct = 0
                    } else if (emailValid === false) {
                        emailValid = true
                        all_correct = all_correct + 0.5
                        warning_email_msg.innerHTML = '<i class="fa-solid fa-check check"></i>';
                        email.style.boxShadow = null;
                    }
                })

            } else if (value_email.length > 0) {
                warning_email_msg.innerText = 'Enter valid email';
                email.style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem';
            }
        }

        // USERNAME VERIFICATION
        let username = document.getElementById('username')
        let value_username = username.value
        let warning_username_msg = document.querySelector('#msg_warning_username')
        warning_username_msg.innerText = '';
        username.style.boxShadow = null;

        if (value_username) {
            if (value_username.length >= 3) {
                all_correct = all_correct + 0.25
                warning_username_msg.innerHTML = '<i class="fa-solid fa-check check"></i>';
                username.style.boxShadow = null;
            } else if (value_username.length > 0) {
                warning_username_msg.innerText = 'Please write more than 3 characters';
                username.style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem';
            }
        }

        // PASSWORD VERIFICATION
        let password = document.getElementById('password')
        let value_password = password.value
        let warning_password_msg = document.querySelector('#msg_warning_password')
        warning_password_msg.innerText = '';
        password.style.boxShadow = null;

        if (value_password) {
            if (value_password.length >= 8) {
                all_correct = all_correct + 0.25
                warning_password_msg.innerHTML = '<i class="fa-solid fa-check check"></i>';
                password.style.boxShadow = null;
            } else if (value_password.length > 0) {
                warning_password_msg.innerText = 'Please write more than 8 characters';
                password.style.boxShadow = 'rgb(255 0 0 / 25%) 0px 0px 1.5rem';
            }
        }


        if (all_correct === 1) {
            document.getElementById('next_button_1').classList.remove('btn-secondary')
            document.getElementById('next_button_1').classList.add('btn-primary')
            setBtn1(false)
        } else {
            document.getElementById('next_button_1').classList.remove('btn-primary')
            document.getElementById('step2').classList.remove('visited_info')
            document.getElementById('step3').classList.remove('visited_info')
            document.getElementById('next_button_1').classList.add('btn-secondary')
            setBtn1(true)
        }

    }


    // ADDITIONAL INFO
    function start_additional_info() {
        account_info_section.classList.add('visually-hidden')
        additional_info_section.classList.remove('visually-hidden')
        document.getElementById('step2').classList.add('visited_info')
        document.getElementById('step2').classList.add('active_info')
        document.getElementById('step1').classList.remove('active_info')
        document.getElementById('step1').classList.add('visited_info')
        follow_progress()

    }

    function additional_info_inspection(e) {

        let all_correct = 0

        switch (e.target.id) {
            case 'user_gender':
                setGender(e.target.value)
                break;
            case 'user_age':
                setAge(e.target.value)
                break;
            case 'user_language':
                setLanguage(e.target.value)
                break;
            case 'user_title':
                setTitle(e.target.value)
                break;
            case "user_img":
                setImage(e.target.value)
                break;
        }


        // GENDER VERIFICATION
        let gender = document.getElementById('user_gender')
        let value_gender = gender.value
        let warning_gender_msg = document.querySelector('#msg_warning_gender')
        warning_gender_msg.innerHTML = "";
        if (value_gender != 'Choose your gender') {
            warning_gender_msg.innerHTML = '<i class="fa-solid fa-check check"></i>';
            gender.style.color = 'white';
            all_correct = all_correct + 0.25
        }


        // EMAIL VERIFICATION
        let age = document.getElementById('user_age')
        let value_age = age.value
        let warning_age_msg = document.querySelector('#msg_warning_age')
        warning_age_msg.innerHTML = "";
        if (value_age != '') {
            warning_age_msg.innerHTML = '<i class="fa-solid fa-check check"></i>';
            all_correct = all_correct + 0.25
        }


        // LANGUAGE VERIFICATION
        let language = document.getElementById('user_language')
        let value_language = language.value
        let warning_language_msg = document.querySelector('#msg_warning_language')
        warning_language_msg.innerHTML = "";
        if (value_language != 'Choose your language') {
            warning_language_msg.innerHTML = '<i class="fa-solid fa-check check"></i>';
            language.style.color = 'white';
            all_correct = all_correct + 0.25
        }


        // TITLE VERIFICATION
        let title = document.getElementById('user_title')
        let value_title = title.value
        let warning_title_msg = document.querySelector('#msg_warning_title')
        warning_title_msg.innerHTML = "";
        if (value_title != 'Choose your title') {
            warning_title_msg.innerHTML = '<i class="fa-solid fa-check check"></i>';
            title.style.color = 'white';
            all_correct = all_correct + 0.25
        }

        // IMAGE VERIFICATION
        if (e.target.id == "user_img") {
            if (e.target.files[0]) {
                setImage(e.target.files[0]);
            }
        }


        if (all_correct === 1) {
            document.getElementById('next_button_2').classList.remove('btn-secondary')
            document.getElementById('next_button_2').classList.add('btn-primary')
            setBtn2(false)
        } else {
            document.getElementById('step3').classList.remove('visited_info')
            document.getElementById('next_button_2').classList.remove('btn-primary')
            document.getElementById('next_button_2').classList.add('btn-secondary')
            setBtn2(true)
        }


    }

    // PREFERENCES
    function start_preferences() {
        additional_info_section.classList.add('visually-hidden')
        preferences_section.classList.remove('visually-hidden')
        submitBtn.classList.remove('visually-hidden')
        document.getElementById('step3').classList.add('visited_info')
        document.getElementById('step3').classList.add('active_info')
        document.getElementById('step2').classList.remove('active_info')
        document.getElementById('step2').classList.add('visited_info')
    }


    function preferences_inspection(e) {

        let all_correct = 0
        let game = document.getElementById('favorite_game').value;


        switch (e.target.id) {
            case 'playstation_platform':
                if (playstation === false) {
                    setPlaystation(true)
                } else {
                    setPlaystation(false)
                }
                break;
            case 'nintendo_platform':
                if (nintendo === false) {
                    setNintendo(true)
                } else {
                    setNintendo(false)
                }
                break;
            case 'xbox_platform':
                if (xbox === false) {
                    setXbox(true)
                } else {
                    setXbox(false)
                }
                break;
            case 'pc_platform':
                if (pc === false) {
                    setPc(true)
                } else {
                    setPc(false)
                }
                break;
            case 'mobile_platform':
                if (mobile === false) {
                    setMobile(true)
                } else {
                    setMobile(false)
                }
                break;


        }

        let platformCheckBoxes = document.querySelectorAll('.user_platforms')

        for (let checkbox of platformCheckBoxes) {
            if (checkbox.checked === true && game != "") {
                setFavGame(game)
                all_correct = 1
            }
        }


        if (all_correct === 1) {
            submitBtn.classList.remove('btn-secondary')
            submitBtn.classList.add('btn-primary')
            setBtn3(false)
        } else {
            submitBtn.classList.remove('btn-primary')
            submitBtn.classList.add('btn-secondary')
            setBtn3(true)
        }

    }

    function follow_progress() {

        let progress_steps = [
            document.getElementById('step1'),
            document.getElementById('step2'),
            document.getElementById('step3')
        ]

        for (let step of progress_steps) {
            step.addEventListener('click', (event) => {

                if (event.currentTarget.classList.contains('visited_info')) {
                    account_info_section.classList.add('visually-hidden')
                    additional_info_section.classList.add('visually-hidden')
                    preferences_section.classList.add('visually-hidden')

                    switch (event.currentTarget.id) {
                        case 'step1':
                            account_info_section.classList.remove('visually-hidden')
                            break;
                        case 'step2':
                            additional_info_section.classList.remove('visually-hidden')
                            break;
                        case 'step3':
                            preferences_section.classList.remove('visually-hidden')
                            break;
                    }

                    for (step of progress_steps) {
                        step.classList.remove('active_info')
                    }

                    event.currentTarget.classList.add('active_info')

                    if (preferences_section.classList.contains('visually-hidden')) {
                        document.getElementById('submitSignUp').classList.add('visually-hidden')
                    } else {
                        document.getElementById('submitSignUp').classList.remove('visually-hidden')
                    }


                }

            })
        }

    }


    // Registro do utilizador
    const sign_up = async () => {

        setSignUpBtn(<div>Loading... <img src={loading_svg}></img></div>);
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                sign_in()
            })

            .catch((error) => {
                console.log(error.message)
                setEmail("")
                setPassword("")
            })
    }

    //Quando registado com sucesso entra automaticamente na sua conta
    const sign_in = () => {
        let signedIn = true
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (image === null && signedIn) {
                    writeToFirestore("")
                } else {
                    storageImage();
                }


            })
            .catch((err) => console.log(err.message))
    }


    const storageImage = () => {
       
        const uid_user = auth.currentUser.uid

        const imageRef = ref_img(storage, `userImage_${uid_user}`);

        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        writeToFirestore(url);
                    })
                    .catch(error => {
                        console.log(error.message, "error img url")
                    });
                setImage(null);
            })
            .catch(error => {
                console.log(error.message, "error aqui")
            });





    };

    const writeToFirestore = async (img_url) => {
        const uuid = uid();
        await setDoc(doc(db, "users", email.toLocaleLowerCase()), {
            username: username,
            email: email.toLowerCase(),
            gender: gender,
            age: age,
            language: language,
            usernameDiscord: "",
            idDiscord: "",
            title: title,
            favGame: favGame,
            creation: new Date(),
            img: img_url,
            platforms: {
                playstation: playstation,
                nintendo: nintendo,
                xbox: xbox,
                pc: pc,
                mobile: mobile,
            },
            uuid,
        })

        setEmail("");
        setPassword("");
        setUsername("");
        setGender('Choose your gender');
        setAge('');
        setLanguage('Choose your language');
        setTitle('Choose your title');
        setImage(null);
        setPlaystation(false);
        setNintendo(false);
        setXbox(false);
        setPc(false);
        setMobile(false);

        navigate('/Tryon-Project/discord')

    }





    return (

        <section data-aos="fade-up" data-aos-duration="900" data-aos-easing="ease-in-back" className="row justify-content-center align-content-center pt-5" style={{ marginBottom: '5rem' }}>

            <div id="sign_up_section" className="sign_section h-auto py-5 px-3 px-md-5 py-md-5 col-12 col-md-10 col-lg-7 col-xl-9">

                <div className="w-100">
                    <h1>Sign Up</h1>
                    <hr />

                    <section className="sign_up_progress row">
                        <div id="step1" className="col-4 active_info">
                            <h2><span className="d-sm-none">Step 1</span><span className="d-none d-sm-block">Account Info</span></h2>
                            <hr />
                        </div>
                        <div id="step2" className="col-4">
                            <h2><span className="d-sm-none">Step 2</span><span className="d-none d-sm-block">Additional Info</span></h2>
                            <hr />
                        </div>
                        <div id="step3" className="col-4">
                            <h2><span className="d-sm-none">Step 3</span><span className="d-none d-sm-block">Preferences</span></h2>
                            <hr />
                        </div>
                    </section>

                    <section id="accountInfo">
                        <div>
                            <div>
                                <label htmlFor="user_email" className="d-block label">Email<span id="msg_warning_email"></span></label>
                                <input placeholder="Enter your email here" className="input" type="email" name="user_email"
                                    id="user_email" value={email} onChange={account_info_inspection} />
                            </div>

                            <div>
                                <label htmlFor="username" className="d-block label">Username<span id="msg_warning_username"></span></label>
                                <input placeholder="Enter your username here" value={username} onChange={account_info_inspection} className="input" type="text" name="user_name"
                                    id="username" />
                            </div>

                            <div>
                                <label htmlFor="password" className="d-block label">Password<span id="msg_warning_password"></span></label>
                                <input placeholder="Enter your password here" className="input" type="password"
                                    name="user_password" id="password" value={password} onChange={account_info_inspection} />
                            </div>

                            <button disabled={btn1} onClick={start_additional_info} type="button" id="next_button_1"
                                className="btn btn-secondary d-block mx-auto ms-sm-auto me-sm-0 mt-3">Next</button>


                        </div>

                        <div className="text-center mt-5">
                            <div className="retangulo_sign_in mb-4 opacity-50"></div>

                            <p className="mb-0"><span className="opacity-50">Already have an account? </span><br className="d-block d-sm-none" /><Link to={'/Tryon-Project/sign_in'} className="text-primary fw-semibold text-decoration-none" href="#">Sign in.</Link></p>
                        </div>

                    </section>

                    <section id="additionalInfo" className="visually-hidden">
                        <div>
                            <div>
                                <label htmlFor="user_gender" className="d-block label">Gender<span id="msg_warning_gender"></span></label>
                                <select defaultValue={gender} onChange={additional_info_inspection} id="user_gender" name="user_gender" className="form-select" aria-label="user gender">
                                    <option value={'Choose your gender'} disabled hidden>Choose your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-Binary">Non-Binary</option>
                                </select>
                            </div>


                            <div>
                                <label htmlFor="user_age" className="d-block label">Birth Date<span id="msg_warning_age"></span></label>
                                <input id="user_age" name="user_age" placeholder="day/month/year" type="text" className="input" value={age}
                                    onBlur={(input) => input.target.type = 'text'} onFocus={(input) => input.target.type = 'date'} onChange={additional_info_inspection} />
                            </div>


                            <div>
                                <label htmlFor="user_language" className="d-block label">Preferred Language<span id="msg_warning_language"></span></label>
                                <select defaultValue={language} onChange={additional_info_inspection} id="user_language" name="user_language" className="form-select"
                                    aria-label="user language">
                                    <option value="Choose your language" disabled hidden>Choose your language</option>
                                    <option value="English">English</option>
                                    <option value="Portuguese">Portuguese</option>
                                    <option value="French">French</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Italian">Italian</option>
                                </select>

                            </div>
                            <div>

                                <label htmlFor="user_title" className="d-block label">Title<span id="msg_warning_title"></span></label>
                                <select defaultValue={title} onChange={additional_info_inspection} id="user_title" name="user_title" className="form-select" aria-label="Title">
                                    <option value='Choose your title' disabled hidden>Choose your title</option>
                                    <option value="The King">The King</option>
                                    <option value="The Queen">The Queen</option>
                                    <option value="The Adventurer">The Adventurer</option>
                                    <option value="The Pro Player">The Pro Player</option>
                                    <option value="The Troller">The Troller</option>
                                    <option value="Pro At Being Noob">Pro At Being Noob</option>
                                    <option value="360 No Scope">360 No Scope</option>
                                </select>
                            </div>


                            <div id="image_upload">
                                <label htmlFor="user_img" className="d-block label">Profile Picture <span
                                    className="opacity-50 small ps-1">Upload is optional</span><span id="msg_warning_picture"></span></label>
                                <input id="user_img" className="input" type="file" name="user_img" accept="image/png, image/jpeg" onChange={additional_info_inspection} />
                            </div>

                            <button disabled={btn2} onClick={start_preferences} type="button" id="next_button_2"
                                className="btn btn-secondary d-block mx-auto ms-sm-auto me-sm-0 mt-3">Next</button>

                        </div>
                    </section>

                    <section id="preferences" className="visually-hidden">

                        <div>

                            <div className="mb-4">
                                <label className="d-block label">Select the platforms you play</label>

                                <section className="checkbox_section justify-content-center flex-column flex-sm-row">

                                    <input defaultChecked={playstation} onClick={preferences_inspection} className="user_platforms" type="checkbox" id="playstation_platform" name="playstation_platform"
                                        value="true" />
                                    <div>
                                        <label htmlFor="playstation_platform">Playstation
                                            <span className="checkmark" id="playstation_icon_sign_up"></span>
                                        </label>
                                    </div>

                                    <input defaultChecked={nintendo} onClick={preferences_inspection} className="user_platforms" type="checkbox" id="nintendo_platform" name="nintendo_platform"
                                        value="true" />
                                    <div>
                                        <label htmlFor="nintendo_platform">Nintendo
                                            <span className="checkmark" id="nintendo_icon_sign_up"></span>
                                        </label>
                                    </div>

                                    <div className="break m-0 p-0 border-0 d-xxl-none"></div>

                                    <input defaultChecked={xbox} onClick={preferences_inspection} className="user_platforms" type="checkbox" id="xbox_platform" name="xbox_platform" value="true" />

                                    <div>
                                        <label htmlFor="xbox_platform">Xbox
                                            <span className="checkmark" id="xbox_icon_sign_up"></span>
                                        </label>
                                    </div>

                                    <input defaultChecked={pc} onClick={preferences_inspection} className="user_platforms" type="checkbox" id="pc_platform" name="pc_platform" value="true" />

                                    <div>
                                        <label htmlFor="pc_platform">PC
                                            <span className="checkmark" id="pc_icon_sign_up"></span>
                                        </label>
                                    </div>

                                    <input defaultChecked={mobile} onClick={preferences_inspection} className="user_platforms" type="checkbox" id="mobile_platform" name="mobile_platform" value="true" />

                                    <div>
                                        <label htmlFor="mobile_platform">Mobile
                                            <span className="checkmark" id="mobile_icon_sign_up"></span>
                                        </label>
                                    </div>


                                </section>



                                <div>
                                    <label className="d-block label">Favorite Games</label>
                                    <select onChange={preferences_inspection} defaultValue={""} id="favorite_game" className="form-select" aria-label="Language">
                                        <option value="" disabled hidden>Choose your favorite game</option>
                                        {data.map(game => {
                                            return (
                                                <option key={game.id} value={game.name}>{game.name}</option>
                                            )
                                        })}

                                    </select>

                                </div>


                                <button disabled={btn3} id="submitSignUp" onClick={sign_up} className="btn btn-secondary visually-hidden mx-auto mt-5 w-100" type="button">{signUpBtn}</button>

                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </section>


    )

}


