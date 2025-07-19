import { useEffect } from 'react';
import './App.css';
import Skills from './components/skills/skills';
import Hero from './components/hero/hero';
import String from './components/string/string'
//import An from './another';
import BlinkingStars from './components/stars/blinking';
import Contact from './components/contact/contact';
import gsap from "gsap";
import Project from './components/project/project';


function App() {
  useEffect(() => {
    const idlebounce=gsap.to(".spaceship", { duration: 1, ease: "none", repeat: -1 ,y:100,yolo:true});
    idlebounce.seek(0);
    gsap.to(".spaceship-img", { duration: 20, x:750,y:2100, ease: "none",scale:7 });
    idlebounce.pause();
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

      <div className="page3" style={{ width:'100vw',height: '100vh' }}>
        <Project/>
      </div>

      <div className="page4" style={{ height: '90vh' }}>
        <Contact/>
      </div>
    </div>
    </>
  );
}

export default App;
