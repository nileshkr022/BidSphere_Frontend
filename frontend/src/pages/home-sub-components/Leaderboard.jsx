import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  const getTrophyIcon = (index) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return "🏅";
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return "from-yellow-400 to-yellow-600";
      case 1: return "from-gray-300 to-gray-500";
      case 2: return "from-orange-400 to-orange-600";
      default: return "from-purple-400 to-purple-600";
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Top <span className="gradient-text">Bidders</span>
          </h2>
          <p className="text-gray-600">Leading the auction game</p>
        </div>
        <Link to="/leaderboard" className="btn-secondary hidden md:inline-block">
          View Full Leaderboard
        </Link>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <h3 className="text-xl font-bold text-white">🏆 Hall of Fame</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {leaderboard.slice(0, 10).map((user, index) => (
              <div
                key={user._id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Rank */}
                <div className={`w-12 h-12 bg-gradient-to-r ${getRankColor(index)} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {index < 3 ? getTrophyIcon(index) : index + 1}
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={user.profileImage?.url}
                    alt={user.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 truncate">{user.userName}</h4>
                    <p className="text-sm text-gray-600">{user.auctionsWon} auctions won</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-lg gradient-text">
                    ₹{user.moneySpent?.toLocaleString() || 0}
                  </div>
                  <div className="text-sm text-gray-600">spent</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 md:hidden">
        <Link to="/leaderboard" className="btn-primary">
          View Full Leaderboard
        </Link>
      </div>
    </section>
  );
};

export default Leaderboard;