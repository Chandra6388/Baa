import axios from "axios";
import { base_url } from "../../Utils/config";

export const login = async (user) => {
  try {
    const response = await axios.post(`${base_url}login`, user);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(`${base_url}register`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const profile = async (user) => {
  try {
    const response = await axios.post(`${base_url}profile`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const profileImg = async (user) => {
  try {
    const response = await axios.post(`${base_url}profileImg`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const update = async (user) => {
  try {
    const response = await axios.post(`${base_url}update`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

