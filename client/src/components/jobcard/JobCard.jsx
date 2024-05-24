import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";
import "./jobcard.css";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-details/${job?.id}`}>
      <div className="job-card">
        <div className="head">
          <img
            src={job?.company?.profileUrl} 
            alt={job?.company?.name}
            className=""
          />

          <div className="details">
            <p>{job?.jobTitle?.slice(0, 16) + "..."}</p>
            <span>
              <GoLocation />
              {job?.location}
            </span>
          </div>
        </div>

        <div className="description">
          <p>{job?.detail[0]?.desc?.slice(0, 100) + "..."}</p>
        </div>

        <div className="footer">
          <p className="job-type">
            {job?.jobType}
          </p>
          <span className="date">
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
