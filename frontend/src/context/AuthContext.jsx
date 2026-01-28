import { createContext, useState, useEffect } from 'react';
import { axiosInstance as api } from '../api/storefront';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true); // Add loading state

    // 1. Function to fetch the real user profile from Backend
    const fetchUser = async () => {
        try {
            const response = await api.get('/user'); // This calls GET /api/user
            
            // UNWRAP THE DATA (Handle { data: user } vs { user })
            const userData = response.data.data ? response.data.data : response.data;
            
            console.log("Fetched User:", userData); // Debug log
            setUser(userData);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setUser(null);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    // 2. Run on page load if token exists
    useEffect(() => {
        if (token) {
            // Set token in axios headers for all future requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [token]);

    const login = async (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        // fetchUser will run automatically because 'token' changed in useEffect
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {/* Don't render the app until we know who the user is */}
            {!loading && children}
        </AuthContext.Provider>
    );
};