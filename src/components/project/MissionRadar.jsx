import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const NODE_POSITIONS = [
  { top: "0%", left: "50%" },
  { top: "25%", left: "95%" },
  { top: "75%", left: "95%" },
  { top: "100%", left: "50%" },
  { top: "75%", left: "5%" },
  { top: "25%", left: "5%" },
  
  
];
const NODE_ANGLES = [0, 60, 120, 180, 240, 300];


const MissionRadar = ({ activeIndex, projects }) => {
  const sweepRef = useRef(null);
  const nodesRef = useRef([]);
  const activeProject = projects[activeIndex] || projects[0];
  const total = projects.length;

  useEffect(() => {

    gsap.to(sweepRef.current,{
        rotate:360,
        duration:6,
        ease:"none",
        repeat:-1
    });

},[]);
useEffect(() => {

    const node = nodesRef.current[activeIndex];

    gsap.fromTo(
        node,
        {
            scale:1
        },
        {
            scale:1.35,
            duration:.4,
            repeat:1,
            yoyo:true
        }
    );

},[activeIndex]);

  const getNodeState = (index) => {
    if (index < activeIndex) return "completed";
    if (index === activeIndex) return "active";
    return "upcoming";
  };

  return (
    <div className="radar-panel ">
      <div className="radar-info">
        <span className="radar-mission-label">Mission 0{activeProject.sno}</span>
        <h3 className="radar-project-name">{activeProject.Name}</h3>
        <div className="radar-status-row">
          <span
            className="radar-status-badge"
            style={{ color: activeProject.status === "Deployed" ? "#22C55E" : "#F59E0B" }}
          >
            <span
              className="radar-status-dot"
              style={{
                backgroundColor: activeProject.status === "Deployed" ? "#22C55E" : "#F59E0B",
              }}
            />
            {activeProject.status === "Deployed" ? "ACTIVE" : "IN PROGRESS"}
          </span>
        </div>
        <div className="radar-progress">
          <span className="progress-current">{activeIndex + 1}</span>
          <span className="progress-separator">/</span>
          <span className="progress-total">{total}</span>
        </div>
      </div>

      <div className="radar-visual">
        <div className="radar-ring radar-ring-outer" />
        <div className="radar-ring radar-ring-middle" />
        <div className="radar-ring radar-ring-inner" />
        <div className="radar-grid-h" />
        <div className="radar-grid-v" />

        <div className="radar-core">
          <div className="radar-core-inner" />
          <div className="radar-core-glow" />
        </div>

        <div className="radar-sweep-container" ref={sweepRef}>
          <div className="radar-sweep" />
        </div>

        {projects.map((project, index) => {
          const state = getNodeState(index);
          return (
            <div
              key={project.sno}
              ref={(el) => (nodesRef.current[index] = el)}
              className={`radar-node radar-node-${state}`}
              style={{ top: NODE_POSITIONS[index].top, left: NODE_POSITIONS[index].left }}
            >
              <div className="radar-node-dot" />
              <span className="radar-node-label">M{project.sno}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionRadar;