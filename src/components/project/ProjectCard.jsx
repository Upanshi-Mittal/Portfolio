import React, { forwardRef } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const ProjectCard = forwardRef(({ project, index, total }, ref) => {
  const { sno, status, Name, Description, hardest_part, module, tech, code, Link } = project;
  const statusColor = status === "Deployed" ? "#22C55E" : "#F59E0B";

  return (
    <div ref={ref} className="mission-card" data-mission={index}>
      <div className="mission-divider">
        
        <span className="mission-divider-label">Mission 0{index+1} of 06</span>
              <div className="mission-divider-line" />
      </div>

      <div className="mission-card-inner">
              
        
        {/* Left: Content */}
        <div className="mission-content">
          <div className="mission-meta">
            <span className="mission-id">Mission-0{sno}</span>
            <span className="mission-status" style={{ color: statusColor }}>
              <span className="status-indicator" style={{ backgroundColor: statusColor }} />
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
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>

          <div className="mission-links">
            {Link !== "#" ? (
              <a href={Link} target="_blank" rel="noopener noreferrer" className="link-btn link-primary">
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            ) : (
              <span className="link-btn link-primary disabled">Coming Soon</span>
            )}
            <a href={code} target="_blank" rel="noopener noreferrer" className="link-btn link-secondary">
              <FaGithub size={12} /> Source
            </a>
          </div>
        </div>

        {/* Right: Browser Mockup */}
        <div className="mission-preview">
          <div className="browser-chrome">
            <div className="browser-dots">
              <span /><span /><span />
            </div>
            <span className="browser-url">{project.url || "localhost"}</span>
          </div>
          <div className="browser-viewport">
            <div className="preview-placeholder">
              <span className="preview-icon">🚀</span>
              <span className="preview-text">{Name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;