import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import MissionRadar from "./MissionRadar";
import "./ProjectsSection.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    sno: 1,
    status: "Deployed",
    Name: "AccessLens",
    Description:
      "An AI-driven accessibility assistant that helps visually impaired users understand and navigate their surroundings through real-time scene analysis, object detection, and intelligent voice guidance.",
    hardest_part:
      "Achieving sub-100ms latency for real-time scene understanding while maintaining accuracy across varying lighting conditions and device capabilities.",
    module: ["Auth", "Scene Analysis", "Voice Guidance", "Object Detection"],
    tech: ["React", "TensorFlow.js", "Web Speech API", "Azure CV"],
    code: "https://github.com/Upanshi-Mittal/accesslens",
    Link: "https://accesslens-azure.vercel.app/",
    url: "accesslens.app",
    visible: true
  },
  {
    sno: 2,
    status: "Deployed",
    Name: "OptiBuild",
    Description:
      "A C++ build optimization framework that analyzes project dependencies, constructs build graphs, and minimizes unnecessary recompilation for faster and more efficient software builds.",
    hardest_part:
      "Constructing accurate dependency graphs for complex template-heavy C++ codebases with circular dependencies and macro-generated code.",
    module: ["Dependency Parser", "Build Graph", "Incremental Compiler", "CLI Tool"],
    tech: ["C++17", "CMake", "LLVM", "Graphviz"],
    code: "https://github.com/Upanshi-Mittal/Optibuild",
    Link: "https://github.com/Upanshi-Mittal/Optibuild",
    url: "optibuild.dev",
    visible: true
  },
  {
    sno: 3,
    status: "Deployed",
    Name: "Intervue AI",
    Description:
      "An AI-powered interview platform featuring a real-time 3D avatar, voice conversations, camera-based behavioral analysis, and intelligent interview feedback for realistic mock interviews.",
    hardest_part:
      "Synchronizing lip-synced 3D avatar animation with real-time STT/TTS latency under 200ms while maintaining natural conversation flow.",
    module: ["3D Avatar", "Voice Pipeline", "Behavioral Analysis", "Feedback LLM"],
    tech: ["React Three Fiber", "WebRTC", "OpenAI API", "MediaPipe"],
    code: "https://github.com/Upanshi-Mittal/Intervue",
    Link: "https://github.com/Upanshi-Mittal/Intervue",
    url: "intervue.ai",
    visible: true
  },
  {
    sno: 4,
    status: "Deployed",
    Name: "SentinelMesh",
    Description:
      "A collaborative AI and Web3 platform combining intelligent automation with decentralized infrastructure, where I primarily contributed to backend development and AI integration.",
    hardest_part:
      "Bridging off-chain AI inference with on-chain smart contract state transitions securely without compromising decentralization.",
    module: ["Smart Contracts", "AI Orchestrator", "IPFS Storage", "Auth"],
    tech: ["Solidity", "Python", "IPFS", "Next.js"],
    code: "https://github.com/Upanshi-Mittal/SentinelMesh",
    Link: "https://web3-ai-web.vercel.app",
    url: "sentinelmesh.io",
    visible: true
  },
  {
    sno: 5,
    status: "Deployed",
    Name: "BeatFall",
    Description:
      "A gesture-controlled rhythm FPS game built with React Three Fiber and MediaPipe, featuring real-time hand tracking, beat-synchronized gameplay, and immersive 3D environments.",
    hardest_part:
      "Achieving sub-frame hand-tracking latency while maintaining 60fps 3D rendering and audio synchronization in the browser.",
    module: ["Hand Tracking", "Beat Engine", "3D Renderer", "Audio Sync"],
    tech: ["React Three Fiber", "MediaPipe", "Web Audio API", "Zustand"],
    code: "https://github.com/Upanshi-Mittal/BeatFall",
    Link: "https://beatfall.netlify.app/",
    url: "beatfall.netlify.app",
    visible: false
  },
  {
    sno: 6,
    status: "In Progress",
    Name: "NeRF",
    Description:
      "Building Neural Radiance Fields from scratch to explore neural scene representation, volume rendering, and novel view synthesis for realistic 3D reconstruction.",
    hardest_part:
      "Implementing hierarchical volume sampling and positional encoding from first principles without relying on existing NeRF implementations.",
    module: ["Volume Rendering", "Positional Encoding", "Hierarchical Sampling", "View Synthesis"],
    tech: ["PyTorch", "CUDA", "NumPy", "OpenGL"],
    code: "https://github.com/Upanshi-Mittal/NeRF",
    Link: "#",
    url: "nerf-project",
    visible: false
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const pinnedLeftRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const updateActiveIndex = useCallback((index) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedLeft = pinnedLeftRef.current;
    if (!section || !pinnedLeft) return;

    const ctx = gsap.context(() => {
      // ── Pin the ENTIRE left column (header + radar together) ──
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedLeft,
        pinSpacing: true,
      });

      // ── Card entrance animations ──
      cardRefs.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 60, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ── Mission tracking via ScrollTrigger callbacks ──
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => updateActiveIndex(index),
          onEnterBack: () => updateActiveIndex(index),
        });
      });
    }, section);

    return () => ctx.revert();
  }, [updateActiveIndex]);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="projects-layout">
        {/* LEFT: Header + Radar (pinned together) */}
        <div  className="projects-left-col ">
          <div className="projects-header-pinned">
            <div className="projects-badge">
              <span className="badge-dot" />
              <span className="badge-text">Log Entry 03</span>
            </div>
            <h2 className="projects-title hero-title">Projects</h2>
          </div>
          <div ref={pinnedLeftRef}
 className="hidden lg:flex flex-col">
          <MissionRadar activeIndex={activeIndex} projects={PROJECTS}  />
          </div>
        </div>

        {/* RIGHT: Cards (scrolls naturally) */}
        <div className="projects-right-col">
          <div className="projects-cards">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.sno}
                ref={(el) => (cardRefs.current[index] = el)}
                project={project}
                index={index}
                total={PROJECTS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;