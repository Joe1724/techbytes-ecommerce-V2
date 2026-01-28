import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// 1. Create the Axios Instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// 2. Add the token interceptor (Keeps your auth working automatically)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 3. EXPORT THE INSTANCE (This fixes the "reading 'headers' of undefined" error)
export const axiosInstance = api;

// 4. Your existing Storefront Helper Functions
export const storefront = {
    // 1. Get All Products
    getProducts: async () => {
        const response = await api.get('/products');
        // This 'data.data' matches the ['data' => ...] we just added in the controller
        return response.data.data; 
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
    
    // 7. Get Featured (Trending)
    getFeaturedProducts: async () => {
        const response = await api.get('/products/trending');
        return response.data; 
    },

    // 8. Get On Sale Products (For Timer)
    getOnSaleProducts: async () => {
        const response = await api.get('/products/on-sale');
        return response.data;
    },
    
    // 9. Generic GET helper (useful if you need it elsewhere)
    get: (url) => api.get(url),
};

export default storefront;