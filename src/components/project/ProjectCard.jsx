import React, { forwardRef, useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

// A URL only counts as an embeddable live demo if it's not a GitHub link
// and not the "#" placeholder some in-progress projects use.
const isLiveDemo = (url) =>
  typeof url === "string" &&
  url !== "#" &&
  url.startsWith("http") &&
  !url.includes("github.com");

const ProjectCard = forwardRef(({ project, index, total }, ref) => {
  const {
    sno,
    status,
    Name,
    Description,
    hardest_part,
    module,
    tech,
    code,
    Link,
  } = project;

  const statusColor = status === "Deployed" ? "#22C55E" : "#F59E0B";
  const hasLiveDemo = isLiveDemo(Link);

  const viewportRef = useRef(null);
  const iframeRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false); // becomes true once scrolled near view
  const [loaded, setLoaded] = useState(false); // becomes true once the iframe actually finishes loading

  // Lazy-load: only start loading the live site once this card is close to the viewport,
  // so all 6 mission previews aren't fetching simultaneously on page load.
  useEffect(() => {
    if (hasLiveDemo=="#" || !viewportRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" } // start loading a bit before it's actually on screen
    );
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [hasLiveDemo]);

  const handleMouseEnter = () => {
    const iframe = iframeRef.current;
    const viewport = viewportRef.current;
    if (!iframe || !viewport || !loaded) return;
    const travel = iframe.offsetHeight - viewport.offsetHeight;
    if (travel > 0) {
      iframe.style.transform = `translateY(-${travel}px)`;
    }
  };

  const handleMouseLeave = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.style.transform = "translateY(0)";
  };

  return (
    <div ref={ref} className="mission-card" data-mission={index}>
      <div className="mission-divider">
        <span className="mission-divider-label">
          Mission 0{index + 1} of 06
        </span>
        <div className="mission-divider-line" />
      </div>

      <div className="mission-card-inner">
        {/* Left: Content */}
        <div className="mission-content">
          <div className="mission-meta">
            <span className="mission-id">Mission-0{sno}</span>
            <span className="mission-status" style={{ color: statusColor }}>
              <span
                className="status-indicator"
                style={{ backgroundColor: statusColor }}
              />
              {status}
            </span>
          </div>

          <h2 className="mission-title">{Name}</h2>
          <p className="mission-description">{Description}</p>

          <div className="engineering-challenge">
            <span className="challenge-label">Engineering Challenge</span>
            <p className="challenge-text">{hardest_part}</p>
          </div>

          <div className="modules-section">
            <span className="section-label">{module.length} Core Modules</span>
            <p className="modules-text">{module.join(" · ")}</p>
          </div>

          <div className="tech-section">
            {tech.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>

          <div className="mission-links">
            {hasLiveDemo ? (
              <a
                href={Link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-btn link-primary"
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            ) : (
              <span className="link-btn link-primary disabled">
                {Link === "#" ? "Coming Soon" : "Code only"}
              </span>
            )}
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="link-btn link-secondary"
            >
              <FaGithub size={12} /> Source
            </a>
          </div>
        </div>

        {/* Right: Browser Mockup */}
        <div className="mission-preview">
          <div className="browser-chrome">
            <div className="browser-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="browser-url">
              {hasLiveDemo ? project.url || Link : "no live deploy"}
            </span>
            {hasLiveDemo && (
              <span className="browser-link-indicator">
                {loaded ? "● live" : "○ connecting"}
              </span>
            )}
          </div>

          <div
            className="browser-viewport"
            ref={viewportRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {hasLiveDemo ? (
              <>
                {shouldLoad && (
                  <iframe
                    ref={iframeRef}
                    className="browser-iframe"
                    src={Link}
                    title={`${Name} live preview`}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    style={{ opacity: loaded ? 1 : 0 }}
                  />
                )}
                {!loaded && (
                  <div className="preview-placeholder preview-loading">
                    <span className="preview-icon">🛰️</span>
                    <span className="preview-text">
                      {shouldLoad ? "Establishing link…" : Name}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="preview-placeholder">
                <span className="preview-text">{Name} will be deployed soon</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;