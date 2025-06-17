"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/compoents/Navbar";
import { profile } from '@/service/authService'

export default function UserProfile() {
  const [profileData, setProfileData] = useState(null)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    getProfile()
  }, [user])

  console.log("profileData", profileData)
  const getProfile = async () => {
    if (!user) return
    const req = { userId: user?._id }
    await profile(req)
      .then((res) => {
        if (res.status) {
          setProfileData(res?.data)
        }
        else {
          setProfileData(null)
        }
      })
      .catch((error) => {
        console.log("Error in fetching profile data", error)
      })
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 mt-14 flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
          {/* User Header */}
          <div className="flex items-center gap-6 border-b pb-6">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="user"
              className="w-20 h-20 rounded-full border-4 border-blue-500"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{profileData?.userData?.username}</h2>
              <p className="text-gray-600">{profileData?.userData?.email}</p>
              <p className="text-gray-500">{profileData?.userData?.phone}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="bg-blue-100 p-4 rounded-xl shadow">
              <p className="text-sm text-gray-600">Total Orders</p>
              <h3 className="text-xl font-bold text-blue-700">{profileData?.totalOrders}</h3>
            </div>
            <div className="bg-yellow-100 p-4 rounded-xl shadow">
              <p className="text-sm text-gray-600">Wishlist</p>
              <h3 className="text-xl font-bold text-yellow-700">0</h3>
            </div>
            <div className="bg-red-100 p-4 rounded-xl shadow">
              <p className="text-sm text-gray-600">Returns</p>
              <h3 className="text-xl font-bold text-red-700">0</h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Edit Profile
            </button>
            <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700">
              Manage Addresses
            </button>
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              Change Password
            </button>
          </div>

          {/* Recent Orders Preview */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {profileData?.recentOrder?.map((items,index) => {
                return (
                  <div key={index} className="p-4 border rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-medium">{items?.order_id}</p>
                      <p className="text-sm text-gray-500">Delivered on 10 June 2025</p>
                    </div>
                    <p className="text-green-600 font-semibold">₹{items?.amount}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
