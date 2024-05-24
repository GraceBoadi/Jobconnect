import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobs } from "../../utils/data";
import moment from "moment";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import "./job-detail.css";
import { Footer, JobCard, Navigation } from "../../components";

const JobDetails = () => {
  const params = useParams();
  const id = parseInt(params.id) - 1;
  const [job, setJob] = useState(jobs[0]);
  const [selected, setSelected] = useState("0");

  useEffect(() => {
    setJob(jobs[id ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div>
      <Navigation />

      <div className="job-details-container">
        <div className="job-details">
          {/* LEFT SIDE */}
          <div className="job-details-left">
            <div className="job-details-left-header">
              <div className="job-details-left-header-info">
                <img src={job?.company?.profileUrl} alt={job?.company?.name} />

                <div className="">
                  <p>{job?.jobTitle}</p>

                  <span className="location">{job?.location}</span>

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
                <span>No. of Applicants</span>
                <p>{job?.applicants?.length}K</p>
              </div>

              <div className="job-details-left-details-card bg-voilet">
                <span>No. of Vacancies</span>
                <p>{job?.vacancies}</p>
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
                  <p>Job Decsription</p>

                  <span>{job?.detail[0]?.desc}</span>

                  {job?.detail[0]?.requirement && (
                    <>
                      <p>Requirement</p>
                      <span>{job?.detail[0]?.requirement}</span>
                    </>
                  )}
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

            <div className="job-details-left-apply">
              <button>Apply Now</button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="job-details-right">
            <p className="job-details-right-title">Similar Job Post</p>

            <div className="job-details-right-jobs">
              {jobs?.slice(0, 6).map((job, index) => (
                <JobCard job={job} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobDetails;
