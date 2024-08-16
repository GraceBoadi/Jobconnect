import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Companycard,
  Footer,
  ListBox,
  Navigation,
  Loading,
} from "../../components";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import "./company.css";
import { getCompanies, getCompanyJobListing } from "../../api/company-api";
import { updateURL } from "../../utils";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsFetching(true);
      const newURL = updateURL({
        pageNum: page,
        query: searchQuery,
        cmpLoc: location,
        sort: sort,
        navigate: navigate,
        location: location,
      });
      try {
        const companiesData = await getCompanies(newURL, user?.token);
        setCompanies(companiesData.data);
        setTotalCompanies(companiesData?.total);
        setNumPage(companiesData?.numOfPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchInitialData();
  }, [user, page, totalCompanies]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
  };

  const handleShowMore = async () => {
    setIsFetching(true);
    try {
      const newPage = page + 1;
      const companiesData = await getCompanies(
        newPage,
        totalCompanies,
        user.token
      );
      setCompanies((prev) => [...prev, ...companiesData.companies]);
      setPage(newPage);
    } catch (error) {
      console.error("Error loading more companies:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <Navigation />

      <div className="companies-container">
        <div className="company-banner">
          <p className="title">Find Your Dream Company...</p>

          <div className="form">
            <div className="search-field-container">
              <div className="search-field">
                <AiOutlineSearch className="icon btn" />
                <input
                  type="text"
                  className="search-inp"
                  placeholder="Company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="search-field">
                <CiLocationOn className="icon btn" />
                <input
                  type="text"
                  className="search-inp"
                  placeholder="Country or city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="btn" onClick={handleSearchSubmit}>
                Search
              </button>
            </div>
          </div>

          <div className="popular-searches">
            {/* Populate popular searches here */}
          </div>
        </div>

        <div className="companies-info">
          <p>
            Showing: <b>{companies.length}</b> out of <b>{totalCompanies}</b>{" "}
            Companies Available
          </p>

          <div className="companies-sort">
            <p>Sort By:</p>
            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="company-list">
          {companies.map((cmp, index) => (
            <Companycard cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className="loading-container">
              <Loading />
            </div>
          )}

          <p className="companies-count">
            {companies.length} records out of {totalCompanies}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="load-more-button">
            <button onClick={handleShowMore}>Load More</button>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Company;
