import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const isLive = new Date(startTime) <= new Date() && new Date(endTime) > new Date();
  const isUpcoming = new Date(startTime) > new Date();
  const isEnded = new Date(endTime) <= new Date();

  return (
    <Link
      to={`/auction/item/${id}`}
      className="group block w-full max-w-sm mx-auto"
    >
      <div className="glass rounded-2xl overflow-hidden hover-lift transition-all duration-300 group-hover:shadow-2xl">
        {/* Status Badge */}
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute top-4 left-4">
            {isLive && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold pulse-animation">
                🔴 LIVE
              </span>
            )}
            {isUpcoming && (
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ⏰ UPCOMING
              </span>
            )}
            {isEnded && (
              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ⏹️ ENDED
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-bold text-lg text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          {startingBid && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Starting Bid</span>
              <span className="font-bold text-lg gradient-text">
                ₹{startingBid.toLocaleString()}
              </span>
            </div>
          )}
          
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-sm text-gray-600 mb-1">{timeLeft.type}</div>
            {Object.keys(timeLeft).length > 1 ? (
              <div className="font-mono font-bold text-purple-600">
                {formatTimeLeft(timeLeft)}
              </div>
            ) : (
              <div className="font-bold text-red-500">Time's up!</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;