import React, { useEffect, useState, useRef } from "react";

const baseRepos = [
  { 
    id: 1, 
    name: "Three.js", 
    desc: "Interactive 3D web experiences using Three.js and modern web technologies", 
    tech: "React, Node.js" 
  },
  { 
    id: 2, 
    name: "Machine Learning Projects", 
    desc: "Implementation of AI/ML algorithms for predictive modeling and data analysis", 
    tech: "Python, Rust, JavaScript" 
  },
  { 
    id: 3, 
    name: "DevOps & Automation", 
    desc: "Deployment pipelines, automation scripts, and CI/CD integration for scalable apps", 
    tech: "Python, Docker, Jenkins" 
  },
  { 
    id: 4, 
    name: "Crop Health Detector", 
    desc: "AI-powered system for detecting plant diseases and providing actionable insights", 
    tech: "Python, TensorFlow, Web Development" 
  },
  { 
    id: 5, 
    name: "Surveillance System", 
    desc: "Real-time object detection and monitoring system using computer vision", 
    tech: "OpenCV, Python, React" 
  }
];

function generateStarPositions(count, radius, phase) {
  const pos = [];
  for (let i = 0; i < count; i++) {
    let angle = (i / count) * 2 * Math.PI + phase;
    let x = 250 + radius * Math.cos(angle);
    let y = 200 + radius * Math.sin(angle);
    pos.push({ x, y });
  }
  return pos;
}

function ComplexConstellation() {
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState(0);
  const requestRef = useRef();

  const animate = (time) => {
    setPhase((prev) => (prev + 0.002) % (2 * Math.PI));
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const layers = [
    generateStarPositions(6, 80, phase),
    generateStarPositions(8, 130, -phase * 1.5),
    generateStarPositions(10, 180, phase * 0.7),
  ];

  const stars = layers.flat().map((pos, idx) => {
    const repo = baseRepos[idx % baseRepos.length];
    return { ...pos, ...repo };
  });

  const innerConnect = (points) => {
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      lines.push({ from: p1, to: p2 });
    }
    return lines;
  };

  const outerConnect = (inner, outer) => {
    const lines = [];
    for (let i = 0; i < Math.min(inner.length, outer.length); i++) {
      lines.push({ from: inner[i], to: outer[i] });
    }
    return lines;
  };

  const lines = [
    ...innerConnect(layers[0]),
    ...innerConnect(layers[1]),
    ...innerConnect(layers[2]),
    ...outerConnect(layers[0], layers[1]),
    ...outerConnect(layers[1], layers[2]),
  ];

  return (
<div style={{ width: 600, height: 450, backgroundColor: "transparent", position: "relative", overflow: "hidden", borderRadius: '15px'}}>
  <h2 style={{display:"flex",justifyContent:"center",color:"#7FFFD4"}}>currently working over these things</h2>
      <svg viewBox="0 0 500 400" style={{ width: "100%", height: "100%" }}>
        {lines.map(({ from, to }, i) => (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="rgba(0,255,255,0.3)"
            strokeWidth={1}
          />
        ))}

        {stars.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={selected?.id === star.id ? 12 : 7}
            fill={selected?.id === star.id ? "#00ffff" : "#00cccc"}
            style={{
              filter: selected?.id === star.id
                ? "drop-shadow(0 0 12px #00ffff)"
                : "drop-shadow(0 0 8px #00aaaa)",
              cursor: "pointer",
              animation: `twinkle ${4 + i % 5}s infinite alternate`,
            }}
            onClick={() => setSelected(star)}
          />
        ))}

        
    
      </svg>

      {selected && (
        <div
          style={{
            position: "absolute",
            top: selected.y + 10,
            left: selected.x + 20,
            backgroundColor: "#001111dd",
            padding: "12px 20px",
            borderRadius: 10,
            boxShadow: "0 0 20px #00ffffbb",
            color: "#00ffff",
            maxWidth: 280,
            fontSize: 14,
            fontFamily: "monospace",
          }}
        >
          <h3 style={{margin: 0}}>{selected.name}</h3>
          <p>{selected.desc}</p>
          <small><b>Tech:</b> {selected.tech}</small>
          <br />
          <button
            onClick={() => setSelected(null)}
            style={{
              marginTop: 10,
              padding: "6px 14px",
              borderRadius: 4,
              border: "1px solid #00ffff",
              background: "transparent",
              color: "#00ffff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Close
          </button>
        </div>
      )}

      <style>{`
        @keyframes twinkle {
          0% {opacity: 0.4}
          100% {opacity: 1}
        }
      `}</style>
    </div>
  );
}

export default ComplexConstellation;
