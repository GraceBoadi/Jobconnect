import axios from "axios";

const API_BASE_URL = "http://localhost:8800";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register a company
export const registerCompany = async (data) => {
  try {
    const response = await api.post("/api-v1/companies/register", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Sign in a company
export const signInCompany = async (data) => {
  try {
    const response = await api.post("/api-v1/companies/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update company profile
export const updateCompanyProfile = async (data, token) => {
  try {
    const response = await api.put("/api-v1/companies/update", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get company profile
export const getCompanyProfile = async (token) => {
  try {
    const response = await api.get("/api-v1/companies/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all companies
export const getCompanies = async (params, token) => {
  try {
    const response = await api.get(`/api-v1/companies/all${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // params: { page, limit: recordsCount },
      },
      // params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get company job listings
export const getCompanyJobListing = async (token, params) => {
  try {
    const response = await api.get("/api-v1/companies/jobs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get a single company by ID
export const getCompanyById = async (id, token) => {
  try {
    const response = await api.get(`/api-v1/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
