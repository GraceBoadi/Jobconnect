// api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api-v1/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response.data.message || "An error occurred during registration"
    );
  }
};

export const signInUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api-v1/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message || "An error occurred during sign-in";
  }
};

export const updateUser = async (userData, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api-v1/users/update-user`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message || "An error occurred during the update";
  }
};

export const getUser = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api-v1/users/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw (
      error.response.data.message ||
      "An error occurred while fetching the user data"
    );
  }
};
