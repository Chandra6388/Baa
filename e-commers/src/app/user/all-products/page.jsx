'use client'
import ProductCard from "@/compoents/ProductCard";
import Navbar from "@/compoents/Navbar";
import Footer from "@/compoents/Footer";
import { useAppContext } from "@/context/AppContext";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";

const AllProducts = () => {
    const [activeTab, setActiveTab] = useState("html");

    const { products } = useAppContext();
    const data = [
        {
            label: "HTML",
            value: "html",
            desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
        },
        {
            label: "React",
            value: "react",
            desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },

        {
            label: "Vue",
            value: "vue",
            desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },

        {
            label: "Angular",
            value: "angular",
            desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
        },

        {
            label: "Svelte",
            value: "svelte",
            desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
        },
    ];
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 pt-12">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                <Tabs value={activeTab} onChange={(val) => setActiveTab(val)} className="w-full mt-10">
                    <TabsHeader
                        className="bg-gray-100 p-1 rounded-full"
                        indicatorProps={{
                            className: "bg-white shadow rounded-full",
                        }}
                    >
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-white text-gray-900 font-semibold rounded-full px-4 py-1 transition-all duration-300"
                                        : "text-gray-600 px-4 py-1 transition-all duration-300"
                                }
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>

                    <TabsBody
                        animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        }}
                    >
                        {data.map(({ value, desc }) => (
                            <TabPanel key={value} value={value}>
                                {desc}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>



                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
