import React, { useState, useEffect, useRef } from "react";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaGithubSquare, FaUserCircle, FaFileInvoiceDollar, FaEye } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const drawerRef = useRef(null);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  // Close drawer if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-3xl p-3 rounded-xl hover:from-purple-700 hover:to-blue-700 lg:hidden z-50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <GiHamburgerMenu />
      </div>

      {/* Side Drawer */}
      <div
        ref={drawerRef}
        className={`w-[100%] sm:w-[320px] glass-dark h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-300 p-6 flex flex-col justify-between lg:left-0 border-r border-white/20 backdrop-blur-xl z-40`}
      >
        <div className="relative">
          <Link to={"/"} className="block mb-8">
            <h4 className="text-3xl font-bold text-white">
              Bid<span className="gradient-text">Sphere</span>
            </h4>
            <p className="text-white/60 text-sm mt-1">Premium Auction Platform</p>
          </Link>
          
          <nav className="space-y-2">
            <NavItem to="/auctions" icon={<RiAuctionFill />} text="Auctions" />
            <NavItem to="/leaderboard" icon={<MdLeaderboard />} text="Leaderboard" />
            
            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <NavItem to="/submit-commission" icon={<FaFileInvoiceDollar />} text="Submit Commission" />
                <NavItem to="/create-auction" icon={<IoIosCreate />} text="Create Auction" />
                <NavItem to="/view-my-auctions" icon={<FaEye />} text="My Auctions" />
              </>
            )}
            
            {isAuthenticated && user?.role === "Super Admin" && (
              <NavItem to="/dashboard" icon={<MdDashboard />} text="Dashboard" />
            )}
          </nav>

          {!isAuthenticated ? (
            <div className="my-8 flex flex-col gap-3">
              <Link to="/sign-up" className="btn-primary text-center">
                Sign Up
              </Link>
              <Link to="/login" className="btn-secondary text-center text-white">
                Login
              </Link>
            </div>
          ) : (
            <div className="my-8">
              <button onClick={handleLogout} className="btn-primary w-full">
                Logout
              </button>
            </div>
          )}

          <hr className="mb-6 border-white/20" />
          
          <nav className="space-y-2">
            {isAuthenticated && (
              <NavItem to="/me" icon={<FaUserCircle />} text="Profile" />
            )}
            <NavItem to="/how-it-works-info" icon={<SiGooglesearchconsole />} text="How it works" />
            <NavItem to="/about" icon={<BsFillInfoSquareFill />} text="About Us" />
          </nav>
          
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden cursor-pointer text-white hover:text-red-400 transition-colors"
          />
        </div>

        {/* Footer */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <SocialLink href="https://github.com/nileshkr022" icon={<FaGithubSquare />} />
            <SocialLink href="https://www.instagram.com/_.nileshhh/" icon={<RiInstagramFill />} />
          </div>
          <div className="text-white/60 text-sm space-y-1">
            <Link to="/contact" className="block hover:text-white transition-colors">
              Contact Us
            </Link>
            <p>&copy; BidSphere, LLC.</p>
            <p>
              Designed By{" "}
              <Link to="https://www.linkedin.com/in/nileshkr022/" className="text-white hover:gradient-text transition-colors">
                Nilesh Kumar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-300 group"
  >
    <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

const SocialLink = ({ href, icon }) => (
  <Link
    to={href}
    className="bg-white/10 text-white/80 p-3 text-xl rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300 hover:scale-110"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </Link>
);

export default SideDrawer;