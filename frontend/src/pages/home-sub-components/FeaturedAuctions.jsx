import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Featured <span className="gradient-text">Auctions</span>
          </h2>
          <p className="text-gray-600">Don't miss these premium items</p>
        </div>
        <Link 
          to="/auctions" 
          className="btn-secondary hidden md:inline-block"
        >
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {allAuctions.slice(0, 8).map((auction, index) => (
          <div 
            key={auction._id} 
            className="fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Card
              title={auction.title}
              imgSrc={auction.image?.url}
              startTime={auction.startTime}
              endTime={auction.endTime}
              startingBid={auction.startingBid}
              id={auction._id}
            />
          </div>
        ))}
      </div>

      <div className="text-center md:hidden">
        <Link to="/auctions" className="btn-primary">
          View All Auctions
        </Link>
      </div>
    </section>
  );
};

export default FeaturedAuctions;