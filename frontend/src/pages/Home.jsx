import React, { useState, useEffect, useRef } from 'react'
import auctionPng from '../assets/auction.png';
import { Link } from 'react-router-dom';

import EmptyLoader from '../components/EmptyLoader';
import { fetchAuctions } from '../services/operations/auctionAPI';
import { ChevronRight, Star, Users, Shield, Clock } from "lucide-react";
import { motion, useInView } from "motion/react";
import { FaGavel, FaGem, FaCar, FaPalette, FaHome, FaTshirt, FaLaptop, FaGamepad } from "react-icons/fa"
import { fetchFeaturedAuctions } from '../services/operations/auctionAPI';

const categories = [
    { name: "Art & Collectibles", icon: FaPalette, color: "from-purple-500 to-pink-500", count: "2.5k+" },
    { name: "Jewelry & Watches", icon: FaGem, color: "from-yellow-500 to-orange-500", count: "1.8k+" },
    { name: "Vehicles", icon: FaCar, color: "from-blue-500 to-cyan-500", count: "950+" },
    { name: "Real Estate", icon: FaHome, color: "from-green-500 to-emerald-500", count: "420+" },
    { name: "Fashion", icon: FaTshirt, color: "from-pink-500 to-rose-500", count: "3.2k+" },
    { name: "Electronics", icon: FaLaptop, color: "from-indigo-500 to-purple-500", count: "1.5k+" },
    { name: "Gaming", icon: FaGamepad, color: "from-red-500 to-pink-500", count: "890+" },
    { name: "Antiques", icon: FaGavel, color: "from-amber-500 to-yellow-500", count: "670+" },
  ]

const features = [
    {
      icon: Shield,
      title: "Secure Bidding",
      description: "Advanced security measures protect every transaction",
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with collectors and sellers worldwide",
    },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div>
          <p className="text-[#DECCBE] font-bold text-xl mb-8">
            Transparency Leads to Your Victory
          </p>
          <h1
            className={`text-[#111] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Transparent Auctions
          </h1>
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Be The Winner
          </h1>
          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-[#d6482b] font-bold text-xl hover:bg-[#b8381e] rounded-md px-8 flex items-center py-2 text-white  transition-all duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#DECCBE] bg-transparent border-2 border-[#DECCBE] hover:bg-[#fff3fd] hover:text-[#fdba88] font-bold text-xl  rounded-md px-8 flex items-center py-2 transition-all duration-300"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">How it works</h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
            {howItWorks.map((element) => {
              return (
                <div
                  key={element.title}
                  className="bg-white flex flex-col gap-2 p-2 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] hover:shadow-md transition-all duration-300"
                >
                  <h5 className="font-bold">{element.title}</h5>
                  <p>{element.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </section>
    </>
  );
};

export default Home;