import { useEffect, useState } from "react";
import GitHubCalendar from 'react-github-calendar';
const GitHubActivity = ({ username }) => {
  return (
    <div className="github-activity">
      <div>
      <h3>GitHub Activity</h3>
      <GitHubCalendar style={{display:"flex",justifyContent:"center"}}username="Upanshi-Mittal" />
    </div>

    </div>
  );
};

export default GitHubActivity;
