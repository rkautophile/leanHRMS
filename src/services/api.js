import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Replace with your backend URL

export const addEmployee = async (data) => {
    return await axios.post(`${API_URL}/employees/add`, data);
};

export const punchAttendance = async (data) => {
    return await axios.post(`${API_URL}/attendance/punch`, data);
};

export const getAttendance = async (employeeId) => {
    return await axios.get(`${API_URL}/attendance/${employeeId}`);
};

export const applyLeave = async (data) => {
    return await axios.post(`${API_URL}/leaves/apply`, data);
};
