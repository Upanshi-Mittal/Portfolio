import React, { useEffect, useRef, useState } from "react";
import "./project.css";


const work = [
  {
    sno: 1,
    status: "Deployed",
    Name: "AccessLens",
    Description:
      "An AI-driven accessibility assistant that helps visually impaired users understand and navigate their surroundings through real-time scene analysis, object detection, and intelligent voice guidance.",
    hardest_part:
      "Real-time scene understanding with low-latency voice feedback across varying lighting conditions.",
    module: ["Auth", "Scene Analysis", "Voice Guidance", "Object Detection"],
    tech: ["React", "TensorFlow.js", "Web Speech API"],
    code: "https://github.com/Upanshi-Mittal/accesslens",
    Link: "https://accesslens-azure.vercel.app/",
    url: "accesslens.app",
  },
  {
    sno: 2,
    status: "Deployed",
    Name: "OptiBuild",
    Description:
      "A C++ build optimization framework that analyzes project dependencies, constructs build graphs, and minimizes unnecessary recompilation for faster and more efficient software builds.",
    hardest_part:
      "Constructing accurate dependency graphs for complex template-heavy C++ codebases.",
    module: ["Dependency Parser", "Build Graph", "Incremental Compiler", "CLI Tool"],
    tech: ["C++17", "CMake", "LLVM"],
    code: "https://github.com/Upanshi-Mittal/Optibuild",
    Link: "https://github.com/Upanshi-Mittal/Optibuild",
    url: "optibuild.dev",
  },
  {
    sno: 3,
    status: "Deployed",
    Name: "Intervue AI",
    Description:
      "An AI-powered interview platform featuring a real-time 3D avatar, voice conversations, camera-based behavioral analysis, and intelligent interview feedback for realistic mock interviews.",
    hardest_part:
      "Synchronizing lip-synced 3D avatar animation with real-time STT/TTS latency under 200ms.",
    module: ["3D Avatar", "Voice Pipeline", "Behavioral Analysis", "Feedback LLM"],
    tech: ["React Three Fiber", "WebRTC", "OpenAI API"],
    code: "https://github.com/Upanshi-Mittal/Intervue",
    Link: "https://github.com/Upanshi-Mittal/Intervue",
    url: "intervue.ai",
  },
  {
    sno: 4,
    status: "Deployed",
    Name: "SentinelMesh",
    Description:
      "A collaborative AI and Web3 platform combining intelligent automation with decentralized infrastructure, where I primarily contributed to backend development and AI integration.",
    hardest_part:
      "Bridging off-chain AI inference with on-chain smart contract state transitions securely.",
    module: ["Smart Contracts", "AI Orchestrator", "IPFS Storage", "Auth"],
    tech: ["Solidity", "Python", "IPFS", "Next.js"],
    code: "https://github.com/Upanshi-Mittal/SentinelMesh",
    Link: "https://web3-ai-web.vercel.app",
    url: "sentinelmesh.io",
  },
  {
    sno: 5,
    status: "Deployed",
    Name: "BeatFall",
    Description:
      "A gesture-controlled rhythm FPS game built with React Three Fiber and MediaPipe, featuring real-time hand tracking, beat-synchronized gameplay, and immersive 3D environments.",
    hardest_part:
      "Achieving sub-frame hand-tracking latency while maintaining 60fps 3D rendering in the browser.",
    module: ["Hand Tracking", "Beat Engine", "3D Renderer", "Audio Sync"],
    tech: ["React Three Fiber", "MediaPipe", "Web Audio API"],
    code: "https://github.com/Upanshi-Mittal/BeatFall",
    Link: "https://beatfall.netlify.app/",
    url: "beatfall.netlify.app",
  },
  {
    sno: 6,
    status: "In Progress",
    Name: "NeRF",
    Description:
      "Building Neural Radiance Fields from scratch to explore neural scene representation, volume rendering, and novel view synthesis for realistic 3D reconstruction.",
    hardest_part:
      "Implementing hierarchical volume sampling and positional encoding from first principles.",
    module: ["Volume Rendering", "Positional Encoding", "Hierarchical Sampling", "View Synthesis"],
    tech: ["PyTorch", "CUDA", "NumPy"],
    code: "https://github.com/Upanshi-Mittal/NeRF",
    Link: "#",
    url: "nerf-project",
  },
];

