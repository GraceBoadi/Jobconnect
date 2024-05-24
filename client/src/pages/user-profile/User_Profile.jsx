import { useState } from "react";
import { useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import "./user-profile.css";
import { Footer, Navigation, UserForm } from "../../components";
import { NoProfile } from "../../assets";

const User_Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const userInfo = user;
  return (
    <div>
      <Navigation />

      <div className="user-profile-container">
        <div className="user-profile">
          <div className="user-profile-header">
            <h1 className="user-profile-name">William Stewart</h1>

            <h5 className="user-profile-title">Business Admin</h5>

            <div className="user-profile-info">
              <p className="user-profile-info-item">
                <HiLocationMarker /> {"London" ?? "No Location"}
              </p>
              <p className="user-profile-info-item">
                <AiOutlineMail /> {"wilst@gmailcom" ?? "No Email"}
              </p>
              <p className="user-profile-info-item">
                <FiPhoneCall /> {"support@all-jobs" ?? "No Contact"}
              </p>
            </div>
          </div>

          <hr />

          <div className="user-profile-about">
            <div className="user-profile-about-content">
              <div className="user-profile-about-text">
                <p>ABOUT</p>
                <span>
                  {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.` ??
                    "No About Found"}
                </span>
              </div>

              <div className="user-profile-image">
                <img src={NoProfile} alt={userInfo?.firstName} />
                <button onClick={() => setOpen(true)}>Edit Profile</button>
              </div>
            </div>
          </div>
        </div>

        <UserForm open={open} setOpen={setOpen} />
      </div>

      <Footer />
    </div>
  );
};

export default User_Profile;
