import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  CompanyForm,
  Footer,
  JobCard,
  Loading,
  Navigation,
} from "../../components";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import "./company-profile.css";
import { companies, jobs } from "../../utils/data";

const Company_Profile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setInfo(companies[parseInt(params?.id) - 1 ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Navigation />

      <div className="company-profile">
        <div className="company-profile-heading">
          <div className="company-profile-header">
            <h2 className="">Welcome, {info?.name}</h2>
            <div className="company-profile-action">
              <button className="primary" onClick={() => setOpenForm(true)}>
                <FiEdit3 />
              </button>

              <Link to="/upload-job">
                <button>
                  <p>Upload Job</p>
                  <FiUpload />
                </button>
              </Link>
            </div>
          </div>

          <div className="company-profile-info">
            <div className="profile-info">
              <p>
                <HiLocationMarker className="picon" />{" "}
                {info?.location ?? "No Location"}
              </p>
              <p>
                <AiOutlineMail className="picon" /> {info?.email ?? "No Email"}
              </p>
              <p>
                <FiPhoneCall className="picon" />{" "}
                {info?.contact ?? "No Contact"}
              </p>
            </div>

            <div className="company-profile-job-count">
              <p>{info?.jobPosts?.length ?? 0} Job Post</p>
            </div>
          </div>
        </div>

        <div className="company-profile-jobs">
          <p className="profile-jobs">Jobs Posted</p>

          <div className="company-profile-jobcard">
            {jobs?.map((job, index) => {
              const data = {
                name: info?.name,
                email: info?.email,
                ...job,
              };
              return <JobCard job={data} key={index} />;
            })}
          </div>
        </div>

        <CompanyForm open={openForm} setOpen={setOpenForm} />
      </div>

      <Footer />
    </div>
  );
};

export default Company_Profile;
