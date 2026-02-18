import React, { useLayoutEffect, useRef } from "react";
import "./hero.css";
import gsap from "gsap";import { SplitText } from "gsap/SplitText";

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
      Software Developer building scalable web applications with a strong focus on backend architecture and system design.
Currently expanding into DevOps to bridge development and deployment for efficient, production-ready systems.
  I enjoy solving complex problems and turning ideas into structured, reliable solutions through clean and maintainable code.
</p>
  </div>
</div>

  );
}

export default Hero;
