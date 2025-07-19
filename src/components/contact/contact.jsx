import "./Contact.css"; // Make sure to link correct CSS file
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact">
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
                href="http://upanshmittal.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
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
