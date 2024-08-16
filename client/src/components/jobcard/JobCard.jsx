import moment from "moment";
import { Link } from "react-router-dom";
import "./jobcard.css";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-details/${job?._id}`}>
      <div className="job-card">
        <div className="job-card-header">
          <div className="job-info">
            <img src={job?.logo} alt={job?.name} className="" />
            <div>
              <h4>
              {job?.name} <span>| {moment(job?.createdAt).fromNow()}</span>
              </h4>
              <h3>{job?.jobTitle?.slice(0, 30) + "..."}</h3>
              <p>{job?.location}</p>
            </div>
          </div>
          <i className="bx bx-bookmark-plus"></i>
        </div>
        <div className="job-card-tags">
          <span>{job?.jobType}</span>
          <span>Freelance</span>
        </div>
        <div className="job-card-desc">
          {job?.detail?.desc?.slice(0, 200) + "..."}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
