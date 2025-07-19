import React, { useState, useEffect } from 'react';
import './project.css';
gsap.registerPlugin(ScrollTrigger);

const work = [
  {
    Name: "NostalgicStack",
    Description: "A modern full-stack blog website that allows users to post, share, and showcase web development projects and articles.",
    Link: "https://github.com/Upanshi-Mittal/Nostalgicstack"
  },
  {
    Name: "Retro VM",
    Description: "A pixel-punk virtual OS simulator. It features Ghost Mode 👻, Hacker Mode 💻, and a full-on nostalgic desktop experience built in Rust + JS.",
    Link: "https://github.com/Upanshi-Mittal/RetroVM"
  },
  {
    Name: "Mental_Health",
    Description: "A smart FAQ chatbot trained on mental health queries. Uses NLP (NLTK), cosine similarity, and TF-IDF to give meaningful responses.",
    Link: "https://github.com/Upanshi-Mittal/MentalHealthChatbot"
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
