import axios from "axios";
import { base_url } from "../../../Utils/config";

export const getTopRatedProducts = async (data) => {
  try {
    const response = await axios.post(`${base_url}get-top-rated-products`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated products:", error);
    throw error;
  }
};

export const getProductById = async (data) => {
  try {
    const response = await axios.post(`${base_url}get-product-byId`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const addToCart = async (data) => {
  try {
    const response = await axios.post(`${base_url}addToCart`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getAllCategory = async (data) => {
  try {
    const response = await axios.post(`${base_url}get-all-category`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};


export const getAllProduct = async (data) => {
  try {
    const response = await axios.post(`${base_url}get-all-products`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};


