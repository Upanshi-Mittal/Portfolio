import { useState ,useEffect} from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import "./Sidebar.css";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


function Sidebar({ contactRef }) {
  const [atBottom, setAtBottom] = useState(false);

  useGSAP(() => {
  const mm = gsap.matchMedia();
  // 📱 MOBILE ANIMATION
  mm.add("(max-width: 768px)", () => {
    gsap.fromTo(
      ".sidebar",
      { x: 100 ,opacity: 0}, 
      {
        y: 40,
        x:-50,
        opacity: 1,
        backgroundColor: "rgba(255,255,255,0.05)",   // 👈 style change
    borderRadius: "12px",
        scale: 1,
        height:340,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        duration: 0.01,
        border: "1px solid rgba(255,255,255,0.2)", 
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".social-links",
          start: "center 55%",
          toggleActions: "play reverse play reverse",
          markers: false

        }
      }
    );
  });

  return () => mm.revert(); 
});
  useEffect(() => {
  if (!contactRef?.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      console.log("VISIBLE:", entry.isIntersecting); // 👈 DEBUG
      setAtBottom(entry.isIntersecting);
    },
    {
      rootMargin: "-100px 0px -100px 0px"
    }
  );

  observer.observe(contactRef.current);

  return () => observer.disconnect();
}, [contactRef]);
  return (
    <div className={`sidebar`}>
      <ul className="sidebar-links">
        <li>
          <a
            href="https://github.com/Upanshi-Mittal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/upanshi-mittal-498213320/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>

        <li>
          <a
            href="https://www.instagram.com/shi.in_stxllar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;