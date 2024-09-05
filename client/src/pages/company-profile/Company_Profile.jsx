import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  CompanyForm,
  JobCard,
  Loading,
  Sidebar,
  Topbar,
} from "../../components";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import "./company-profile.css";
import { getCompanyById } from "../../api/company-api";

const Company_Profile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company data
        const companyData = await getCompanyById(params.id, user.token);

        setInfo(companyData?.data);
        setJobs(companyData?.data.jobPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [params.id, user.token]);

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
            <div className="company-profile">
              <div className="company-profile-header">
                {user?.name && !user?.accountType ? (
                  <>
                    <h2>Welcome, {info?.name}</h2>
                    <div className="company-profile-action">
                      <button className="btn" onClick={() => setOpenForm(true)}>
                        <FiEdit3 />
                      </button>

                      <Link to="/upload-job">
                        <button className="btn">
                          <FiUpload />
                        </button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <h2>{info?.name}</h2>
                )}
              </div>

              <div className="company-profile-info">
                <h2 className="about-title">About Company</h2>
                <span className="about-text">{info?.about}</span>

                <div className="profile-info">
                  <p>
                    <HiLocationMarker className="picon" />{" "}
                    {info?.location ?? "No Location"}
                  </p>
                  <p>
                    <AiOutlineMail className="picon" />{" "}
                    {info?.email ?? "No Email"}
                  </p>
                  <p>
                    <FiPhoneCall className="picon" />{" "}
                    {info?.contact ?? "No Contact"}
                  </p>

                  <div className="company-profile-job-count">
                    <p>{info?.jobPosts?.length ?? 0} Job Posts</p>
                  </div>
                </div>

                <div className="company-profile-jobs">
                  <h3 className="profile-jobs">Jobs Posted</h3>

                  <div className="company-profile-jobcard">
                    {jobs?.slice(0, 4).map((job, index) => {
                      const newJob = {
                        name: info?.name,
                        logo: info?.profileUrl,
                        ...job,
                      };
                      return <JobCard job={newJob} key={index} />;
                    })}
                  </div>
                </div>
              </div>
            </div>

            <CompanyForm open={openForm} setOpen={setOpenForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company_Profile;
