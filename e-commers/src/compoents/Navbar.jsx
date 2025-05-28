"use client";
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { router, isSeller, cart } = useAppContext(); 
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
    }
    if (cart) {
      setCartCount(cart.length);
    }
  }, [cart]);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 bg-white text-gray-700 z-50 shadow-md">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Navigation Links */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/user/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/user/about" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/user/contact" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {userData?.role === "SELLER" && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Cart and User Info */}
      <ul className="hidden md:flex items-center gap-4 relative">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

        {userData ? (
          <button className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            {userData.username}
          </button>
        ) : (
          <Link href="/login" className="hover:text-gray-900 transition">
            Login
          </Link>
        )}

        {/* Cart Icon with Badge */}
        <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
          <ShoppingCart size={24} className="hover:text-gray-900 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
