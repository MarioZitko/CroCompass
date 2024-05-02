import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

interface UserData {
    username: string;
    password: string;
    role: string;
}

export const registerUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('role', userData.role); // Save the role locally
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
            const { token, role } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('role', role); // Save the role locally
            return { token, role };
        }
        return null;
    } catch (error) {
        throw error;
    }
};

