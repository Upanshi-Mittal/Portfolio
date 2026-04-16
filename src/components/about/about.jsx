import "./about.css";

function About() {
    return (
        <div className="about" id="about">
            <h1 className="about-title">
                <div>About Me</div>
                <hr/></h1>

            <div className="about-wrapper">

                <div className="timeline">
                    <div className="timeline-line"></div>

                    <div className="timeline-item">
                        <div className="dot"></div>
                        <div className="card">
                            <span className="year">2024–2028</span>
                            <h3>B.Tech in Computer Science</h3>
                            <p>JIIT Noida</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="dot"></div>
                        <div className="card">
                            <span className="year">2020–2023</span>
                            <h3>Secondary School and High School</h3>
                            <p>Jaypee Vidya Mandir, Chirchitta, Bulandshahr</p>
                        </div>
                    </div>
                </div>

                <div className="about-text">
                    <p>
                        I’m Upanshi Mittal, a developer focused on building scalable web
                        applications with strong backend architecture and system design.
                    </p>

                    <p>
                        I enjoy solving complex problems and turning ideas into structured,
                        production-ready solutions. Currently, I’m expanding into DevOps to
                        bridge development and deployment.
                    </p>
                    <div className="stats">
                        <div className="stat-card">
                            <h2>8+</h2>
                            <p>Projects</p>
                        </div>

                        <div className="stat-card">
                            <h2>1.5+</h2>
                            <p>Years Learning</p>
                        </div>

                        <div className="stat-card">
                            <h2>100+</h2>
                            <p>DSA Questions</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default About;