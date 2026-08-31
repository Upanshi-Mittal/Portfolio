import React from "react";
import { useState } from "react";
import "./header.css";
import MissionCommandPalette from "../commandPalette";

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
                <div className="flex gap-5 items-center">
                    <a href="#about">About</a>
                    <a href="#skills">Skills</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                    <a href="/resume.pdf" target="blank" >Resume</a>
                    <MissionCommandPalette />
                </div>
                
            </div>

        </div>
    );
}

export default Header;