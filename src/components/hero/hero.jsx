import React, { useLayoutEffect, useRef } from "react";
import "./hero.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Hero() {
  const heroRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-text h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });

      gsap.from(".intro-text p", {
        y: 30,
        opacity: 0,
        delay: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);


  return (
    <div className="phero" ref={heroRef}>
      <div className="intro-text">
        <h1>Hi, I'm</h1>
        <h1>Upanshi Mittal!</h1>
        <hr />
        <p>
          A Full Stack Developer with a heart full of code and a mind orbiting
          the tech cosmos.
        </p>
        <p>
          I love crafting pixel-perfect frontends and building powerful
          backends to bring ideas to life.
        </p>
        <p>
          Welcome to my digital galaxy—let’s explore the magic of code together!
        </p>
      </div>

      <div className="profile">
        <img src="/img.jpeg" alt="profile" />
      </div>
    </div>
  );
}

export default Hero;
