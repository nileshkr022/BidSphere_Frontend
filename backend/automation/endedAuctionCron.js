import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const now = new Date();
      console.log("Cron for ended auction running...");

      const endedAuctions = await Auction.find({
        endTime: { $lt: now },
        commissionCalculated: false,
      });

      for (const auction of endedAuctions) {
        try {
          // Calculate commission
          const commissionAmount = await calculateCommission(auction._id);
          auction.commissionCalculated = true;

          // Find highest bidder
          const highestBidder = await Bid.findOne({
            auctionItem: auction._id,
            amount: auction.currentBid,
          });

          // Find auctioneer
          const auctioneer = await User.findById(auction.createdBy);
          auctioneer.unpaidCommission += commissionAmount;

          if (highestBidder) {
            auction.highestBidder = highestBidder.bidder.id;
            await auction.save();

            const bidder = await User.findById(highestBidder.bidder.id);
            if (!bidder || !bidder.email) {
              console.error(`Bidder data missing for auction: ${auction._id}`);
              continue;
            }

            // Update bidder & auctioneer details
            await User.findByIdAndUpdate(
              bidder._id,
              { $inc: { moneySpent: highestBidder.amount, auctionsWon: 1 } },
              { new: true }
            );

            await User.findByIdAndUpdate(
              auctioneer._id,
              { $inc: { unpaidCommission: commissionAmount } },
              { new: true }
            );

            // Construct email content
            const subject = `Congratulations! You won the auction for ${auction.title}`;
            const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the auction for ${auction.title}. \n\nBefore proceeding for payment, contact your auctioneer at ${auctioneer.email}. \n\nPayment Methods:\n1. **Bank Transfer:**\n   - Account Name: ${auctioneer.paymentMethods.bankTransfer.bankAccountName}\n   - Account Number: ${auctioneer.paymentMethods.bankTransfer.bankAccountNumber}\n   - Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n2. **UPI:** ${auctioneer.paymentMethods.upi.upiAccountNumber}\n\n3. **PayPal:** ${auctioneer.paymentMethods.paypal.paypalEmail}\n\n4. **Cash on Delivery (COD):**\n   - Pay 20% upfront before delivery via any method above.\n   - The remaining 80% is due upon delivery.\n\nFor any queries, contact ${auctioneer.email}.\n\nBest Regards,\nBidSphere Team`;

            console.log(`SENDING EMAIL TO HIGHEST BIDDER: ${bidder.email}`);
            await sendEmail({ email: bidder.email, subject, message });
            console.log("SUCCESSFULLY SENT EMAIL TO HIGHEST BIDDER");
          } else {
            await auction.save();
          }
        } catch (error) {
          console.error(`Error processing auction ${auction._id}:`, error);
        }
      }
    } catch (error) {
      console.error("Error in ended auction cron job:", error);
    }
  });
};
