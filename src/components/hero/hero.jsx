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
    <div className="phero relative pt-32 " id="phero" ref={heroRef}>
      <div className="intro-text">
        <h1 className="hero-title">Upanshi Mittal</h1>
        <h2>Building intelligent systems through full-stack engineering and AI</h2>
        <Separator />
        
        <div className="">CORE TECHNOLOGIES</div>
        <p className="hero-tech ">
          <span className="tag"><FaReact />  React</span>,
          <span className="tag"><FaNodeJs /> Node.js</span>,
          <span className="tag"><SiPython /> Python</span>,
          <span className="tag"><SiTensorflow /> TensorFlow</span>,
          <span className="tag"><SiScikitlearn /> sklearn</span>,
          <span className="tag"><SiMongodb /> MongoDB</span>
        </p>
        <div>
          <a
            href="#skills"
            className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent-blue)] px-10 py-8 text-lg font-semibold text-white no-underline hover:bg-[#707BDF] transition-all min-w-[220px]" style={{marginTop:"15px"}}
          >
            Explore capabilities →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
