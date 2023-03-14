import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


export default function About_us(){

  useEffect(() => {
    AOS.init();
  }, [])


    return(
        <main className="container-fluid bg_user_profile" style={{paddingBottom:"5rem"}}>
    
        <section className="row">
            <header className="header_feed">
                <h1 className="titulo_header" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" >About us</h1>
                <p className="texto_header" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" ><span>Here you can find more about us.</span></p>
              </header> 
        </section>
    
        <section id="about" className="about mb-5"  data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" >
            <div className="container mb-5">
      
              <div className="section-title text-center">
                <h2 className="text-center mt-5 mb-5">About Us</h2>
                <p>Tryon is a site that connects players around the world so they can play with each other and make a lot of new friends.</p>
                <p>Sometimes is difficult to have a friend that is free to play anytime, so we are here to resolve that problem and give a lot of gamers the opportunity to find new teammates and have lots of fun playing together.</p>
              </div>
      
              <div className="row content mt-5">
                <div className="col-lg-6">
                  <p>
                    Our meta is:
                  </p>
                  <ul>
                    <li><i className="ri-check-double-line"></i>- Connect players around the world</li>
                    <li><i className="ri-check-double-line"></i>- Give the gaming community free support</li>
                    <li><i className="ri-check-double-line"></i>- Turn online gaming more acessible and fun</li>
                  </ul>
                  <p>
                        Join us and have fun!
                  </p>
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0">
                  <p>
                    This platform is conceived to help gamers around the globe, and our metas will always try to be the more helpful possible so you can enjoy the best from the online world, all of this without spendind a penny. 
                  </p>
                  <p>
                    If you want to contact us, you can do it at:  <b className="text-decoration-underline"><a className="text-white" href="mailto:Tryon.platform@email.com"><b>Tryon.platform@gmail.com</b></a></b>
                  </p>
                  <p>
                    Or contact us via Discord: <b className="text-decoration-underline"><a className="text-white" href="https://discord.gg/ZH6fMMhKdN" target={"_blank"}><b>Tryon#7198</b></a></b>
                  </p>
                  
                </div>
              </div>

            </div>
          </section>
    
          <section id="cta" className="cta mt-5 mb-5"  data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" >
            
            <div className="container">
      
              <div className="row">
                <div className="col-lg-9 text-center text-lg-start">
                  <h3>Don't waste more time and go to Feed:</h3>
                  <p> Start to explore the posts of a lot of users that are searching for a teammate to play with them in multiple games.</p>
                  <p> Just click on the button to go to FEED.</p>
                </div>
                <div className="col-lg-3 cta-btn-container text-center mx-auto">
                  <Link to='/Tryon-Project/feed' className="btn btn-primary">Go to FEED</Link>
                </div>
              </div>
      
            </div>
          </section>
      
         
          <section id="services" className="services mt-5 mb-5"  data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" >
            <div className="container">
      
              <div className="section-title mt-5 mb-5 text-center">
                <h2 className=" mb-3">Services</h2>
                <p>Our services are:</p>
              </div>
      
              <div className="row">
                <div className="col-lg-4 col-md-6 d-flex align-items-center text-center mx-auto justify-content-center text-black">
                  <div className="icon-box">
                    <div className="icon mx-auto"><i className="fa-solid fa-user-group"></i></div>
                    <div className="text-services">
                        <h4>Find new friends</h4>
                        <p>Go to Feed and find new friends thath play the same games as you.</p>
                    </div>
                    
                  </div>
                </div>
      
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0 align-items-center text-center mx-auto justify-content-center text-black">
                  <div className="icon-box">
                    <div className="icon mx-auto"><i className="fa-solid fa-gamepad"></i></div>
                    <div className="text-services">
                    <h4>Play together</h4>
                    <p>Communicate with more people and play together.</p>
                    </div>
                  </div>
                </div>
      
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0 align-items-center text-center mx-auto justify-content-center text-black">
                  <div className="icon-box">
                    <div className="icon mx-auto"><i className="fa-solid fa-trophy"></i></div>
                    <div className="text-services">
                    <h4>Win games and friends</h4>
                    <p>While playing with new friends you certainly will win not only more games, but also new friends!</p>
                    </div>
                  </div>
                </div>
      
              </div>
      
            </div>
          </section>
          <section className="mt-5 mb-0 pb-0"  data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-back" >
            <h2 className="text-center mt-5">Our location:</h2>
          <div className="mapouter mt-5 mb-0">
            <div className="gmap_canvas">
              <iframe width="100%" height="300" id="gmap_canvas" loading="lazy" src="https://maps.google.com/maps?q=aveiro%20universidade&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0">
                </iframe><a href="https://123movies-to.org"></a>
                <a href="https://www.embedgooglemap.net">create google maps for website</a></div></div>
        
        </section>
    
    
      </main>


    )


}