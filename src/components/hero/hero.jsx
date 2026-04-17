import React, { useLayoutEffect, useRef, useEffect } from "react";
import "./hero.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiPython, SiTensorflow, SiScikitlearn, SiMongodb } from "react-icons/si";
gsap.registerPlugin(ScrollTrigger);

function Separator() {
  const lineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 1.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return <hr ref={lineRef} className="separator" />;
}

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
    <div className="phero" id="phero" ref={heroRef}>
      <div className="intro-text">
        <h1>Hello, I'm Upanshi Mittal</h1>
        <h2>Creative Developer & Problem Solver</h2>
        <Separator />
        <p className="hero-desc">
          Working across full-stack development and AI/ML, building scalable and intelligent systems.
        </p>

        <p className="hero-tech">
          Core stack:
          <span className="tag"><FaReact />  React</span>,
          <span className="tag"><FaNodeJs /> Node.js</span>,
          <span className="tag"><SiPython /> Python</span>,
          <span className="tag"><SiTensorflow /> TensorFlow</span>,
          <span className="tag"><SiScikitlearn /> sklearn</span>,
          <span className="tag"><SiMongodb /> MongoDB</span>,
        </p>

        <button className="hero-sub">
          <a href="#skills" style={{ color: "inherit", textDecoration: "none" }}>
            + more in skills ↓
          </a>
          
        </button>
      </div>
    </div>
  );
}

export default Hero;
