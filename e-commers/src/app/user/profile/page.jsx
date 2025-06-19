"use client"
import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/compoents/Navbar";
import { profile, profileImg } from '@/service/authService'
import { Camera } from 'lucide-react';
import Swal from "sweetalert2";
import uploadToCloudinary from "@/service/seller/UploadImg.service";
import Slider from '@mui/material/Slider';
import Cropper, { Area } from 'react-easy-crop';
export default function UserProfile() {
  const [profileData, setProfileData] = useState(null)
  const [user, setUser] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploading, setUploading] = useState(false);

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

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous";

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const diameter = Math.min(croppedAreaPixels.width, croppedAreaPixels.height);
        canvas.width = diameter;
        canvas.height = diameter;

        if (!ctx) return reject("Canvas context not found");

        // Draw circular mask
        ctx.beginPath();
        ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(
          image,
          croppedAreaPixels.x + (croppedAreaPixels.width - diameter) / 2,
          croppedAreaPixels.y + (croppedAreaPixels.height - diameter) / 2,
          diameter,
          diameter,
          0,
          0,
          diameter,
          diameter
        );

        // Export with transparent background (PNG)
        canvas.toBlob((blob) => {
          if (!blob) return reject("Canvas is empty");
          resolve(blob);
        }, "image/png");
      };

      image.onerror = () => reject("Image load failed");
    });
  };

  const handleCropApply = async () => {
    if (!cropSrc || !croppedAreaPixels) return;

    try {
      setUploading(true);
      const blob = await getCroppedImg(cropSrc, croppedAreaPixels);
      const uploadedImageUrls = await uploadToCloudinary(blob);

      const req = {
        userId: user?._id,
        image: uploadedImageUrls,
      };

      const res = await profileImg(req);
      if (res.status) {
        Swal.fire({
          icon: 'success',
          title: 'Profile image updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        getProfile();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: res.message,
        });
      }

    } catch (err) {
      console.error("Upload failed", err);
      Swal.fire({
        icon: 'error',
        title: 'Upload failed',
        text: err.message || 'Something went wrong!',
      });
    } finally {
      setUploading(false);
      setShowCropper(false);
      setCropSrc(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 mt-14 flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">

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

          {showCropper && cropSrc && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
              <div className="w-full max-w-sm bg-[#020e1f] rounded-lg overflow-hidden border border-white shadow-2xl">
                <div className="relative h-96">
                  <Cropper
                    image={cropSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <div className="space-y-4 px-6 py-4">
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(_, newValue) => setZoom(newValue)}
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => setShowCropper(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button onClick={handleCropApply} variant="teal" className="text-white" disabled={uploading}>
                      {uploading ? "Uploading..." : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
