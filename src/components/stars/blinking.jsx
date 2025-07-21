import React, { useEffect } from 'react';
import './BlinkingStars.css';

const BlinkingStars = () => {
  useEffect(() => {
    const starsContainer = document.getElementById('stars');

    // Generate blinking stars
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;

      starsContainer.appendChild(star);
    }

    // Shooting stars every few seconds
    const shootingInterval = setInterval(() => {
      const shootingStar = document.createElement('div');
      shootingStar.classList.add('shooting-star');
      shootingStar.style.top = `${Math.random() * 80}vh`;
      shootingStar.style.left = `${Math.random() * 100}vw`;

      starsContainer.appendChild(shootingStar);

      setTimeout(() => {
        shootingStar.remove();
      }, 1000); // match animation duration
    }, 2000);

    return () => clearInterval(shootingInterval);
  }, []);

  return <div className="stars" id="stars"></div>;
};

export default BlinkingStars;
