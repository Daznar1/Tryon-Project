import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../components/firebase'
import { onAuthStateChanged } from "firebase/auth";

import Profile_main from "../components/profile_main";
import { useParams } from "react-router-dom";


export default function Profile_user() {


    let [data, setData] = useState(null)
    let [loaded, setLoaded] = useState(false)

    const { id } = useParams();

    onAuthStateChanged(auth, async (user) => {

        const docSnap = await getDoc(doc(db, "users", id));

        if (user) {

            if (data === null && loaded === false) {
                setData(docSnap.data())
                setLoaded(true)
            }

            if (id === user.email && loaded === true || id === user.email && loaded === 'other_user_page_true') {
                setData(docSnap.data())
                setLoaded('user_page_true')
            }

            if (id != user.email && loaded === 'user_page_true') {
                setData(docSnap.data())
                setLoaded('other_user_page_true')
            }


        } else {
            if (data === null) {
                setData(docSnap.data())
                setLoaded('other_user_page_true')
            }

        }

    })



    return (
        <Profile_main {...data} />
    )




}