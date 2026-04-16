import "./about.css";

function About() {
    return (
        <div className="about" id="about">
            <h1 className="about-title">
                <div>About Me</div>
                <hr /></h1>

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
                        I’m Upanshi Mittal, a developer focused on building reliable and scalable web applications. I enjoy working on systems where structure, performance, and clean architecture actually matter.
                    </p>

                    <p>
                        My approach is to understand problems deeply and design solutions that are both efficient and maintainable. I’m particularly interested in backend development and how different components of a system interact with each other.
                    </p>

                    <p>
                        Alongside this, I’m actively exploring <strong>AI and Machine Learning</strong>, aiming to integrate intelligent features into real-world applications and build systems that go beyond static functionality.
                        I’m also expanding into <strong>DevOps and deployment practices</strong> to understand how applications perform in production and how to make them robust, scalable, and efficient.
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