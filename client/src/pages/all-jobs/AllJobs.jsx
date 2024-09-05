import "./all-jobs.css";
import {
  Footer,
  JobCard,
  ListBox,
  Loading,
  Navigation,
} from "../../components";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { experience, jobTypes, popularSearch } from "../../utils/data";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { getJobPosts } from "../../api/job-api";
import { updateURL } from "../../utils";
import { HeroBanner, Pattern2, Pattern3, Shadow1, Shadow2 } from "../../assets";

const AllJobs = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [expVal, setExpVal] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

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
      setJobs(data.data);
      setTotalJobs(data?.totalJobs);
      setNumPage(data?.numOfPage);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el != val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = async (e) => {
    // setFilterExp(e);
    if (expVal?.includes(e)) {
      setExpVal(expVal?.filter((ev) => ev != e));
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Navigation />
      <div className="jobs-container">
        <div className="hero-section">
          <div className="hero-banner">
            <p className="title">Your Dream Job is a Click Away</p>
            <p>
              Discover thousands of opportunities tailored to your skills and
              experience.
            </p>
            <br />
            <br />

            <div className="search-box">
              {/* <div className="popular-searches">
                {popularSearch.map((search, index) => (
                  <span key={index}>{search}</span>
                ))}
              </div> */}

              <form className="form" onSubmit={handleSearchSubmit}>
                <div className="search-field-container">
                  <div className="search-field">
                    <div className="field-icon">
                      <AiOutlineSearch className="icon btn" />
                    </div>
                    <input
                      type="text"
                      className="search-inp"
                      placeholder="Job title or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="search-field">
                    <div className="field-icon">
                      <CiLocationOn className="icon btn" />
                    </div>
                    <input
                      type="text"
                      className="search-inp"
                      placeholder="Add country or city"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div className="hero-ban">
              <img
                src={HeroBanner} 
                alt="Wren Clark"
                className="w-100"
              />

              <img
                src={Pattern2}
                width="27"
                height="26"
                alt="shape"
                className="shape shape-1"
              />

              <img
                src={Pattern3}
                width="27"
                height="26"
                alt="shape"
                className="shape shape-2"
              />
            </div>
          </div>

          <img src={Shadow1} alt="" className="hero-bg hero-bg-1" />

          <img src={Shadow2} alt="" className="hero-bg hero-bg-2" />
        </div>

        <div className="job-search">
          <div className="filters">
            <p className="title">Filter Search</p>
            <div className="filter-group">
              <div className="label">
                <p className="label-name">
                  <BiBriefcaseAlt2 />
                  Job Type
                </p>
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

          <div className="job-listings">
            <div className="header">
              <p className="info">
                Showing: <b>{totalJobs}</b> Jobs Available
              </p>
              <div className="sort-by">
                <p>Sort By:</p>
                <ListBox sort={sort} setSort={setSort} />
              </div>
            </div>

            {isFetching ? (
              <div className="loading-container">
                <Loading />
              </div>
            ) : (
              <div className="job-cards">
                {jobs.map((job, index) => {
                  const newJob = {
                    name: job?.company?.name,
                    logo: job?.company?.profileUrl,
                    ...job,
                  };
                  return <JobCard job={newJob} key={index} />;
                })}
              </div>
            )}

            {numPage > page && !isFetching && (
              <div className="load-more">
                <button onClick={handleShowMore}>Load More</button>
              </div>
            )}
          </div>
        </div>

        <div className="value-container">
          <h1 className="value-text">
            The value that holds us true and to account.
          </h1>

          <div className="value-grid">
            <div className="singleGrid">
              <div className="item">
                <div className="value-img">
                  <img src={Pattern2} alt="" />
                </div>

                <span>Job-Connect</span>
              </div>
              <p>
                Things being made beautiful and simple are at the heart of
                everything we do.
              </p>
            </div>
            <div className="singleGrid">
              <div className="item">
                <div className="value-img">
                  <img src={Pattern3} alt="" />
                </div>

                <span>For Companies</span>
              </div>
              <p>
                Find professionals from around the country and across all IT skills .
              </p>
            </div>
            <div className="singleGrid">
              <div className="item">
                <div className="value-img">
                  <img src={Pattern2} alt="" />
                </div>

                <span>For Jobseekers</span>
              </div>
              <p>
                Build your professional profile and find new job opportunities.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AllJobs;
