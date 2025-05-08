import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:4000/api/auth";
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
            set({isLoading: false, error: error.response?.data?.error || error.response?.data?.message || 'Error signing up'});
            throw error;
        }
    },

    login: async(email, password) => {
        set({isLoading: true, error: null});
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            set({isLoading: false, user: response.data.user, isAuthenticated: true, error: null});
        } catch (error) {
            set({isLoading: false, error: error.response?.data?.error || error.response?.data?.message || 'Error logging in'});
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
    },

    checkAuth: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/auth-check`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: 'Error logging out', isLoading: false });
            throw error;
        }
    }

}))