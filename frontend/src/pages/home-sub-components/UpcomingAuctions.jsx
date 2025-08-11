import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Today's <span className="gradient-text">Auctions</span>
        </h2>
        <p className="text-gray-600">Starting today - don't miss out!</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Hero Card */}
        <div className="glass rounded-3xl p-8 lg:col-span-1 bg-gradient-to-br from-purple-600 to-blue-600 text-white hover-lift">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <RiAuctionFill className="text-2xl" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Live Auctions</h3>
          <p className="text-white/80 mb-4">Starting Today</p>
          <div className="text-3xl font-bold">{auctionsStartingToday.length}</div>
          <p className="text-white/60 text-sm">Active Now</p>
        </div>

        {/* Auction Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {auctionsStartingToday.slice(0, 6).map((auction, index) => (
            <Link
              key={auction._id}
              to={`/auction/item/${auction._id}`}
              className="glass rounded-2xl p-4 hover-lift group fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={auction.image?.url}
                  alt={auction.title}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {auction.title}
                  </h4>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Starting Bid</span>
                  <span className="font-bold gradient-text">₹{auction.startingBid?.toLocaleString()}</span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-600 mb-1">Starts at</div>
                  <div className="text-xs font-mono text-gray-800">
                    {new Date(auction.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {auctionsStartingToday.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No auctions today</h3>
          <p className="text-gray-600">Check back tomorrow for new opportunities</p>
        </div>
      )}
    </section>
  );
};

export default UpcomingAuctions;