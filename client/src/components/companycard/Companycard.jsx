import "./companycard.css";
import { Link } from "react-router-dom";

const Companycard = ({ cmp }) => {
  return (
    <div>
      <div className="company-card">
        <div className="company-card-info">
          <Link to={`/company-profile/${cmp?._id}`}>
            <img src={cmp?.profileUrl} alt={cmp?.name} />
          </Link>
          <div className="company-card-details">
            <Link to={`/company-profile/${cmp?._id}`}>{cmp?.name}</Link>
            <span>{cmp?.email}</span>
          </div>
        </div>

        <div className="company-card-location">
          <p>{cmp?.location}</p>
        </div>

        <div className="company-card-jobs">
          <p>{cmp?.jobPosts?.length}</p>
          <span>Jobs Posted</span>
        </div>
      </div>
    </div>
  );
};

export default Companycard;