/* Radar node positions inside the inner ring (top, right, bottom, left, etc.) */
const NODE_POS = [
  { top: "0%", left: "50%" },
  { top: "50%", left: "100%" },
  { top: "100%", left: "50%" },
  { top: "50%", left: "0%" },
  { top: "18%", left: "82%" },
  { top: "82%", left: "18%" },
];

const Project = () => {
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let closest = 0;
      let minDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 + window.scrollY;
        const dist = Math.abs(center - mid);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIdx(closest);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCard = (i) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="project" id="projects">
      {/* Header */}
      <div className="project-header">
        <h1 className="project-title">Projects</h1>
        <p className="project-sub">
          A record of things I've designed, engineered, and shipped.
        </p>
      </div>

      <div className="project-layout">
        {/* ─── LEFT: Cards ─── */}
        <div className="project-cards">
          {work.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="project-card"
            >
              {/* Mission divider */}
              <div className="mission-divider">
                <span className="mission-label">
                  Mission 0{item.sno} of 0{work.length}
                </span>
                <span className="mission-line" />
              </div>

              <div className="card-inner">
                {/* Left column */}
                <div className="card-left">
                  <div className="card-meta">
                    <span className="meta-tag">Mission-0{item.sno}</span>
                    <span className="meta-status">
                      <span className="status-dot" />
                      {item.status}
                    </span>
                  </div>

                  <h2 className="card-name">{item.Name}</h2>
                  <p className="card-desc">{item.Description}</p>
                  <p className="card-hardest">
                    <strong>Hardest part:</strong> {item.hardest_part}
                  </p>

                  <div className="modules-box">
                    <p className="modules-title">
                      {item.module.length} Core Modules
                    </p>
                    <p className="modules-text">{item.module.join(" · ")}</p>
                  </div>

                  <div className="tech-pills">
                    {item.tech.map((t) => (
                      <span key={t} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions">
                    {item.Link !== "#" ? (
                      <a
                        href={item.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Live demo
                      </a>
                    ) : (
                      <span className="btn btn-primary disabled">
                        Coming soon
                      </span>
                    )}
                    <a
                      href={item.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Source
                    </a>
                  </div>
                </div>

                {/* Right column: browser mockup */}
                <div className="card-right">
                  <div className="browser-bar">
                    <div className="browser-dot" />
                    <div className="browser-dot" />
                    <div className="browser-dot" />
                    <span className="browser-url">{item.url}</span>
                  </div>
                  <div className="browser-body" />
                </div>
              </div>

              {/* Scroll hint (except last card) */}
              {i < work.length - 1 && (
                <button
                  className="scroll-hint"
                  onClick={() => scrollToCard(i + 1)}
                  aria-label="Next project"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* ─── RIGHT: Sticky Radar + Mission List ─── */}
        <div className="project-radar-col">
          <p className="radar-label">Mission Index</p>

          <div className="radar">
            <div className="radar-inner">
              <div className="radar-center" />
              <div className="radar-sweep" />
              {work.map((item, i) => (
                <div
                  key={i}
                  className={`radar-node ${activeIdx === i ? "active" : ""}`}
                  style={{
                    top: NODE_POS[i].top,
                    left: NODE_POS[i].left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="node-label">M{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clickable mission names */}
          <div className="mission-list">
            {work.map((item, i) => (
              <div
                key={i}
                className={`mission-list-item ${
                  activeIdx === i ? "active" : ""
                }`}
                onClick={() => scrollToCard(i)}
              >
                <div className="list-dot" />
                <span className="list-name">{item.Name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;