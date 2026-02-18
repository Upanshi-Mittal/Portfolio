import React from "react";
import "./header.css";
function Header() {
    return (
        <div className="header">
            <div className="content">
                <h1>Um.</h1>
                
                    <ul>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                
            </div>
                <hr className="line"/>
            

        </div>
    );
}

export default Header;