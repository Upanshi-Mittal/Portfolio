import './string.css';
import { useEffect } from 'react';

function String() {
  useEffect(() => {
    const strings = document.querySelectorAll('.string');

    strings.forEach((string) => {
      const id = string.getAttribute('id');

      const handleHover = () => {
        const audio = new Audio(`${id}.mp3`);
        audio.play();
        console.log("hiii");

        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 1000);
      };

      string.addEventListener('mouseenter', handleHover);

      // Optional cleanup
      return () => {
        string.removeEventListener('mouseenter', handleHover);
      };
    });
  }, []);

  return (
    <div className="hinged-strings">
      <div className="string" id="1"></div>
      <div className="string" id="2"></div>
      <div className="string" id="3"></div>
      <div className="string" id="4"></div>
      <div className="string" id="5"></div>
      <div className="string" id="6"></div>
      <div className="string" id="7"></div>
    </div>
  );
}

export default String;
