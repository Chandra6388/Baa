import axios from "axios";
import { base_url } from "../../../Utils/config";

export const addProduct = async (data) => {
  try {
    const response = await axios.post(`${base_url}add-product`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getAllProducts = async (data) => {
  try {
    const response = await axios.post(`${base_url}getAllProducts`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (data) => {
  try {
    const response = await axios.post(`${base_url}getProductById`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
export const updateProduct = async (data) => {
  try {
    const response = await axios.post(`${base_url}updateProduct`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
export const deleteProduct = async (data) => {
  try {
    const response = await axios.post(`${base_url}deleteProduct`, data);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
 
