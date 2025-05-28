import axios from "axios";
import { base_url } from "../../../Utils/config";

export const addCategory = async (data) => {
  try {
    const response = await axios.post(`${base_url}addCategory`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const getAllCategory = async (data) => {
  try {
    const response = await axios.post(`${base_url}get-all-category`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (data) => {
  try {
    const response = await axios.post(`${base_url}getCategoryById`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const updateCategory = async (data) => {
  try {
    const response = await axios.post(`${base_url}updateCategory`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (data) => {
  try {
    const response = await axios.post(`${base_url}deleteCategory`, data);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
 
