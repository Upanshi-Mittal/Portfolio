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
      A versatile Full Stack Developer navigating the vast tech cosmos
      with a passion for crafting seamless frontends, building robust backends,
      and orchestrating complex projects with precision.
    </p>
    <p>
      From pixel-perfect UI designs to scalable server architectures,
      I thrive at the intersection of creativity and technology.
    </p>
    <p>
      Let's embark on this coding journey together — exploring innovative
      solutions and shaping the future, one line of code at a time.
    </p>
  </div>

  <div className="profile">
    <img src="/img.jpeg" alt="profile" />
  </div>
</div>

  );
}

export default Hero;
