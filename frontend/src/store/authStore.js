import { create } from 'zustand';
import axios from 'axios';
import { verifyEmail } from '../../../backend/controllers/auth.controller';

const API_URL = "http://localhost:4000";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async(email, password, name) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, name});
            set({isLoading: false, user: response.data.user, isAuthenticated: true});
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || 'Error signing up'});
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code});
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data
        } catch (error) {
            set({ error: error.response.data.message || 'Error verifying email', isLoading: false });
            throw error;
        }
    }

}))