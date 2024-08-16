import { useState } from "react";
import { useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import "./user-profile.css";
import { Sidebar, Topbar, UserForm } from "../../components";
import { NoProfile } from "../../assets";

const User_Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const userInfo = user;
  return (
    <div>
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
              <div className="user-profile">
                <div className="user-profile-header">
                  <h1 className="user-profile-name">
                    {user?.firstName + " " + user?.lastName}
                  </h1>

                  <h5 className="user-profile-title">
                    {user?.jobTitle ?? "No Job Title"}
                  </h5>

                  <div className="user-profile-info">
                    <p className="user-profile-info-item">
                      <HiLocationMarker /> {user?.location ?? "No Location"}
                    </p>
                    <p className="user-profile-info-item">
                      <AiOutlineMail /> {user?.email ?? "No Email"}
                    </p>
                    <p className="user-profile-info-item">
                      <FiPhoneCall /> {user?.contact ?? "No Contact"}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="user-profile-about">
                  <div className="user-profile-about-content">
                    <div className="user-profile-about-text">
                      <p>About</p>
                      <span>{user?.about ?? "No About Found"}</span>
                    </div>

                    <div className="user-profile-image">
                      <img
                        src={user?.profileUrl ?? NoProfile}
                        alt={userInfo?.firstName}
                      />
                      <button className="btn" onClick={() => setOpen(true)}>
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <UserForm open={open} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Profile;
