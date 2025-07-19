import { useEffect } from 'react';
import './App.css';
import Skills from './components/skills/skills';
import Hero from './components/hero/hero';
import String from './components/string/string'
//import An from './another';
import BlinkingStars from './blinking';
import Contact from './components/contact/contact';
import gsap from "gsap";
import Project from './components/project/project';
import { ScrollTrigger } from "gsap/ScrollTrigger";
function App() {
  gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  const ship = document.querySelector('.spaceship');
  const idleBounce = gsap.to(ship, {
    y: 100,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.page1',
      start: 'bottom top',
      end: 'bottom+=1000 top',
      markers: true,
      scrub: 1,
      pin: true
    }
  });

  tl.to(ship, {
    y: 300,
    duration: 1,
    ease: 'power1.inOut',
  });
  idleBounce.play();
}, []);
  return (
    <>
    <BlinkingStars />
       <String />
    <span className="spaceship" style={{ position: 'relative', display: 'inline-block' }}>
            <img src="/spaceship.png" alt="spaceship" className="spaceship-img" style={{ position: 'absolute' }} />
          </span>
    <div className="container">
       
      <div className="page1" style={{ height: '100vh' }}>
        <Hero/>
        
      </div>

      <div className="page2" style={{ height: '100vh' }}>
        
        <Skills/>
      </div>

      <div className="page3" style={{ height: '100vh' }}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo tempora dolores odio ad
          excepturi optio repellat voluptatibus aut! Fugit facilis corporis id dicta officia
          mollitia ipsam fugiat odit odio cum.
        </p>
      </div>

      <div className="page4" style={{ height: '90vh' }}>
        <Contact/>
      </div>
    </div>
    </>
  );
}

export default App;
