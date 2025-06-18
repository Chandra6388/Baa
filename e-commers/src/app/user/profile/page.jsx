"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/compoents/Navbar";
import { profile , profileImg} from '@/service/authService'
import { Camera } from 'lucide-react';
import Swal from "sweetalert2";
import uploadToCloudinary from "@/service/seller/UploadImg.service";
export default function UserProfile() {
  const [profileData, setProfileData] = useState(null)
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading]= useState(true)
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    getProfile()
  }, [user])

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

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    try {
      const uploadedImageUrls = await  uploadToCloudinary(file)

      console.log("ee", uploadedImageUrls)
      
      const req = {
        userId: user?._id,
        image: uploadedImageUrls,
      }

      console.log("req", req)
      await profileImg(req)
        .then((res) => {
          if (res.status) {
            Swal.fire({
              icon: 'success',
              title: 'Product added successfully',
              showConfirmButton: false,
              timer: 1500
            })
            setLoading(false);
           
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message,
            })
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("error in adding product", err);
          setLoading(false);
        })
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 mt-14 flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
          {/* User Header */}

          <div className="flex items-center gap-6 border-b pb-6">
            <div className="relative w-20 h-20">
              <img
                src={profileData?.userData?.profile_image || "https://i.pravatar.cc/150?img=5"}
                alt="user"
                className="w-20 h-20 rounded-full border-4 border-blue-500 object-cover"
              />
              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-0 bg-blue-400 p-1 rounded-full cursor-pointer"
              >
                <Camera />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-800">
                {profileData?.userData?.username || "Your Name"}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Email: </span>{profileData?.userData?.email || "your@email.com"}
              </div>
              <div className="text-gray-500">
                <span className="font-medium">Phone: </span>{profileData?.userData?.phone || "1234567890"}
              </div>
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
              {profileData?.recentOrder?.map((items, index) => {
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
