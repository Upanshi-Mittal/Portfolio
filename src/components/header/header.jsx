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
        <div className="header">
            <div className="content">
                <h1><a href="#phero">Um.</a></h1>
                <div className={`mode ${day ? "day" : "night"}`} onClick={() => toggleDay()}>
                    {day ? "🌞" : "🌜"}
                </div>
                <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={() => toggleMenu()}>
                    ☰
                </div>
                
                <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <li><a href="#skills" onClick={()=>toggleMenu()}>Skills</a></li>
                    <li><a href="#projects" onClick={()=>toggleMenu()}>Projects</a></li>
                    <li><a href="#contact" onClick={()=>toggleMenu()}>Contact</a></li>
                </ul>

            </div>
            <hr className="line" />


        </div>
    );
}

export default Header;