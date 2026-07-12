import { FaLinkedin } from "react-icons/fa6";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import "./contact.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { div } from "three/src/nodes/math/OperatorNode.js";
gsap.registerPlugin(ScrollTrigger);

function Contact({ contactRef }) {
  useGSAP(() => {
    gsap.fromTo(
      ".contact-form, .social-links",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div>
    <div className="contact" id="contact" ref={contactRef}>
      <div className="log-badge">
        <span className="log-dot" />
        <span className="log-label">Log Entry 04</span>
      </div>

      <h1 className="contact-title">Open a transmission</h1>
      <p className="contact-subtitle">Reach out — I read every message myself.</p>

      <div className="contact-container">
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="contact-form"
        >
          <div className="form-header">Message form</div>
          <input
            type="hidden"
            name="access_key"
            value="4c17aaf7-76ec-45d2-bdca-555c20b0a7cb"
          />

          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="form-input"
            />
          </div>

          <textarea
            name="message"
            placeholder="What are you reaching out about?"
            required
            rows={4}
            className="form-textarea"
          />

          <button type="submit" className="submit-btn">
            Send transmission
          </button>
        </form>

        <div className="social-links">
          <div className="form-header">Get in touch</div>

          <a
            className="contact-row"
            href="mailto:upanshimittal7@gmail.com"
          >
            <FaEnvelope className="contact-icon" />
            <div className="contact-box">
              <span className="contact-label">Email</span>
              <span className="contact-value">upanshimittal7@gmail.com</span>
            </div>
          </a>

          <a
            className="contact-row"
            href="https://github.com/Upanshi-Mittal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="contact-icon" />
            <div className="contact-box">
              <span className="contact-label">GitHub</span>
              <span className="contact-value">Upanshi-Mittal</span>
            </div>
          </a>

          <a
            className="contact-row"
            href="https://www.linkedin.com/in/upanshi-mittal-498213320/?skipRedirect=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="contact-icon" />
            <div className="contact-box">
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">upanshi-mittal</span>
            </div>
          </a>
        </div>
      </div>

      
    </div>
    <div className="footer">
        <div className="footer-content">
          <p className="footer-text">Um. — built from scratch, {new Date().getFullYear()}</p>
          <p className="copyright">
            © {new Date().getFullYear()} Upanshi Mittal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;