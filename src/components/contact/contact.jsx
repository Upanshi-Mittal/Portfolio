import { FaLocationPin, FaMessage } from "react-icons/fa6";
import "./contact.css";
import { FaGithub, FaLinkedin, FaGlobe, FaInstagram, FaDiscord, FaLandmark, FaPhone } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact" id="contact">
      <h1 className="contact-title" style={{ marginTop: "50px" }}>Let's connect</h1>
      <div className="contact-container" >
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="contact-form"
        >
          <input
            type="hidden"
            name="access_key"
            value="4c17aaf7-76ec-45d2-bdca-555c20b0a7cb"
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="form-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="form-textarea"
          ></textarea>

          <button type="submit" className="submit-btn">
            Send
          </button>
        </form>
        <div className="social-links">
          <div className="mail">
            <div className="Box">
            <FaMessage />
            <span className="title">Email</span>
            </div>
            <a href="mailto:upanshimittal7@gmail.com">upanshimittal7@gmail.com</a>
          </div>
          <div className="Phone">
            <div className="Box">
            <FaPhone />
            <div className="title">Phone</div>
            </div>
            <a href="tel:+1234567890">+1 (234) 567-890</a>
          </div>
          <div className="location">
            <div className="Box">
            <FaLocationPin />
            <div className="title">Location</div>
            </div>
            <a href="https://www.google.com/maps/place/India" target="_blank" rel="noopener noreferrer">
              Delhi, India
            </a>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <p className="footer-text">Made with ❤️ by Upanshi Mittal</p>
          <div className="footer-icons">
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
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} Upanshi Mittal. All Rights Reserved.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Contact;
