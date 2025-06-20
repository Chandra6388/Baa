"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/compoents/Navbar";
import { getAddress } from "@/service/user/productService";
import { Edit, Trash2, CheckCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { update } from "@/service/authService";
import Swal from "sweetalert2";

export default function UserProfile() {
  const router = useRouter();
  const [address, setAddress] = useState([]);
  const [user, setUser] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editData, setEditData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [user]);

  const getProfile = async () => {
    if (!user) return;
    const req = { userId: user?._id };
    await getAddress(req)
      .then((res) => {
        if (res.status) {
          setAddress(res?.data);
        } else {
          setAddress(null);
        }
      })
      .catch((error) => {
        console.log("Error in fetching profile data", error);
      });
  };

  const openEditModal = (index) => {
    const current = address[index];
    setEditData({
      address: current?.address || "",
      city: current?.city || "",
      state: current?.state || "",
      country: current?.country || "",
      pinCode: current?.pinCode || "",
    });
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const req = {
      userId: user?._id,
      address: editData?.address,
      city: editData?.city,
      state: editData?.state,
      country: editData?.country,
      zip: editData?.pinCode
    }

    await update(req)
      .then((res) => {
        if (res?.status) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Address Updated successfully",
            timer: 2000,
            timerProgressBar: true
          })
          setIsModalOpen(false);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: res?.message,
            timer: 2000,
            timerProgressBar: true
          })
        }
      })
      .catch((error) => {
        console.log("Error in updating address", error)
      })

    
    
  };

  const handleSelectAddress = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 mt-14 flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6">
          <div className="mb-4">
            <button
              onClick={() => router.push("/user/profile")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Saved Address
            </h3>
            <div className="space-y-4">
              {address?.map((items, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectAddress(index)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${selectedIndex === index ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="font-medium">
                        {`${items?.fullname}, ${items?.address}, ${items?.city}, ${items?.state}, ${items?.country}, ${items?.phone}, ${items?.pinCode}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(index);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                      <CheckCircle
                        size={18}
                        className={`${selectedIndex === index ? "text-green-600" : "text-gray-400"
                          }`}
                        fill={selectedIndex === index ? "green" : "none"}
                      />
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Edit Address</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-3"
            >
              {["address", "city", "state", "country", "pinCode"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={editData[field]}
                  onChange={handleChange}
                  required
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  className="w-full px-3 py-2 border rounded"
                />
              ))}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
