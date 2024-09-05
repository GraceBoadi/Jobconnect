import "./about.css";
import { JobImg } from "../../assets";
import { Sidebar, Topbar } from "../../components";
import { useState } from "react";

const About = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="body">
      <Sidebar
        isVisible={isSidebarVisible}
        handleToggleSidebar={toggleSidebar}
      />

      <div className="container">
        <Topbar toggleSidebar={toggleSidebar} />
        <br />
        <br />
        <div className="main">
          <div className="content">
            <div className="about-content">
              <div className="about-text">
                <h2 className="about-title">
                  Jobs-Connect: Your Career Connection
                </h2 >
                <br />
                <p className="about-description">
                  <b>Jobs-Connect</b> is a one-stop platform that connects job
                  seekers with a wide range of opportunities across various
                  industries. We empower users to find their dream jobs and help
                  companies discover top talent.
                  <br />
                  <br />
                  <b>Jobs-Connect</b> is your ultimate destination for finding
                  your ideal job or top-tier talent. We're committed to bridging
                  the gap between job seekers and employers, creating a dynamic
                  platform where opportunities thrive.
                </p>
              </div>
              <img
                src={JobImg}
                alt="About Jobs-Connect"
                className="about-image"
              />
            </div>

            <div className="filters"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
