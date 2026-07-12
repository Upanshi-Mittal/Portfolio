import React from "react";

const MissionTimeline = ({ projects, activeIndex, onMissionClick }) => {
  return (
    <div className="mission-timeline">
      <span className="timeline-header">Mission Log</span>
      <div className="timeline-list">
        {projects.map((project, index) => {
          const state =
            index < activeIndex ? "completed" : index === activeIndex ? "active" : "upcoming";

          return (
            <div
              key={project.sno}
              className={`timeline-item timeline-item-${state}`}
              onClick={() => onMissionClick(index)}
            >
              <div className="timeline-connector">
                <div className={`timeline-dot timeline-dot-${state}`} />
                {index < projects.length - 1 && (
                  <div className={`timeline-line timeline-line-${state}`} />
                )}
              </div>
              <span className="timeline-name">{project.Name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionTimeline;