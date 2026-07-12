import React, { useState, useEffect } from 'react';
import './project.css';
import { FaBolt } from 'react-icons/fa6';
const work = [
  {
    sno: 1,
    status: "Deployed",
    Name: "AccessLens",
    Description:
      "An AI-driven accessibility assistant that helps visually impaired users understand and navigate their surroundings through real-time scene analysis, object detection, and intelligent voice guidance.",
    hardest_part:"abc",
    module: [ "Authentication",
  "Accessibility AI",
  "Scene Analysis",
  "Voice Guidance"
],
    tech: ["React","fdufd","vsjdvs"],
      code: "https://github.com/Upanshi-Mittal/accesslens",
    Link: "https://accesslens-azure.vercel.app/"
  },
  {
    sno: 2,
    status: "Deployed",
    
    hardest_part:"abc",
    module: [ "Authentication", "Accessibility AI", "Scene Analysis", "Voice Guidance" ],
    tech: ["React","fdufd","vsjdvs"],
      code: "https://github.com/Upanshi-Mittal/accesslens",
      Name: "OptiBuild",
    Description:
      "A C++ build optimization framework that analyzes project dependencies, constructs build graphs, and minimizes unnecessary recompilation for faster and more efficient software builds.",
    Link: "https://github.com/Upanshi-Mittal/Optibuild"
  },
  {
    sno: 3,
    status: "Deployed",
    
    hardest_part:"abc",
    module: [ "Authentication", "Accessibility AI", "Scene Analysis", "Voice Guidance" ],
    tech: ["React","fdufd","vsjdvs"],
      code: "https://github.com/Upanshi-Mittal/accesslens",
    Name: "Intervue AI",
    Description:
      "An AI-powered interview platform featuring a real-time 3D avatar, voice conversations, camera-based behavioral analysis, and intelligent interview feedback for realistic mock interviews.",
    Link: "https://github.com/Upanshi-Mittal/Intervue"
  },
  {
    sno: 4,
    status: "Deployed",
    
    hardest_part:"abc",
    module: [ "Authentication", "Accessibility AI", "Scene Analysis", "Voice Guidance" ],
    tech: ["React","fdufd","vsjdvs"],
      code: "https://github.com/Upanshi-Mittal/accesslens",
    Name: "SentinelMesh",
    Description:
      "A collaborative AI and Web3 platform combining intelligent automation with decentralized infrastructure, where I primarily contributed to backend development and AI integration.",
    Link: "https://web3-ai-web.vercel.app"
  },
  {
    sno: 5,
    status: "Deployed",
    
    hardest_part:"abc",
    module: [ "Authentication", "Accessibility AI", "Scene Analysis", "Voice Guidance" ],
    tech: ["React","fdufd","vsjdvs"],
      code: "https://github.com/Upanshi-Mittal/accesslens",
    Name: "BeatFall",
    Description:
      "A gesture-controlled rhythm FPS game built with React Three Fiber and MediaPipe, featuring real-time hand tracking, beat-synchronized gameplay, and immersive 3D environments.",
    Link: "https://beatfall.netlify.app/"
  },
  {
    sno: 6,
    status: "Deployed",
    
    hardest_part:"abc",
    module: [ "Authentication", "Accessibility AI", "Scene Analysis", "Voice Guidance" ],
    tech: ["React","fdufd","vsjdvs"],
      code: "https://github.com/Upanshi-Mittal/accesslens",
    Name: "NeRF (Coming Soon)",
    Description:
      "Building Neural Radiance Fields from scratch to explore neural scene representation, volume rendering, and novel view synthesis for realistic 3D reconstruction.",
    Link: "#"
  }
];

const Project = () => {
  return (
    <div className="project" id='projects'>
      <div className="inline-flex items-center rounded-full border border-[#2B3139] bg-[#151A21] px-4 py-1.5 gap-2 mb-[300px] self-start">
        <span className=" h-2 w-2 rounded-full bg-[#5E6AD2]" />

        <span className="text-xs font-medium uppercase tracking-normal text-[#8B949E]">
          Log Entry 01
        </span>
      </div>
      <h1 className="heading">
        Projects
      </h1>
      <h2>A record of things I've designed, engineered, and shipped.</h2>

      {/* */}

      <div className="flex">
         <div className="cards w-[60%]">
        <div className="work">
          {work.map((item, index) => (
            <div className="cardpro" key={index}>
              <div>
                  <h3 className="uppercase">mission 0{item.sno}</h3>
                  <h3>{item.status}</h3>
                </div>
              <h2>{item.Name}</h2>
              <p className="description">{item.Description}</p>
              <div> Hardest part: {item.hardest_part}</div>
              <div>
                <h4>Core modules</h4>
                <div className="flex flex-wrap gap-2">
    {item.module.map((mod, i) => (
      <span
        key={i}
        className="rounded-full border border-[#2B3139] px-3 py-1 text-xs"
      >
        {mod}
      </span>
    ))}
  </div><div className="mt-4">
  <h4 className="mb-2 uppercase text-sm text-gray-400">
    Tech Stack
  </h4>

  <div className="flex flex-wrap gap-2">
    {item.tech.map((tech, i) => (
      <span
        key={i}
        className="rounded-full bg-[#1A1F28] px-3 py-1 text-xs"
      >
        {tech}
      </span>
    ))}
  </div>
</div>
              </div>
              {item.Link && (
                <a href={item.Link} target="_blank" rel="noopener noreferrer" style={{ color: "#a1a6aa" }}>
                  🔗 View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
        <div className=" w-[400px] h-[400px] border rounded-[20px] flex justify-center items-center" >
          <div className="w-[250px] h-[250px]  border rounded-full flex justify-center items-center relative ">
            <div className="w-[200px] h-[200px]  border rounded-full absolute">
              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-indigo-500" />
              <div
                className=" absolute left-1/2 top-1/2 -translate-x-1/2 w-[4px] h-[100px] bg-indigo-500 -origin-bottom -translate-y-full "
              />
              <div
                className=" absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 ">

                <div className="w-8 h-8 rounded-full bg-indigo-500"></div>

                <p className="text-center text-indigo-500 mt-2">
                  M1
                </p>

              </div>

              <div
                className=" absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 ">
              

                <div className="w-7 h-7 rounded-full bg-gray-600"></div>

                <p className="mt-2 text-center">
                  M2
                </p>

              </div>
              <div
                className=" absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 ">
              

                <div className="w-7 h-7 rounded-full bg-gray-600"></div>

                <p className="mt-2 text-center">
                  M3
                </p>

              </div>
              <div
                className=" absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
              

                <div className="w-7 h-7 rounded-full bg-gray-600"></div>

                <p className="mt-2 text-center">
                  M4
                </p>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
