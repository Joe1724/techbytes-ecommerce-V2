import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Layouts
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminProducts from './pages/AdminProducts'; 
import AdminDashboard from './pages/AdminDashboard';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Shop from './pages/Shop';
import AdminOrders from './pages/AdminOrders'; // <--- Import is here

function App() {
  const { user } = useContext(AuthContext);

  // Helper: Only allow if user is logged in AND is 'admin'
  const ProtectedAdminRoute = ({ children }) => {
      if (!user) return <Navigate to="/login" />;
      if (user.role !== 'admin') return <Navigate to="/" />; // Kick normal users to Home
      return children;
  };

  return (
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/product/:slug" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><h2>Register Page</h2></Layout>} />

        {/* SECURE ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
                <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedAdminRoute>
        } />
        
        <Route path="/admin/products" element={
            <ProtectedAdminRoute>
                <AdminLayout><AdminProducts /></AdminLayout>
            </ProtectedAdminRoute>
        } />
        
        <Route path="/admin/create" element={
            <ProtectedAdminRoute>
                <AdminLayout><CreateProduct /></AdminLayout>
            </ProtectedAdminRoute>
        } />
        
        <Route path="/admin/edit/:id" element={
            <ProtectedAdminRoute>
                <AdminLayout><EditProduct /></AdminLayout>
            </ProtectedAdminRoute>
        } />

        {/* NEW: Admin Orders Route */}
        <Route path="/admin/orders" element={
            <ProtectedAdminRoute>
                <AdminLayout><AdminOrders /></AdminLayout>
            </ProtectedAdminRoute>
        } />

        {/* Redirect old /admin to dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

      </Routes>
  );
}

export default App;