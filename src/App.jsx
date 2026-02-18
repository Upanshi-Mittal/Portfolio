import { useEffect } from 'react';
import './App.css';
import Skills from './components/skills/skills';
import Hero from './components/hero/hero';
import String from './components/string/string'
//import An from './another';
import BlinkingStars from './components/stars/blinking';
import Contact from './components/contact/contact';
import gsap from "gsap";
import Project from './components/project/project';
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import ConstellationMap from './components/github/ConstellationMap';
import Header from './components/header/header';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
function App() {

  useGSAP(() => {
    gsap.to(".spaceship", {
      motionPath: {
        path: "#space-path",
        align: "#space-path",
        alignOrigin: [0.5, 0.5]
      },
      scale:3,
      duration: 50,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".container",    
        start: "top top",
        end: "90% 90%",
        scrub: true
      }
    });
  }, []);


  return (
    <>
    <Header />
      <BlinkingStars />  
      <String />
      <div className="container">

        <div className="page1">
          <Hero />
        </div>

        <div className="page2" style={{ height: '100vh' }}>
          <Skills />
        </div>

        <div className="page3" style={{ width: '100vw', height: '70vh' }}>
          <Project />
          
        </div>

        <div className="page4">
        </div>
        <div className="page5" style={{ height: '90vh',display:"flex" }}>
          <Contact />
          <ConstellationMap style={{marginLeft:"1000px"}}/>
        </div>
        
      </div>
      <div className="svg-container">
        <svg
          width="100vw"
          height="100vh"
          viewBox="0 -0 800 600"

        >
          <g transform="translate(0, 350)">
            <path
              id="space-path"
              strokeLinecap="round"
              zIndex="1000"
              xmlns="http://www.w3.org/2000/svg" d="M26.6051 7.29134C23.0764 10.435 12.3833 14.63 5.24571 18.8408C1.69026 20.9383 -0.127564 25.1333 2.51897 30.2115C3.56811 32.2246 10.4586 32.861 23.7715 33.2185C84.7973 34.8571 106.696 31.8307 128.109 30.4271C149.522 29.0235 170.855 26.9312 192.268 24.9967C215.205 22.9244 235.013 19.5715 256.426 17.637C279.363 15.5647 299.172 12.2118 320.585 10.4508C341.408 8.73817 363.33 7.64881 384.743 6.41869C407.138 5.13216 436.364 4.49466 464.914 3.26454C492.925 2.05767 521.908 1.3405 611.704 1.32999C653.923 1.32505 691.18 7.27031 747.292 13.7521C773.273 16.7533 791.053 20.2444 802.709 24.0977C815.159 28.2138 821.422 32.5035 828.559 36.7143C842.686 45.0485 830.404 59.4821 817.946 64.0503C805.784 68.5103 789.449 73.1501 773.41 77.7183C755.357 82.8598 723.58 85.7667 695.912 89.2888C673.669 92.1203 652.257 94.8927 630.844 96.6538C608.471 98.4939 579.223 100.15 555.993 101.038C531.927 101.958 507.901 105.407 486.488 107.168C465.664 108.88 443.742 109.97 417.892 111.373C394.727 112.631 374.237 115.226 352.824 116.63C331.411 118.034 310.079 120.126 289.548 122.234C278.962 123.321 274.364 126.087 268.135 128.185C262.304 130.148 261.853 134.13 265.382 139.03C270.548 146.203 309.865 147.462 331.278 149.223C364.427 151.949 416.796 148.892 438.208 148.003C460.028 147.098 480.954 145.38 502.367 143.977C523.78 142.573 545.112 140.481 566.525 139.592C588.345 138.687 609.271 136.969 631.566 135.566C658.755 133.854 684.122 132.764 706.417 130.487C732.449 127.83 758.974 126.455 799.02 123.133C828.891 120.655 781.709 160.419 802.709 164.552C822.564 168.459 816.993 160.998 802.709 176.984M802.709 176.984C634.272 365.498 578.587 241.404 600 240C628.47 238.943 594.587 238.505 616 239.562C621.373 239.567 802.709 181.011 802.709 176.984Z" />         
 </g>
          </svg>
            /<span className="spaceship" >
              <img src="/spaceship.png" alt="spaceship" className="spaceship-img" />
            </span>
          </div>
        
        </>
        );
}

        export default App;
