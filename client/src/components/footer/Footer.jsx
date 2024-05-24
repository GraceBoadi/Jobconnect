import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import { footerLinks } from "../../utils/data";
import "./footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-container">
        <div className="footer-links">
          {footerLinks.map(({ id, title, links }) => (
            <div className="box-links" key={id + title}>
              <h2 className="">{title}</h2>

              <div className="links">
                {links.map((link, index) => (
                  <Link key={link + index} to="/" className="">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="newsletter">
          <h2>Subscribe to our newsletter</h2>
          <div className="newsletter-subscribe">
            <div className="subscribe">
              <input type="text" />
              <button>Subscribe</button>
            </div>
            <div className="social-links">
              <a>
                <FaFacebookF />
              </a>
              <a>
                <FaTwitter />
              </a>
              <a>
                <FiInstagram />
              </a>
              <a>
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-credit">
        <p>
          &copy; 2024 Job Finder —
          <a href="#" target="_blank" rel="noopener noreferrer">
            @Grace
          </a>
        </p>

        <span>Designed by Grace</span>
      </div>
    </div>
  );
};

export default Footer;
