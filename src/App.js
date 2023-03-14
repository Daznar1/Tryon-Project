import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './css/App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import { HashRouter } from "react-router-dom";

import { Component } from 'react';

import Nav from './components/nav';
import Footer from './components/footer';

import Sign_in from './pages/sign_in';
import Sign_up from './pages/sign_up';
import Home from './pages/home';
import Profile_user from './pages/profile';
import Games from './pages/games'
import About_game from './pages/about_game';
import Feed_game from './pages/feed_game';
import Feed from './pages/feed';
import Post from './pages/post'
import About_us from './pages/about_us';
import Discord from './pages/connect_discord';
import ScrollToTop from './components/scrollToTop';
import ERROR404 from './components/404';




class App extends Component {

  render() {

    let x = new Date
    let y = new Date('Sun Jan 15 2023 10:20:00 GMT+0000 (Hora padrão da Europa Ocidental)')

    let minutes = (Math.abs(x.getTime() - y.getTime()) / 1000) / 60;
    

    return (

      <Router>
        <ScrollToTop />
        <div>
          <Nav />
          <Routes>
            <Route exact path='/Tryon-Project/game_list' element={< Games />}></Route>
            <Route exact path='/Tryon-Project' element={< Home />}></Route>
            <Route exact path='/Tryon-Project/home' element={< Home />}></Route>
            <Route exact path='/Tryon-Project/sign_in' element={< Sign_in />}></Route>
            <Route exact path='/Tryon-Project/sign_up' element={< Sign_up />}></Route>
            <Route exact path='/Tryon-Project/about_us' element={< About_us />}></Route>
            <Route exact path='/Tryon-Project/about_game/:id' element={< About_game />}></Route>
            <Route exact path='/Tryon-Project/profile/:id' element={< Profile_user />}></Route>
            <Route exact path='/Tryon-Project/feed' element={< Feed />}></Route>
            <Route exact path='/Tryon-Project/feed_game' element={< Feed_game />}></Route>
            <Route exact path='/Tryon-Project/feed_game/:id' element={< Feed_game />}></Route>
            <Route exact path='/Tryon-Project/about_game' element={< About_game />}></Route>
            <Route exact path='/Tryon-Project/post' element={< Post />}></Route>
            {/*<Route exact path='/games2' element={< Games2/>}></Route>*/}
            <Route exact path='/Tryon-Project/discord' element={< Discord />}></Route>
            <Route exact path='/Tryon-Project/error' element={< ERROR404 />}></Route>
            <Route path="*" element={<Navigate to="/Tryon-Project/error" />} />
            {/* <Route exact path='/loading' element={<Loading1/>}></Route> */}
          </Routes>
          <Footer />
        </div>

      </Router>

    );


  }
}


export default App;

