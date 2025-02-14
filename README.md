BidSphere

BidSphere is a full-stack online auction platform where users can list, bid on, and manage auctions. The platform ensures secure transactions, user authentication, and commission tracking.

🌟 Features

🏷️ User Authentication (Register, Login, Logout, Profile Management)

🔥 Auction Listings (Create, View, Update, Delete Auctions)

💰 Bidding System (Place Bids with Role-Based Access)

📊 Leaderboard (Ranks Users Based on Successful Bids)

🔄 Automated Auction End Handling (Cron Jobs for Expired Auctions)

💳 Commission Tracking (Ensures Fair Transactions for Auctioneers)

📂 Folder Structure

BidSphere/
│── backend/               # Node.js + Express Backend
│   ├── config/            # Configuration Files (Cloudinary, Environment Setup)
│   ├── controllers/       # Business Logic for API Endpoints
│   ├── database/          # MongoDB Connection Setup
│   ├── middleware/        # Authentication & Authorization Middleware
│   ├── models/            # Mongoose Schemas (User, Auction, Bids, Commission)
│   ├── router/            # API Route Handlers
│   ├── utils/             # Utility Functions
│   ├── app.js             # Express App Configuration
│   ├── server.js          # Main Server File
│   ├── endedAuctionCron.js # Automated Auction Expiry Handler
│   ├── verifyCommissionCron.js # Commission Verification Cron Job
│
│── frontend/              # React Frontend
│   ├── src/               # Source Code
│   ├── components/        # Reusable UI Components
│   ├── pages/             # Page-Level Components
│   ├── api/               # API Calls to Backend
│   ├── App.js             # Main React Application
│   ├── index.js           # Entry Point
│
│── .env                   # Environment Variables
│── package.json           # Dependencies & Scripts
│── README.md              # Documentation (You are here!)

🚀 Installation & Setup

Prerequisites

Node.js & npm

MongoDB Atlas or Local MongoDB

Cloudinary Account (for Image Uploads)

Backend Setup

cd backend
npm install
npm start

Create a .env file in backend/ and add:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

Frontend Setup

cd frontend
npm install
npm start

📌 API Endpoints

User APIs

POST /register → Register a new user

POST /login → Authenticate and login user

GET /me → Fetch user profile (Requires Authentication)

GET /leaderboard → Fetch leaderboard rankings

Auction APIs

POST /create → Create an auction item (Auctioneer only)

GET /allitems → Retrieve all auction items

GET /auction/:id → Fetch a specific auction item

DELETE /delete/:id → Remove an auction (Auctioneer only)

PUT /item/republish/:id → Republish an auction item

Bidding APIs

POST /place/:id → Place a bid on an auction item

Commission APIs

POST /proof → Submit commission proof (Auctioneer only)

🎯 Future Enhancements

🔐 OAuth Authentication (Google, GitHub Login)

📈 Advanced Analytics for Auction Performance

📜 Real-Time Bidding with WebSockets

🌐 Multi-Language Support

📞 Contact

Developer: Nilesh Kumar

GitHub Repo: BidSphere
