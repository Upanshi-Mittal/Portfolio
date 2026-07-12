import { useState, useMemo } from "react";
import "./skills.css";

const skillsData = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", clusters: ["Frontend"], x: 65, y: 35, connectsTo: ["TailwindCSS", "JavaScript", "React", "CSS"] },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", clusters: ["AI/ML"], x: 15, y: 22, connectsTo: ["C", "C++", "OpenCV"] },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", clusters: ["Frontend"], x: 46, y: 43, connectsTo: ["Streamlit", "HTML"] },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", clusters: ["Frontend"], x: 73, y: 27, connectsTo: ["HTML"] },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", clusters: ["Frontend"], x: 75, y: 45, connectsTo: ["HTML"] },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", clusters: ["Backend"], x: 15, y: 70, connectsTo: ["OpenCV", "C++", "MongoDB", "MySQL"] },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", clusters: ["Backend"], x: 48, y: 80, connectsTo: ["node2", "Node.js", "MySQL"] },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", clusters: ["Version-Control"], x: 50, y: 10, connectsTo: ["TailwindCSS"] },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", clusters: ["AI/ML", "Language"], x: 60, y: 60, connectsTo: ["Docker", "node2", "Streamlit", "C"] },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", clusters: ["Language"], x: 9, y: 60, connectsTo: ["TensorFlow", "OpenCV", "Node.js", "C"] },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", clusters: ["Language"], x: 37, y: 28, connectsTo: ["TensorFlow", "Express.js", "C++", "Python"] },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", clusters: ["Backend"], x: 40, y: 50, connectsTo: ["Streamlit", "Express.js", "Node.js", "MongoDB"] },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", clusters: ["Devops"], x: 65, y: 70, connectsTo: ["Python", "node1"] },
  { name: "Express.js", icon: "../images.png", clusters: ["Backend"], x: 40, y: 40, connectsTo: ["MySQL", "C"] },
  { name: "OpenCV", icon: "../opencv.png", clusters: ["AI/ML"], x: 20, y: 60, connectsTo: ["Node.js", "C++", "TensorFlow", "Streamlit"] },
  { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-mark-color.png", clusters: ["Frontend", "AI/ML"], x: 53, y: 50, connectsTo: ["MySQL", "TailwindCSS", "Python", "CSS", "OpenCV"] },
  { name: "MySql", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", clusters: ["Backend"], x: 80, y: 77, connectsTo: ["Streamlit", "Express.js", "Node.js", "MongoDB"] },
  { name: "TailwindCss", icon: "../tailwindcss.svg", clusters: ["Frontend"], x: 50, y: 26, connectsTo: ["Git", "Streamlit", "HTML"] },
  { name: "GSAP", icon: "../greensock-svgrepo-com.svg.png", clusters: ["Frontend"], x: 50, y: 70, connectsTo: ["Streamlit"] }
];


const clusterColors = {
  Frontend: "#00ffff",
  Backend: "#ff7b00",
  "Version-Control": "#f1502f",
  Language: "#2096f0",
  "AI/ML": "#c01369",
  Devops: "#320614"
};

function Skills() {
  const [activeClusters, setActiveClusters] = useState([]);

  const handleClick = (skill) => {
    const isSame =
      activeClusters.length === skill.clusters.length &&
      activeClusters.every(c => skill.clusters.includes(c));

    if (isSame) {
      setActiveClusters([]);
    } else {
      setActiveClusters(skill.clusters);
    }
  };

  return (
    <div className="skills-section" id="skills" style={{ padding: "40px" }}>
      <div className="inline-flex items-center rounded-full border border-[#2B3139] bg-[#151A21] px-4 py-1.5 gap-2 mb-[300px] self-start">
        <span className=" h-2 w-2 rounded-full bg-[#5E6AD2]" />

        <span className="text-xs font-medium uppercase tracking-normal text-[#8B949E]">
          Log Entry 03
        </span>
      </div>
      <div className="text" style={{ marginBottom: "40px" }}> <div>SYSTEM ARCHITECTURE</div>
        </div>
    </div>
  );
}

export default Skills;
