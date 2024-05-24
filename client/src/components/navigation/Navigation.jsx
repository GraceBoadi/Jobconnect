import { Link } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
  return (
    <div>
      <nav className="navigation-container">
        <div>
          <Link to="/all-jobs" className="jobs-logo">
            Jobs<span className="">Finder</span>
          </Link>
        </div>

        <ul className="list">
          <li>
            <Link to="/all-jobs">Find Job</Link>
          </li>
          <li>
            <Link to="/company">Companies</Link>
          </li>
          <li>
            <Link to="/upload-jobs">Upload Job</Link>
          </li>
          <li>
            <Link to="/about-us">About</Link>
          </li>
        </ul>

        <div className="signin-cta">
          <Link to={'/auth'}>
            <button>Sign In</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
