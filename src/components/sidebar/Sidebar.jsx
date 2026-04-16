import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
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