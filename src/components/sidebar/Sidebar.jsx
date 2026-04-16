import { useState ,useEffect} from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import "./Sidebar.css";

function Sidebar({ contactRef }) {
  const [atBottom, setAtBottom] = useState(false);
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