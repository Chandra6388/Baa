import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { getTopRatedProducts } from "@/service/user/productService";

const HomeProducts = () => {

  const [getTopRatedProductsData, setGetTopRatedProductsData] = useState([]);
  const [user, setUser] = useState(null);



  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    topProduct()
  }, []);



  const topProduct = async () => {
    if (!user?._id) return
    const req = { limit: 20, userId: user?._id }
    await getTopRatedProducts(req)
      .then((res) => {
        if (res.status) {
          setGetTopRatedProductsData(res.data)
        }
        else {
          setGetTopRatedProductsData([])
        }
      })
      .catch((error) => {
        console.log("Error in fatching top product", error)
      })
  }

  const { router } = useAppContext()

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {getTopRatedProductsData?.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/user/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;




