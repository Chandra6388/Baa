'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/compoents/OrderSummary";
import Image from "next/image";
import Navbar from "@/compoents/Navbar";
import { useAppContext } from "@/context/AppContext";
import { getCartProduct, quantityIncOrDce } from "@/service/user/productService";

const Cart = () => {
  const [getProducts, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  const { router, getCartCount } = useAppContext();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartProducts();
    }
  }, [user]);

  const fetchCartProducts = async () => {
    try {
      const req = { userId: user?._id };
      const res = await getCartProduct(req);
      if (res.status) {
        setProducts(res.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("Error fetching cart products", error);
    }
  };

  const updateCartQuantity = async (id, quantity) => {
    const req = { id, Quantity: quantity };

    // ✅ Update UI immediately
    const updatedProducts = getProducts
      .map((item) => {
        if (item._id === id) {
          if (quantity <= 0) return null; // remove item
          return { ...item, Quantity: quantity };
        }
        return item;
      })
      .filter(Boolean);

    setProducts(updatedProducts);

    // 🔄 Sync with backend
    try {
      await quantityIncOrDce(req);
    } catch (error) {
      console.log("Error updating quantity", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 mt-28 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {getProducts.map((item) => (
                  <tr key={item?._id}>
                    <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                      <div>
                        <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                          <Image
                            src={item?.productDetails.image_url[0]}
                            alt={item?.productDetails?.name}
                            className="w-16 h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                          />
                        </div>
                        <button
                          className="md:hidden text-xs text-orange-600 mt-1"
                          onClick={() => updateCartQuantity(item._id, 0)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-sm hidden md:block">
                        <p className="text-gray-800">{item?.productDetails?.name}</p>
                        <button
                          className="text-xs text-orange-600 mt-1"
                          onClick={() => updateCartQuantity(item._id, 0)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                    <td className="py-4 md:px-4 px-1 text-gray-600">
                      ${item?.productDetails?.offer_price}
                    </td>
                    <td className="py-4 md:px-4 px-1">
                      <div className="flex items-center md:gap-2 gap-1">
                        <button onClick={() => updateCartQuantity(item._id, item.Quantity - 1)}>
                          <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.Quantity}
                          readOnly
                          className="w-8 border text-center appearance-none"
                        />
                        <button onClick={() => updateCartQuantity(item._id, item.Quantity + 1)}>
                          <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 md:px-4 px-1 text-gray-600">
                      ${(item?.productDetails?.offer_price * item?.Quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-orange-600"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow right"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary products={getProducts} />
      </div>
    </>
  );
};




export default Cart;
