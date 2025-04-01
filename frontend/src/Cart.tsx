import React from 'react';
import { useCart } from './CartContext';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.book.price,
    0
  );

  const handleClearCart = () => {
    const confirmClear = window.confirm(
      'You are about to clear your cart. Are you sure?'
    );
    if (confirmClear) {
      clearCart();
    }
  };

  return (
    <div className="container">
      <h2 className="my-3">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.book.bookID}>
                  <td>{item.book.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.book.price.toFixed(2)}</td>
                  <td>${(item.quantity * item.book.price).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.book.bookID)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="danger" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
