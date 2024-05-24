import { Companycard, Footer, ListBox, Navigation } from "../../components";
import "./company.css";
import { useState } from "react";
import { companies, popularSearch } from "../../utils/data";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

const Company = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(10);
  const [data, setData] = useState(companies ?? []);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [type, setType] = useState("home");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const handleSearchSubmit = () => {};
  const handleShowMore = () => {};
  return (
    <div>
      <Navigation />

      <div className="company-banner">
        <p className="title">Find Your Dream Company</p>

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
              value={cmpLocation}
              onChange={(value) => setCmpLocation(value)}
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

      <div className="companies-container">
        <div className="companies-info">
          <p>
            Showing: <b>1,902</b> Companies Available
          </p>

          <div className="companies-sort">
            <p>Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="company-list">
          {data?.map((cmp, index) => (
            <Companycard cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className="loading-container">
              <Loading />
            </div>
          )}

          <p className="companies-count">
            {data?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="load-more-button">
            <button onClick={handleShowMore}>Load More</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Company;
