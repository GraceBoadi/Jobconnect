import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navigation.css";

function MenuList({ user, onClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Implement logout functionality here
  };

  return (
    <div className="menu-list">
      <Menu as="div">
        <div className="menu-button">
          <img
            src={user?.profileUrl ?? "/src/assets/avatar5.jpg"}
            alt="user profile"
            className="menu-img"
          />
          <div className="menu-profile">
            <p>{user?.firstName ?? user?.name}Deja</p>
            <span>{user?.jobTitle ?? user?.email}@email.com</span>
          </div>
          <BiChevronDown
            className={`menu-button-svg ${menuOpen ? "active" : ""}`}
            aria-hidden="true"
            onClick={handleMenuToggle}
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
                      user?.accountType ? "user-profile" : "company-profile"
                    }`}
                    className={active ? "active" : ""}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`menu-item-svg ${active ? "active" : ""}`}
                      aria-hidden="true"
                    />
                    {user?.accountType ? "User Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className="menu-item">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={active ? "active" : ""}
                  >
                    <AiOutlineLogout
                      className={`menu-item-svg ${active ? "active" : ""}`}
                      aria-hidden="true"
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="navigation-container">
      <nav>
        <div>
          <Link to="/" className="navigation-logo">
            All<span>Jobs</span>
          </Link>
        </div>

        <ul className="navigation-list">
          <li>
            <Link to="/all-jobs">Find Job</Link>
          </li>
          <li>
            <Link to="/company">Companies</Link>
          </li>
          <li>
            <Link to="/upload-jobs">Upload Job</Link>
          </li>
          <li>
            <Link to="/about-us">About</Link>
          </li>
        </ul>

        <div className="signin-cta">
          {!user?.token ? (
            <Link to="/auth">
              <button className="signin-btn hide">Sign In</button>
            </Link>
          ) : (
            <MenuList user={user} />
          )}

          <div className="menu-toggle" onClick={handleToggleNavbar}>
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? "flex" : "hidden"}`}>
        <Link to="/all-jobs" onClick={handleToggleNavbar}>
          Find Job
        </Link>
        <Link to="/company" onClick={handleToggleNavbar}>
          Companies
        </Link>
        <Link to="/upload-jobs" onClick={handleToggleNavbar}>
          Upload Job
        </Link>
        <Link to="/about-us" onClick={handleToggleNavbar}>
          About
        </Link>

        <div className="signin-cta">
          {!user?.token ? (
            <Link to="/auth">
              <button className="signin-btn">Sign In</button>
            </Link>
          ) : (
            <MenuList user={user} onClick={handleToggleNavbar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
