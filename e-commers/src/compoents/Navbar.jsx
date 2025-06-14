"use client";
import React, { useState, useEffect, useRef } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import {
  User,
  WalletCards,
  Package,
  Heart,
  LogOut,
  ShoppingCart
} from "lucide-react";


const Navbar = () => {
  const { router, isSeller, cart } = useAppContext();
  const [userData, setUserData] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-200 bg-white text-gray-700 z-50 shadow-sm">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/user/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/user/about" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/user/contact" className="hover:text-gray-900 transition">Contact</Link>
        {userData?.role === "SELLER" && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border border-gray-300 hover:border-gray-400 px-4 py-1.5 rounded-full transition"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Cart & Profile */}
      <ul className="hidden md:flex items-center gap-4 relative">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

        {userData ? (
          <div ref={dropdownRef} className="relative">
            {/* Profile Button */}
            <div
              onClick={() => setMenuOpen(prev => !prev)}
              className="flex items-center gap-2 cursor-pointer hover:text-gray-900 transition"
            >
              <div className="text-sm text-right hidden md:block">
                <p className="font-semibold leading-tight">{userData.username}</p>
               
              </div>
            </div>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2 transition-all">
                <ul className="text-sm text-gray-700">
                  {[
                    { icon: User, label: "My Profile", href: "/profile" },
                    { icon: WalletCards, label: "Transaction", href: "/transactions" },
                    { icon: Package, label: "Orders", href: "/orders" },
                    { icon: Heart, label: "Wishlist", href: "/wishlist" },
                  ].map(({ icon: Icon, label, href }) => (
                    <li
                      key={label}
                      className="hover:bg-gray-100 px-4 py-2 flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-gray-600" />
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}

                  {/* Logout Option */}
                  <li className="border-t mt-1 hover:bg-gray-100 px-4 py-2 flex items-center gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4 text-gray-600" />
                    <button
                      onClick={() => {
                        localStorage.removeItem("user");
                        router.push("/login");
                      }}
                      className="text-left w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

          </div>
        ) : (
          <Link href="/login" className="hover:text-gray-900 transition">
            Login
          </Link>
        )}

        {/* Cart */}
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
