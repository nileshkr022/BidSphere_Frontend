import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const categories = [
    "Electronics", "Furniture", "Art & Antiques", "Jewelry & Watches",
    "Automobiles", "Real Estate", "Collectibles", "Fashion & Accessories",
    "Sports Memorabilia", "Books & Manuscripts"
  ];

  const getAuctionStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return "upcoming";
    if (now >= start && now < end) return "live";
    return "ended";
  };

  const filteredAuctions = allAuctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || auction.category === categoryFilter;
    const matchesStatus = !statusFilter || getAuctionStatus(auction.startTime, auction.endTime) === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) return <Spinner />;

  return (
    <article className="w-full ml-0 m-0 min-h-screen px-5 pt-20 lg:pl-[320px] py-8">
      {/* Header */}
      <div className="glass rounded-3xl p-8 mb-8 fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Live <span className="gradient-text">Auctions</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover amazing items and place your bids
        </p>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              🔍
            </div>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
          >
            <option value="">All Status</option>
            <option value="live">Live</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold gradient-text">{allAuctions.length}</div>
          <div className="text-gray-600">Total Auctions</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-red-500">
            {allAuctions.filter(a => getAuctionStatus(a.startTime, a.endTime) === 'live').length}
          </div>
          <div className="text-gray-600">Live Now</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-500">
            {allAuctions.filter(a => getAuctionStatus(a.startTime, a.endTime) === 'upcoming').length}
          </div>
          <div className="text-gray-600">Upcoming</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-gray-500">
            {allAuctions.filter(a => getAuctionStatus(a.startTime, a.endTime) === 'ended').length}
          </div>
          <div className="text-gray-600">Ended</div>
        </div>
      </div>

      {/* Auctions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAuctions.map((auction, index) => (
          <div 
            key={auction._id} 
            className="fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card
              title={auction.title}
              startTime={auction.startTime}
              endTime={auction.endTime}
              imgSrc={auction.image?.url}
              startingBid={auction.startingBid}
              id={auction._id}
            />
          </div>
        ))}
      </div>

      {filteredAuctions.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No auctions found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}
    </article>
  );
};

export default Auctions;