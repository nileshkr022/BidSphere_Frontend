import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white mx-auto w-full max-w-4xl h-auto px-6 py-6 flex flex-col gap-6 items-center rounded-md shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <img
                src={user.profileImage?.url}
                alt="/imageHolder.jpg"
                className="w-36 h-36 rounded-full border-4 border-gray-300"
              />
              <h2 className="text-2xl font-semibold text-center">{user.userName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={user.userName}
                    className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    defaultValue={user.email}
                    className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="number"
                    defaultValue={user.phone}
                    className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={user.address}
                    className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue={user.role}
                    className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Joined On
                  </label>
                  <input
                    type="text"
                    defaultValue={user.createdAt?.substring(0, 10)}
                    className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                    disabled
                  />
                </div>
              </div>
            </div>

            {user.role === "Auctioneer" && (
              <div className="w-full mt-6">
                <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.paymentMethods.bankTransfer.bankName}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Account Number
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user.paymentMethods.bankTransfer.bankAccountNumber
                      }
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        user.paymentMethods.bankTransfer.bankAccountName
                      }
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      UPI Account Number
                    </label>
                    <input
                      type="text"
                      defaultValue={user.paymentMethods.upi.upiAccountNumber}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Paypal Email
                    </label>
                    <input
                      type="text"
                      defaultValue={user.paymentMethods.paypal.paypalEmail}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="w-full mt-6">
              <h3 className="text-xl font-semibold mb-4">Other User Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.role === "Auctioneer" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Unpaid Commissions
                      </label>
                      <input
                        type="text"
                        defaultValue={user.unpaidCommission}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                  </>
                )}
                {user.role === "Bidder" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Auctions Won
                      </label>
                      <input
                        type="text"
                        defaultValue={user.auctionsWon}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Money Spent
                      </label>
                      <input
                        type="text"
                        defaultValue={user.moneySpent}
                        className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none"
                        disabled
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default UserProfile;
