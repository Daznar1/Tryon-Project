import React, { useEffect, useState } from "react";
import Footer1 from "./footer1";
import Footer2 from "./footer2";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router";

export default function Footer() {

    let [footer, setFooter] = useState("")
    const { pathName } = useLocation();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setFooter(<Footer1 />)
            } else {
                setFooter(<Footer2 />)
            }
        })
    }, [pathName])

    return (
        <div>
            {footer}
        </div>
    )


}