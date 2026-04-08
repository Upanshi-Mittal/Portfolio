import React, { useState, useEffect } from 'react';
import './project.css';
const work = [
  {
  Name: "BeatFall",
  Description: "A gesture-controlled rhythm FPS game using React Three Fiber and MediaPipe hand tracking. Features real-time beat-based enemy spawning, 3D interactive gameplay, Firebase authentication, and global leaderboard system.",
  Link: "https://github.com/arnav-khandelwal/BeatFall"
  },
  {
    Name: "Dreamscape",
    Description: "A modern full-stack blog website for posting, sharing, and showcasing web development projects and articles. Features user authentication, likes, and comments.",
    Link: "https://github.com/Upanshi-Mittal/Dreamscape"
  },
  {
    Name: "Mental_Health",
    Description: "A smart FAQ chatbot trained on mental health queries using NLP (NLTK), cosine similarity, and TF-IDF to provide meaningful responses.",
    Link: "https://github.com/Upanshi-Mittal/IR"
  },
  {
    Name: "face detection",
    Description: "A real-time Python and OpenCV-based system for face detection and recognition with webcam support, robust to lighting and pose variations. Implements Haar cascades and LBPH algorithm for accurate recognition.",
    Link: "https://github.com/Upanshi-Mittal/face-detection"
  },
  
];

const Project = () => {
  return (
    <div className="project" id='projects'>
      <h1 style={{ padding: "20px" , marginTop:"20px" ,display:"flex", flexDirection:"row"}}>Pro
  <img src="/flash.png" style={{ width: "40px", height: "auto" ,marginTop:"20px" , marginRight:"-10px" , marginLeft:"-10px"}} alt="J" className="flash-icon" />
  ects</h1>
      <div className="work">
        {work.map((item, index) => (
          <div className="cardpro" key={index}>
            <h2>{item.Name}</h2>
            <p>{item.Description}</p>
            {item.Link && (
              <a href={item.Link} target="_blank" rel="noopener noreferrer" style={{color:"#a1a6aa"}}>
                🔗 View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
