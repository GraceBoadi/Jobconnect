import { JobCard, Loading, Sidebar, Topbar } from "../../components";
import { useEffect, useState } from "react";
import { experience, jobTypes } from "../../utils/data";
import { useLocation, useNavigate } from "react-router-dom";
import { getJobPosts } from "../../api/job-api";
import { updateURL } from "../../utils";
import "./dashboard.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [totalJobs, setTotalJobs] = useState(0);
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [expVal, setExpVal] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState(user.location);
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, jobLocation, filterJobTypes, filterExp, sort, page]);

  const fetchJobs = async () => {
    setIsFetching(true);
    try {
      const newURL = updateURL({
        pageNum: page,
        query: searchQuery,
        cmpLoc: jobLocation,
        sort: sort,
        navigate: navigate,
        location: location,
        jType: filterJobTypes,
        exp: filterExp,
      });
      const data = await getJobPosts(newURL);
      const filteredJobs = data.data.filter(
        (job) => job.jobTitle.toLowerCase() === user.jobTitle.toLowerCase()
      );
      setJobs(filteredJobs);
      setTotalJobs(filteredJobs.length);
      setNumPage(data?.numOfPage);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = async (e) => {
    if (expVal?.includes(e)) {
      setExpVal(expVal?.filter((ev) => ev !== e));
    } else {
      setExpVal([...expVal, e]);
    }
  };

  useEffect(() => {
    if (expVal.length > 0) {
      let newExpVal = [];

      expVal?.map((ev) => {
        const newEv = ev?.split("-");
        newExpVal.push(Number(newEv[0]), Number(newEv[1]));
      });

      newExpVal?.sort((a, b) => a - b);

      setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal?.length - 1]}`);
    }
  }, [expVal]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

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
            <div className="header">
              <h4>
                Opportunities matching your skills <span>{totalJobs}</span>
              </h4>
            </div>

            <div className="job-cards">
              {isFetching ? (
                <div className="loading-container">
                  <Loading />
                </div>
              ) : (
                jobs.map((job, index) => {
                  const newJob = {
                    name: job?.company?.name,
                    logo: job?.company?.profileUrl,
                    ...job,
                  };
                  return <JobCard job={newJob} key={index} />;
                })
              )}
            </div>

            {numPage > page && !isFetching && (
              <div className="load-more">
                <button onClick={handleShowMore}>Load More</button>
              </div>
            )}
          </div>

          <div className="filters">
            <p className="title">Filter Search</p>
            <div className="filter-group">
              <div className="label">
                <p className="label-name">
                  <BiBriefcaseAlt2 />
                  Job Type
                </p>
                <button>
                  <MdOutlineKeyboardArrowDown />
                </button>
              </div>
              <div className="options">
                {jobTypes.map((jtype, index) => (
                  <div key={index} className="option">
                    <input
                      type="checkbox"
                      value={jtype}
                      onChange={(e) => filterJobs(e.target.value)}
                    />
                    <span>{jtype}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="label">
                <p className="label-name">
                  <BsStars />
                  Experience
                </p>
                <button>
                  <MdOutlineKeyboardArrowDown />
                </button>
              </div>
              <div className="options">
                {experience.map((exp) => (
                  <div key={exp.title} className="option">
                    <input
                      type="checkbox"
                      value={exp.value}
                      onChange={(e) => filterExperience(e.target.value)}
                    />
                    <span>{exp.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
