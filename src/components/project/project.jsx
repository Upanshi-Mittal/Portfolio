import React, { useState, useEffect } from 'react';
import './project.css';
const work = [
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
  {
    Name: "PhaseShifter",
    Description: "A Three.js based interactive 3D web experiment exploring dynamic geometry and real-time phase shifting visualizations. Designed to demonstrate creative uses of 3D graphics for browser-based animation.",
    Link: "https://phase-shifter-henna.vercel.app"
  }
];


const Project = () => {
  return (
    <div className="project">
      <h1>🛠️ Projects</h1>
      <div className="work">
        {work.map((item, index) => (
          <div className="cardpro" key={index}>
            <h2>{item.Name}</h2>
            <p>{item.Description}</p>
            {item.Link && (
              <a href={item.Link} target="_blank" rel="noopener noreferrer">
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
