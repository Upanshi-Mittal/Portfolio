import React from "react";
import { useState } from "react";
import "./header.css";
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [day, setDay] = useState(true);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const toggleDay = () => {
        setDay(!day);
        document.body.classList.toggle("dark-theme");
    };
    return (
        <div className="header border-b border-[var(--border)]">
            <div className="content">
                <h1 className="gap-4"><a href="#page1" className="text-2xl">Um<span className=" inline-block mr-3 h-1 w-1 rounded-full bg-[#5E6AD2]" > </span></a></h1>
                <div className="nav-wrapper">
                    <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => toggleMenu()}>
                        ☰
                    </div>
                    <div className={`circle ${menuOpen ? "show" : ""}`}></div>
                    <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                        <li><a href="#skillspage" onClick={() => toggleMenu()}>Skills</a></li>
                        <li><a href="#projectpage" onClick={() => toggleMenu()}>Projects</a></li>
                        <li><a href="#contactpage" onClick={() => toggleMenu()}>Contact</a></li>
                    </ul>

                </div>
            </div>

        </div>
    );
}

export default Header;