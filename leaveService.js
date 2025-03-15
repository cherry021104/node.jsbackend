import axios from "axios";

const API_URL = "http://localhost:5000/api/leaves"; // Update with your backend URL

// Apply for leave
export const applyLeave = async (leaveData) => {
    try {
        const response = await axios.post(`${API_URL}/apply`, leaveData);
        return response.data;
    } catch (error) {
        console.error("Error applying for leave:", error);
        throw error;
    }
};

// Fetch available leave days
export const getAvailableLeaves = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/available/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching leave days:", error);
        throw error;
    }
};
