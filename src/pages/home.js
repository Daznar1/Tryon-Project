import React, { useEffect } from "react";
import Homepage_header from "../components/homepage_header";
import Homepage_slider from "../components/homepage_slider";
import Homepage_hero from "../components/homepage_hero";
import Homepage_games from "../components/homepage_games";
import Homepage_feed from "../components/homepage_feed";
import Discord_hero from "../components/discord_hero";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function Home() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let code = searchParams.get('code')
        if (code != null) {
            navigate(`/Tryon-Project/discord?code=${code}`)
        }
    }, [])



    return (
        <main className="container-fluid">
            <Homepage_header />
            <Homepage_slider />
            <Homepage_hero />
            <Homepage_games />
            <Homepage_feed />
            <Discord_hero />
        </main>
    )

}

export default Home