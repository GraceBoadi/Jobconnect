import { useState } from "react";
import "./topbar.css";
import { MenuList } from "../navigation/Navigation";
import { useSelector } from "react-redux";
import { MdOutlineMenuOpen } from "react-icons/md";

const Topbar = ({toggleSidebar}) => {
  const { user } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="nav">
        <div className="nav-left">
          <MdOutlineMenuOpen
            className="sidebar_toggler btn"
            onClick={toggleSidebar}
          />
          {/* <div className="search">
            <i className="bx bx-search"></i>
            <input
              type="text"
              placeholder="Search for jobs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="city">
            <i className="bx bxs-location-plus"></i>
            <input
              type="text"
              placeholder="Enter city, location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </div>
          <i onClick={handleSearchSubmit} className="bx bx-search"></i> */}
        </div>
        <div className="nav-right">
          <i className="bx bx-bell"></i>
          <div className="user-info">
            <MenuList user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
