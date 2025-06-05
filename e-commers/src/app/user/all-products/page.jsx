'use client';
import { useEffect, useState } from "react";
import ProductCard from "@/compoents/ProductCard";
import Navbar from "@/compoents/Navbar";
import Footer from "@/compoents/Footer";
import { getAllCategory, getAllProduct } from '@/service/user/productService'

const AllProducts = () => {
    const [activeTab, setActiveTab] = useState("");
    const [animate, setAnimate] = useState(false);
    const [getCategory, setCategory] = useState([])
    const [productArr, setProductArr] = useState([])

    useEffect(() => {
        category()
    }, [])

    useEffect(() => {
        getProducts()
    }, [activeTab])

    const category = async () => {
        await getAllCategory()
            .then((res) => {
                if (res.status) {
                    setCategory(res?.data)
                    setActiveTab(res?.data?.[0]?._id)
                }
                else {
                    setCategory([])
                }
            })
            .catch((error) => {
                console.log("error in fetching the category", error)
            })
    }

    const getProducts = async () => {
        if (!activeTab || activeTab == null || activeTab == undefined || activeTab == "") return
        const req = { categoryId: activeTab }
        await getAllProduct(req)
            .then((res) => {
                if (res?.status) {
                    setProductArr(res?.data)
                }
                else {
                    setProductArr([])
                }
            })
            .catch((error) => {
                console.log("Error in finding the product", error)
            })
    }

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 500);
        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-12">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                <div className="flex flex-wrap justify-start gap-4 bg-gray-100 p-4 mt-10 rounded-full w-full overflow-x-auto">
                    {getCategory.map((item) => (
                        <button
                            key={item?._id}
                            onClick={() => setActiveTab(item?._id)}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-200
                                ${activeTab === item?._id
                                    ? "bg-orange-500 text-white shadow"
                                    : "bg-white text-gray-800 hover:bg-orange-100"
                                }`}
                        >
                            {item?.name}
                        </button>
                    ))}
                </div>
                <div
                    key={activeTab}
                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12 pb-14 w-full 
                    ${animate ? "animate-slide-in-left" : ""}`}
                >
                    {productArr.length > 0 ? (
                        productArr.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No products found</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
