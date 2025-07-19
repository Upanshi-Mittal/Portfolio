import React, { use, useEffect } from 'react';
import './hero.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  /*useEffect(() => {
    gsap.from(".intro-text", {
      opacity: 0,
      y: 0,
      duration: 4.5,
      delay: 0.5,
      ease: "power2.out",
    });
  },[]);*/
  

  return (
    
    <div className="phero">
      <div className="intro-text">
  <h1> Hi, I'm  </h1>
  <h1>Upanshi Mittal!</h1>
  <hr></hr>
  <p>
    A Full Stack Developer with a heart full of code  and a mind orbiting the tech cosmos.  
    I love crafting pixel-perfect frontends and building powerful backends to bring ideas to life.
  </p>
  <p>
    Whether it’s designing dreamy UI with React or wrangling databases with MongoDB,  
    I thrive on turning imagination into innovation .
  </p>
  <p>
    Welcome to my digital galaxy—let’s explore the magic of code together!
  </p>
</div>

      <div className="profile">
        <img src="/img.jpeg" alt="profile" />
      </div>
      <button className="work">My Work</button>
    </div>
  );
}

export default Hero;
