import axios from "axios";

const API_URL = "http://localhost:8800/api-v1";

export const createJob = async (jobData, token) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/upload`, jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/jobs/update/${jobId}`,
      jobData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const getJobPosts = async (queryParams) => {
  try {
    const response = await axios.get(
      `${API_URL}/jobs/all${queryParams}`
      // {params: queryParams,}
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching job posts:", error);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/jobs/find/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

export const deleteJobPost = async (jobId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/jobs/delete/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting job post:", error);
    throw error;
  }
};
