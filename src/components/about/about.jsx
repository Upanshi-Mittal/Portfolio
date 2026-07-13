import "./about.css";

function About() {
    return (
        <div className="about " id="about">
            <div className="log-badge">
          <span className="log-dot" />
          <span className="log-label">Log Entry 02</span>
        </div>
            <div className="about-title hero-title">
                About

            </div>

            <div className="about-wrapper">

                <div className="timeline">
                    <div className="timeline-line"></div>

                    <div className="timeline-item">
                        <div className="dot"></div>
                        <div className="check">
                            <span className="year text-[var(--accent-blue)]">2024–2028 • IN PROGRESS</span>
                            <h3>B.Tech in Computer Science</h3>
                            <p>JIIT Noida</p>
                        </div>

                    </div>

                    <div className="timeline-item">
                        <div className="dot"></div>
                        <div className="check"><span className="year">2020–2023</span>
                            <h3>Secondary School and High School</h3>
                            <p>Jaypee Vidya Mandir, Chirchitta, Bulandshahr</p></div>

                    </div>
                </div>

                <div className="about-text flex items-center">
                    <div className="card">
                        <div className="uppercase mb-8 ">System profile</div>
                        <div className="flex justify-between ">
                            <span className="label">Identity</span>
                            <span className="log">Upanshi Mittal</span>
                        </div>
                        <div className="flex justify-between ">
                            <span className="label">Role</span>
                            <span className="log">Full-stack + AI engineer</span>
                        </div>
                        <div className="flex justify-between ">
                            <span className="label">specialization</span>
                            <span className="log">ML.Backend</span>
                        </div>
                        <div className="flex justify-between ">
                            <span className="label">Current focus</span>
                            <span className="log">AI Infrastructure</span>
                        </div>
                        <hr style={{ margin: "10px 0 0 0 " }} />
                        <div>
                            <span
                                className="block text-left uppercase label"
                                style={{ margin: "20px 0 0 0" }}
                            >Mission</span>
                            <div className="block text-left">Build software that is reliable,intelligent, and production-ready</div>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="stat-card">
                            <h2>2+</h2>
                            <p>Experience</p>
                        </div>
                        <div className="stat-card">
                            <h2>10+</h2>
                            <p>Projects</p>
                        </div>

                        <div className="stat-card">
                            <h2>12+</h2>
                            <p>Technologies</p>
                        </div>

                        <div className="stat-card">
                            <h2>100+</h2>
                            <p>Algorithms</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default About;