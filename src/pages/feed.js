import { BrowserRouter as Link } from 'react-router-dom';
import Feed_game_filters from '../components/feed_game_filters';
import Feed_game_post from '../components/feed_game_post';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Feed() {

    useEffect(() => {
        AOS.init();
    }, [])

    const { search } = useLocation();

    return (
        <main className='container-fluid'>
            <header className="header_feed">
                <h1 data-aos="fade-up" data-aos-duration="1000" className="titulo_header">FEED</h1>
                <p data-aos="fade-up" data-aos-duration="1000"  className="texto_header"><span>Find new players</span> to play with and have a lot of <span>fun
                    together.</span></p>
            </header>
            <Feed_game_filters currentUrl={search} />
        </main>
    )
}