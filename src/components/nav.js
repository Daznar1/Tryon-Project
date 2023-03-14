import React, { useEffect, useState } from "react";
import Navbar_session from "./navbar_session";
import Navbar1 from "./navbar";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router";

export default function Nav() {

    let [navbar, setNavbar] = useState("")
    const { pathName } = useLocation();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setNavbar(<Navbar_session />)
            } else {
                setNavbar(<Navbar1 />)
            }
        })
    }, [pathName])

    return (
        <div>
            {navbar}
        </div>
    )


}