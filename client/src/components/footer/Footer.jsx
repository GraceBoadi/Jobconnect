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
          {footerLinks.map(({ id, title, links, to }) => (
            <div className="box-links" key={id + title}>
              <h2 className="">{title}</h2>

              <div className="links">
                {links.map((link, index) => (
                  <Link key={link + index} to={to[index]} className="">
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
              <input type="email" placeholder="example@email.com" />
              <button className="btn">Subscribe</button>
            </div>
            <div className="social-links">
              <Link to={""} target="blank_">
                <FiInstagram />
              </Link>
              <Link
                to={"https://www.linkedin.com/in/grace-boadi-a04803237/"}
                target="blank_"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-credit">
        <p>
          &copy; 2024 Job-Connect —
          <a href="#" target="_blank" rel="noopener noreferrer">
            @Gracey
          </a>
        </p>

        <span>Designed by Grace Gyawa Boadi</span>
      </div>
    </div>
  );
};

export default Footer;
