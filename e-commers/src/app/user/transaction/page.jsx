'use client'
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/compoents/seller/Footer";
import Loading from "@/compoents/Loading";
import Navbar from "@/compoents/Navbar";
import { getAllPayment } from '@/service/user/productService'

const ProductList = () => {
    const { router } = useAppContext()
    const [loading, setLoading] = useState(true)
    const [getAllTransaction, setAllTransaction] = useState([])
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const fetchTransaction = async () => {
        if (!user?._id) return
        const req = { userId: user?._id }
        await getAllPayment(req)
            .then((res) => {
                if (res.status) {
                    setAllTransaction(res.data)
                    setLoading(false)
                }
                else {
                    setAllTransaction([]);
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log("Error in fetching transaction", error)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchTransaction();
    }, [user])


    const getNames = (items) => {
        return items.map(item => item?.productDetails?.name).join(", ");
    };

    return (
        <>
            <Navbar />
            <div className="flex-1 min-h-screen flex flex-col justify-between mt-28">
                {loading ? <Loading /> : <div className="flex justify-center w-full md:p-10 p-4">
                    <div>
                        <h2 className="pb-4 text-lg font-medium">All Transactions</h2>
                        <div className="flex flex-col items-center  w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                            <table className="table-fixed w-full border-collapse">
                                <thead className="text-gray-900 text-sm text-left bg-gray-100">
                                    <tr>
                                        <th className="w-2/5 px-4 py-3 font-medium truncate">Product Names</th>
                                        <th className="px-4 py-3 font-medium truncate max-sm:hidden">Order ID</th>
                                        <th className="px-4 py-3 font-medium truncate">Payment ID</th>
                                        <th className="px-4 py-3 font-medium truncate max-sm:hidden">Amount</th>
                                        <th className="px-4 py-3 font-medium truncate max-sm:hidden">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-600">
                                    {getAllTransaction?.length > 0 ? (
                                        getAllTransaction.map((items, index) => (
                                            <tr key={index} className="border-t border-gray-300 hover:bg-gray-50">
                                                <td className="px-4 py-3 truncate">{getNames(items?.items)}</td>
                                                <td className="px-4 py-3 truncate max-sm:hidden">{items?.order_id}</td>
                                                <td className="px-4 py-3 truncate">{items?.payment_id}</td>
                                                <td className="px-4 py-3 truncate max-sm:hidden">₹ {(items?.amount)/100}</td>
                                                <td className="px-4 py-3 truncate max-sm:hidden capitalize">
                                                    {items?.status || "pending"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center px-4 py-6 text-gray-400">
                                                No transactions found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>}
                <Footer />
            </div>
        </>
    );
};

export default ProductList;