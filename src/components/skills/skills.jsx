import { useEffect, useRef,useLayoutEffect } from "react";
import "./skills.css"; // import this CSS file
gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "Rust",
    icon: "/rust-icon.png",
  },
  {
  name: "MySQL",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
}

];


export default function Skills() {
    const cardRef = useRef();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--quantity', skillsData.length);
    console.log(`Set --quantity: ${skillsData.length}`);
    }
  }, []);
  
  return (
    <div 
    className="skills">
        <h1>My Skills</h1>
        <div className="content">
        <div className="model"></div>
        </div>
      <div className="card" ref={cardRef}>
        {skillsData.map((skill, index) => (
          <SkillItem
            key={index}
            src={skill.icon}
            name={skill.name}
            position={index + 1}

          />
        ))}
      </div>
      
    </div>
  );
}

function SkillItem({ src, name, position }) {
  const itemRef = useRef();

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.style.setProperty('--position', position);
    }
  }, [position]);
  const carouselRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".skill", {
        rotateY: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  return (
      <div className="item" ref={itemRef}>
        <img src={src} alt={name} />
        <span>{name}</span>
      </div>
  );
}
