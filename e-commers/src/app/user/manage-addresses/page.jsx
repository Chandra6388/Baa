"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/compoents/Navbar";
import { getAddress } from '@/service/user/productService'
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter()
  const [address, setAddress] = useState([])
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


  
  const getProfile = async () => {
    if (!user) return
    const req = { userId: user?._id }
    await getAddress(req)
      .then((res) => {
        if (res.status) {
          setAddress(res?.data)
        }
        else {
          setAddress(null)
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
          <div className="mb-4">
            <button
            
              onClick={() => router.push('/user/profile')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Saved Address</h3>
            <div className="space-y-4">
              {address?.map((items, index) => {
                return (
                  <div key={index} className="p-4 border rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-medium">{`${items?.fullname}, ${items?.address}, ${items?.city}, ${items.state}, ${items?.phone}, ${items?.pinCode}`}</p>
                    </div>
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
