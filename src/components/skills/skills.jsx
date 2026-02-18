import { useState, useMemo } from "react";
import "./skills.css";

const skillsData = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", clusters: ["frontend"], x: 18, y: 22 ,connectsTo: ["C", "CSS"]},
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", clusters: ["frontend"] , x: 13, y: 48 , connectsTo: ["HTML", "C++"]},
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", clusters: ["frontend"] , x: 63, y: 27,connectsTo: ["TensorFlow"]},
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", clusters: ["frontend"], x: 75, y: 45,connectsTo: ["TensorFlow"] },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", clusters: ["backend"], x: 15, y: 70 ,connectsTo: ["Express.js","C++"]},
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", clusters: ["backend"], x: 48, y: 80,connectsTo: ["node2"] },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", clusters: ["version-control"], x: 50, y: 10,connectsTo: ["node1"] },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", clusters: [ "AI/ML"], x: 60, y: 60 ,connectsTo: ["Docker","node2","Streamlit"]},
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", clusters: ["language"], x: 9, y: 60,connectsTo: ["CSS","Express.js","Node.js"] },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", clusters: ["language"], x: 37, y: 25,connectsTo: ["HTML","OpenCV"] },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", clusters: ["backend"], x: 40, y: 50,connectsTo: ["Streamlit","OpenCV"] },
  { name: "OpenCV", icon: "../opencv.png", clusters: ["AI/ML"], x: 40, y: 40,connectsTo: ["MySQL","C"] },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", clusters: ["devops"], x: 65, y: 70,connectsTo: ["Python","TailwindCss"] },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", clusters: ["AI/ML"], x: 55, y: 30,connectsTo: ["node1","JavaScript","React"] },
  { name: "TailwindCss", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", clusters: ["frontend"], x: 80, y: 77 , connectsTo: ["Docker"]},
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", clusters: ["backend"], x: 20, y: 60,connectsTo: ["Node.js","C++"] },
  { name: "Streamlit", icon: "https://streamlit.io/images/brand/streamlit-mark-color.png", clusters: ["frontend"], x: 53, y: 50,connectsTo: ["MySQL","node1","Python"] },
  {name: "node1", icon:"", clusters: ["backend"], x: 50, y: 26,connectsTo: ["Git","Streamlit"]},
  {name: "node2", icon: "", clusters: ["backend"], x: 50, y: 70,connectsTo: ["MongoDB","Python"]},
];


const clusterColors = {
  frontend: "#00ffff",
  backend: "#ff7b00",
  "version-control": "#f1502f",
  language: "#a020f0",
  "AI/ML": "#00ff7f",
  devops: "#1e90ff"
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
    <div className="skills-section">
      <div className="text">My con<strong style={{color: "#e6230d"}}>SKILL</strong>ation</div>
      <svg className="lines">
  {skillsData.map((skill) =>
    skill.connectsTo?.map((targetName) => {
      const target = skillsData.find(s => s.name === targetName);
      if (!target) return null;

      const sharedCluster = skill.clusters.find(c =>
        target.clusters.includes(c)
      );

      const isActive =
        activeClusters.length > 0 &&
        sharedCluster &&
        activeClusters.includes(sharedCluster);

      return (
        <line
          key={`${skill.name}-${target.name}`}
          x1={`${skill.x}%`}
          y1={`${skill.y}%`}
          x2={`${target.x}%`}
          y2={`${target.y}%`}
          stroke={
            isActive
              ? clusterColors[sharedCluster]
              : "rgba(241, 234, 234, 0.2)"
          }
          strokeWidth={isActive ? 2 : 1}
        />
      );
    })
  )}
</svg>

      <img src="public/sagittarius.png" alt="spaceship" className="sagrittarius" />
      <div className="constellation">
        {skillsData.map((skill) => {

          const matchedClusters = skill.clusters.filter(cluster =>
            activeClusters.includes(cluster)
          );

          const isActive = matchedClusters.length > 0;
          const isDimmed = activeClusters.length > 0 && !isActive;

          const glowColor = isActive
            ? clusterColors[matchedClusters[0]]
            : null;

          return (
            <div
              key={skill.name}
              className="star_c"
              style={{
                top: `${skill.y}%`,
                left: `${skill.x}%`,
                opacity: isDimmed ? 0.2 : 1,
                filter: glowColor
                  ? `drop-shadow(0 0 15px ${glowColor})`
                  : "none"
              }}
              onClick={() => handleClick(skill)}
            >
              
              <img src={skill.icon} alt={skill.name} width="45" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Skills;
