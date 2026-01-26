import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the new layout

// Import Pages
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Shop from './pages/Shop';

function App() {
  return (
    // Wrap everything in the Layout
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<CreateProduct />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Layout>
  );
}

export default App;