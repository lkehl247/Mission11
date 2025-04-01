import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './BookList';
import Cart from './Cart';
import AdminBooks from './AdminBooks';
import { CartProvider } from './CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="App container mt-3">
          {/* Navigation */}
          <nav className="mb-3">
            <Link to="/" className="btn btn-primary me-2">
              Home
            </Link>
            <Link to="/adminbooks" className="btn btn-danger">
              Admin
            </Link>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/adminbooks" element={<AdminBooks />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
