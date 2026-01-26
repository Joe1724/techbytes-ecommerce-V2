import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Create a configured axios instance (optional, but good practice)
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add the token to every request automatically
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const storefront = {
    // 1. Get All Products
    getProducts: async () => {
        const response = await api.get('/products');
        return response.data.data; // Handles the Laravel pagination wrapper
    },

    // 2. Get Single Product
    getProduct: async (slug) => {
        const response = await api.get(`/products/${slug}`);
        return response.data;
    },

    // 3. Add to Cart
    addToCart: async (productId, quantity = 1) => {
        const response = await api.post('/cart', { product_id: productId, quantity });
        return response.data;
    },

    // 4. Get Cart
    getCart: async () => {
        const response = await api.get('/cart');
        return response.data;
    },

    // 5. Remove from Cart
    removeFromCart: async (itemId) => {
        const response = await api.delete(`/cart/${itemId}`);
        return response.data;
    },

    // 6. Checkout
    checkout: async () => {
        const response = await api.post('/checkout');
        return response.data;
    },
    
    getFeaturedProducts: async () => {
        const response = await api.get('/products/trending');
        
        // CORRECT:
        return response.data; 

        // INCORRECT (Delete this if you have it):
        // return response.data.data; 
    },

    // 8. Get On Sale Products (For Timer)
    getOnSaleProducts: async () => {
        const response = await api.get('/products/on-sale');
        return response.data;
    }

};

export default storefront;