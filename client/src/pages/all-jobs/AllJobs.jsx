import "./all-jobs.css";
import { Footer, JobCard, ListBox, Navigation } from "../../components";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { experience, jobs, jobTypes, popularSearch } from "../../utils/data";
import { HeroImage } from "../../assets";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";

const AllJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("home");

  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);
  return (
    <div>
      <div className="jobs-container">
        <Navigation />

        <div className="hero-section">
          <div className="hero-banner">
            <p className="title">Find Your Dream Job with Ease</p>

            <div className="form">
              <div className="search-field">
                <AiOutlineSearch className="icon" />

                <input
                  type="text"
                  className=""
                  placeholder="job title or keyword"
                  value={searchQuery}
                  onChange={(text) => setSearchQuery(text)}
                />

                <AiOutlineCloseCircle className="clear-icon" onClick />
              </div>
              <div className="search-field">
                <CiLocationOn className="icon" />

                <input
                  type="text"
                  className=""
                  placeholder="add country or city"
                  value={location}
                  onChange={(value) => setLocation(value)}
                />

                <AiOutlineCloseCircle className="clear-icon" onClick />
              </div>

              <div>
                <button>Search</button>
              </div>
            </div>

            {type && (
              <div className="popular-searches">
                {popularSearch.map((search, index) => (
                  <span key={index} className="">
                    {search}
                  </span>
                ))}
              </div>
            )}
            {/* <img src={HeroImage} /> */}
          </div>
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
                      className=""
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
                      value={exp?.value}
                      className=""
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
                Showing: <b>1,902</b> Jobs Available
              </p>

              <div className="sort-by">
                <p>Sort By:</p>

                <ListBox sort={sort} setSort={setSort} />
              </div>
            </div>

            <div className="job-cards">
              {jobs.map((job, index) => (
                <JobCard job={job} key={index} />
              ))}
            </div>

            {/* {numPage > page && !isFetching && ( */}
            <div className="load-more">
              <button>Load More</button>
            </div>
            {/* )} */}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AllJobs;
