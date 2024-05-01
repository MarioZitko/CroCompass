import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

interface UserData {
    username: string;
    password: string;
}

export const registerUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_URL}`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

