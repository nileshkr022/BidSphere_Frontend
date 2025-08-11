import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from "@/custom-components/Spinner";

const Home = () => {
  const howItWorks = [
    { 
      title: "Post Items", 
      description: "Auctioneer posts items for bidding.",
      icon: "📝",
      color: "from-blue-500 to-purple-600"
    },
    { 
      title: "Place Bids", 
      description: "Bidders place bids on listed items.",
      icon: "💰",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
      icon: "🏆",
      color: "from-yellow-500 to-orange-600"
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
      icon: "💳",
      color: "from-red-500 to-pink-600"
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  
  return (
    <section className="w-full ml-0 m-0 min-h-screen px-5 pt-20 lg:pl-[320px] flex flex-col py-8">
      {/* Hero Section */}
      <div className="glass rounded-3xl p-8 md:p-12 mb-12 fade-in-up">
        <div className="max-w-4xl">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            ✨ Transparency Leads to Your Victory
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
            <span className="text-gray-800">Transparent</span>
            <br />
            <span className="gradient-text">Auctions</span>
            <br />
            <span className="text-gray-800">Be The</span>{" "}
            <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Winner</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
            Join the most trusted auction platform where transparency meets opportunity. 
            Discover unique items, place competitive bids, and experience the thrill of winning.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/sign-up" className="btn-primary text-center px-8 py-4 text-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary text-center px-8 py-4 text-lg">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to start your auction journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, index) => (
            <div
              key={step.title}
              className="glass rounded-2xl p-6 hover-lift fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
              <div className="mt-4 text-sm font-semibold text-purple-600">
                Step {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="glass rounded-3xl p-8 mb-16 fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
            <div className="text-gray-600">Successful Auctions</div>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">$2M+</div>
            <div className="text-gray-600">Total Value Traded</div>
          </div>
        </div>
      </div>

      <FeaturedAuctions />
      <UpcomingAuctions />
      <Leaderboard />
    </section>
  );
};

export default Home;