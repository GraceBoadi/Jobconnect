import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navigation.css";
import { dispatch } from "../../redux/store";
import { Logout } from "../../redux/userSlice";
import { NoProfile } from "../../assets";

export function MenuList({ user, onClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <div className="menu-list">
      <Menu as="div">
        <div className="menu-button" onClick={handleMenuToggle}>
          <img
            src={user?.profileUrl ?? NoProfile}
            alt="user profile"
            className="menu-img"
          />
        </div>

        <Transition
          as={Fragment}
          show={menuOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="menu-items">
            <div className="menu-item">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType === "seeker"
                        ? `/user-profile/${user?._id}`
                        : `/company-profile/${user?._id}`
                    }`}
                    className={active ? "active" : ""}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`menu-item-svg ${active ? "active" : ""}`}
                      aria-hidden="true"
                    />
                    {user?.accountType === "seeker"
                      ? "User Profile"
                      : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className="menu-item">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    onClick={handleLogout}
                    className={active ? "active" : ""}
                  >
                    <AiOutlineLogout
                      className={`menu-item-svg ${active ? "active" : ""}`}
                      aria-hidden="true"
                    />
                    Log Out
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navigation = ({ isAuth }) => {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleToggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navigation-container ${isSticky ? "sticky-bar" : ""}`}>
      <nav>
        <div>
          <Link to="/" className="navigation-logo">
            Job-<span>Connect</span>
          </Link>
        </div>

        {!isAuth && (
          <>
            <ul className="navigation-list">
              <li>
                <Link to="/all-jobs">Find Job</Link>
              </li>
              <li>
                <Link
                  to={`${
                    user?.accountType === "seeker"
                      ? `/dashboard`
                      : `/company-profile/${user?._id}`
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/company">Companies</Link>
              </li>
              <li>
                <Link to="/about-us">About</Link>
              </li>
            </ul>

            <div className="signin-cta">
              {user?.token ? (
                <div className="ml-display">
                  <MenuList user={user} />
                </div>
              ) : (
                <Link to="/auth?login=true" className="hide">
                  <button className="btn">Sign In</button>
                </Link>
              )}

              <div className="menu-toggle" onClick={handleToggleNavbar}>
                {isOpen ? (
                  <AiOutlineClose size={26} />
                ) : (
                  <HiMenuAlt3 size={26} />
                )}
              </div>
            </div>
          </>
        )}
      </nav>

      {!isAuth && (
        <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
          <Link to="/all-jobs" onClick={handleToggleNavbar}>
            Find Job
          </Link>
          <Link
            to={`${
              user?.accountType === "seeker"
                ? `/dashboard`
                : `/company-profile/${user?._id}`
            }`}
            onClick={handleToggleNavbar}
          >
            Dashboard
          </Link>
          <Link to="/company" onClick={handleToggleNavbar}>
            Companies
          </Link>
          <Link to="/about-us" onClick={handleToggleNavbar}>
            About
          </Link>

          <div className="signin-cta">
            {user?.token ? (
              <MenuList user={user} onClick={handleToggleNavbar} />
            ) : (
              <Link to="/auth?login=true">
                <button className="btn">Sign In</button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
