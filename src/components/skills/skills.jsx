import { useEffect, useRef } from "react";
import "./skills.css"; // import this CSS file

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
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
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

  return (
      <div className="item" ref={itemRef}>
        <img src={src} alt={name} />
        <span>{name}</span>
      </div>
  );
}
