'use client';
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import uploadToCloudinary from "@/service/seller/UploadImg.service";
import { getAllCategory } from "@/service/admin/categoryService";
import { addProduct } from "@/service/admin/productsService";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
  });


  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const req = {}
    const res = await getAllCategory(req)
      .then((res) => {
        if (res.status) {
          setCategories(res.data);
        }
        else {
          setCategories([]);
        }
      })
      .catch((err) => {
        console.log("error in getting category", err);
      });
  }

  const resetFrom = () => {
    setFiles([]);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      offerPrice: '',
    });
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadedImageUrls = await Promise.all(
        files.map((file) => file ? uploadToCloudinary(file) : null)
      );
      const req = {
        name: formData.name,
        description: formData.description,
        categoryId: formData.category,
        price: formData.price,
        offer_price: formData.offerPrice,
        image_url: uploadedImageUrls.filter(Boolean)
      }
      await addProduct(req)
        .then((res) => {
          if (res.status) {
            Swal.fire({
              icon: 'success',
              title: 'Product added successfully',
              showConfirmButton: false,
              timer: 1500
            })
            setLoading(false);
            resetFrom();
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res.message,
            })
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log("error in adding product", err);
          setLoading(false);
        })
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <Image
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="Upload"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            name="name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            name="description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        {/* Category, Price, Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">Category</label>
            <select
              name="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={handleChange}
              value={formData.category}
            >
              {
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))
              }
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input
              name="price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={handleChange}
              value={formData.price}
             
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input
              name="offerPrice"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={handleChange}
              value={formData.offerPrice}
             
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
