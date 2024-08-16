import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import "./job-detail.css";
import { Footer, JobCard, Navigation } from "../../components";
import { getJobById, getJobPosts } from "../../api/job-api";
import { updateURL } from "../../utils";

const JobDetails = () => {
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState("0");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobDetails();
    fetchJobs();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const jobData = await getJobById(id);
      setJob(jobData.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const fetchJobs = async () => {
    try {
      const newURL = updateURL({
        navigate: navigate,
        location: location,
      });
      const data = await getJobPosts(newURL);
      setJobs(data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div>
      <Navigation />

      <div className="job-details-container">
        <div className="job-details">
          <div className="job-details-left">
            <div className="job-details-left-header">
              <div className="job-details-left-header-info">
                <img src={job?.company?.profileUrl} alt={job?.company?.name} />

                <div className="">
                  <p>{job?.jobTitle}</p>

                  <span className="company">{job?.company?.name}</span>

                  <span className="time">
                    {moment(job?.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div className="">
                <AiOutlineSafetyCertificate className="job-details-left-header-icon" />
              </div>
            </div>

            <div className="job-details-left-details">
              <div className="job-details-left-details-card">
                <span>Salary</span>
                <p className="text-lg font-semibold text-gray-700">
                  $ {job?.salary}
                </p>
              </div>

              <div className="job-details-left-details-card bg-blue">
                <span>Job Type</span>
                <p>{job?.jobType}</p>
              </div>

              <div className="job-details-left-details-card bg-red">
                <span>Applicants</span>
                <p>{job?.application?.length}</p>
              </div>

              <div className="job-details-left-details-card bg-voilet">
                <span>Vacancies</span>
                <p>{job?.vacancies}</p>
              </div>

              <div className="job-details-left-details-card bg-voilet">
                <span>Experiences</span>
                <p>{job?.experience}</p>
              </div>
            </div>

            <div className="job-details-left-toggle">
              <button onClick={() => setSelected("0")} className="bg-black">
                Job Description
              </button>
              <button onClick={() => setSelected("1")}>Company</button>
            </div>

            <div className="job-details-left-content">
              {selected === "0" ? (
                <>
                  <p>Job Description</p>

                  <span>{job?.detail?.desc}</span>

                  <p>Requirements</p>
                  <span>{job?.detail?.requirements}</span>
                </>
              ) : (
                <>
                  <div>
                    <p className="name">{job?.company?.name}</p>
                    <span>{job?.company?.location}</span>
                    <span>{job?.company?.email}</span>
                  </div>

                  <p>About Company</p>
                  <span>{job?.company?.about}</span>
                </>
              )}
            </div>

            <div className="job-details-apply">
              <Link className="btn" to={job?.jobURL} target="blank_">
                Apply Now
              </Link>
            </div>
          </div>

          <div className="job-details-right">
            <h3 className="job-details-right-title">Similar Job Posts</h3>

            <div className="job-details-right-jobs">
              {jobs?.slice(0, 4).map((job, index) => {
                const data = {
                  name: job?.company?.name,
                  email: job?.company?.email,
                  logo: job?.company?.profileUrl,
                  ...job,
                };
                return <JobCard job={data} key={index} />;
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default JobDetails;
