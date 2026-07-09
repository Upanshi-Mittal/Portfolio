import React, { useState, useEffect } from 'react';
import './project.css';
import { FaBolt } from 'react-icons/fa6';
const work = [
  {
    Name: "AccessLens",
    Description:
      "An AI-driven accessibility assistant that helps visually impaired users understand and navigate their surroundings through real-time scene analysis, object detection, and intelligent voice guidance.",
    Link: "https://accesslens-azure.vercel.app/"
  },
  {
    Name: "OptiBuild",
    Description:
      "A C++ build optimization framework that analyzes project dependencies, constructs build graphs, and minimizes unnecessary recompilation for faster and more efficient software builds.",
    Link: "https://github.com/Upanshi-Mittal/Optibuild"
  },
  {
    Name: "Intervue AI",
    Description:
      "An AI-powered interview platform featuring a real-time 3D avatar, voice conversations, camera-based behavioral analysis, and intelligent interview feedback for realistic mock interviews.",
    Link: "https://github.com/Upanshi-Mittal/Intervue"
  },
  {
    Name: "SentinelMesh",
    Description:
      "A collaborative AI and Web3 platform combining intelligent automation with decentralized infrastructure, where I primarily contributed to backend development and AI integration.",
    Link: "https://web3-ai-web.vercel.app"
  },
  {
    Name: "BeatFall",
    Description:
      "A gesture-controlled rhythm FPS game built with React Three Fiber and MediaPipe, featuring real-time hand tracking, beat-synchronized gameplay, and immersive 3D environments.",
    Link: "https://beatfall.netlify.app/"
  },
  {
    Name: "NeRF (Coming Soon)",
    Description:
      "Building Neural Radiance Fields from scratch to explore neural scene representation, volume rendering, and novel view synthesis for realistic 3D reconstruction.",
    Link: "#"
  }
];

const Project = () => {
  return (
    <div className="project" id='projects'>
      <h1 className="heading">
  <span className="title">
    Featured Projects
    <FaBolt className="bolt-icon" />
  </span>
</h1>
      <div className="cards">
        <div className="work">
          {work.map((item, index) => (
            <div className="cardpro" key={index}>
              <h2>{item.Name}</h2>
              <p className="description">{item.Description}</p>
              {item.Link && (
                <a href={item.Link} target="_blank" rel="noopener noreferrer" style={{ color: "#a1a6aa" }}>
                  🔗 View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
