import {useState, React} from "react";
import { FaGithub } from "react-icons/fa";
import "./sidebar.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={`sidebar ${screen.width > 600 ? "open" : "closed"}`}>
            <ul className="sidebar-links">
                <a
              href="https://github.com/Upanshi-Mittal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/upanshi-mittal-498213320/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/shi.in_stxllar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            </ul>
        </div>
    );
}

export default Sidebar;