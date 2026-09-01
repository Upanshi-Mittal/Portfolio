import React from "react";
import { useState } from "react";
import "./header.css";
import MissionCommandPalette from "../commandPalette";
import { div } from "three/src/nodes/math/OperatorNode.js";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [day, setDay] = useState(true);
    const [active, setActive] = useState("home")
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
                    <div className="block"><a href="#about" onClick={() => setActive("about")}>About</a>
                    {active === "about" ? <hr />: null}</div>
                    <div className="block"><a href="#skills" onClick={() => setActive("skills")}>Skills</a>
                    {active === "skills" ? <hr />: null}</div>
                    <div className="block"><a href="#projects" onClick={() => setActive("project")}>Projects</a>
                    {active === "project" ? <hr />: null}</div>
                    <div className="block"><a href="#contact" onClick={() => setActive("contact")}>Contact</a>
                    {active === "contact" ? <hr />: null}</div>
                    <div className="block"><a href="/resume.pdf" target="blank" onClick={() => setActive("resume")}>Resume</a>
                    {active === "resume" ? <hr />: null}</div>
                    <MissionCommandPalette />
                </div>
                
            </div>

        </div>
    );
}

export default Header;