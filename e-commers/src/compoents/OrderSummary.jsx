import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { getAddress, createOrder, savePayment } from '@/service/user/productService'
import { KEY_ID } from '../../secretFile'
import Swal from "sweetalert2";

const OrderSummary = ({ products }) => {
  const { router } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [user, setUser] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    fetchUserAddresses();
  }, [user])

  const fetchUserAddresses = async () => {
    if (!user) return
    const req = { userId: user._id };
    await getAddress(req)
      .then((res) => {
        if (res.status) {
          setUserAddresses(res.data);
        }
        else {
          setUserAddresses([])
        }
      })
      .catch((error) => {
        console.log("Error in fetching address", error)
      })

  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

console.log("products", products)

  const getTotalItem = () => {
    return products.reduce((total, item) => total + item.Quantity, 0);
  };
 

  const getTotalPrice = () => {
    return products.reduce((total, item) => total + (item.productDetails?.offer_price) * item.Quantity, 0);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const order = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const req = { userId: user._id, price: totalAmount };
      const data = await createOrder(req);

      if (!data.status) {
        alert('Order creation failed');
        return;
      }

      const options = {
        key: KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Bazaarbeat',
        description: 'Thank you for your purchase',
        order_id: data.order.id,
        handler: async function (response) {
          const paymentData = {
            userId: user._id,
            order_id: data.order.id,
            payment_id: response.razorpay_payment_id,
            amount: data.order.amount,
            currency: data.order.currency,
            items : products, 
          };

          await savePayment(paymentData)
            .then((res) => {
              if (res.status) {

                Swal.fire({
                  icon: 'success',
                  title: 'Payment done successfully',
                  text: "success",
                })
              }
              else {
                Swal.fire({
                  icon: 'error',
                  title: "error",
                  text: res.message,
                })
              }
            })
        },
        prefill: {
          name: selectedAddress?.fullname || '',
          email: 'cppatel6388@gmail.com',
          contact: selectedAddress?.phone || '',
        },
        theme: {
          color: '#F37254',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Error while processing payment:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    setTotalAmount(getTotalPrice() + Math.floor(getTotalPrice() * 0.02) + (getTotalPrice() > 200 ? 0 : 10))
  }, [products])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullname}, ${selectedAddress?.address}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.phone}, ${"Pin: " + selectedAddress?.pinCode}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullname}, {address.address}, {address.city}, {address.state}, {address.phone}, {"Pin: " + address?.pinCode}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items:- {getTotalItem()}</p>
            <p className="text-gray-800">${getTotalPrice()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">{getTotalPrice() > 200 ? "Free" : "$" + 10}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">${Math.floor(getTotalPrice() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>${totalAmount}</p>
          </div>
        </div>
      </div>

      <button onClick={order} className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;