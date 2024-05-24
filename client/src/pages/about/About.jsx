import "./about.css";
import { JobImg } from "../../assets";
import { Footer, Navigation } from "../../components";

const About = () => {
  return (
    <>
      <Navigation />
      <div className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h1 className="about-title">About All-Jobs</h1>
            <p className="about-description">
              All-Jobs is a one-stop platform that connects job seekers with a
              wide range of opportunities across various industries. We empower
              users to find their dream jobs and help companies discover top
              talent.
            </p>
          </div>
          <img src={JobImg} alt="About All-Jobs" className="about-image" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
