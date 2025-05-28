"use client";
import Navbar from "@/compoents/Navbar";
import Footer from "@/compoents/Footer";
import Banner from "@/compoents/Banner";
import FeaturedProduct from "@/compoents/FeaturedProduct";
import HomePageProduct from "@/compoents/HomePageProduct";
import NewsLetter from "@/compoents/NewsLetter";
import Header from "@/compoents/Header";


export default function Home() {
 
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <Header />
        <HomePageProduct />
        <Banner />
        <FeaturedProduct />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
}
