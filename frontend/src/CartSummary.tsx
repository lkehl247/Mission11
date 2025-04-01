import React from 'react';
import { useCart } from './CartContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartSummary: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.book.price,
    0
  );

  return (
    <div className="cart-summary my-3 p-3 border rounded bg-light">
      <h5>Shopping Cart Summary</h5>
      <p>Items in Cart: {totalQuantity}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <Button
        variant="primary"
        onClick={() => navigate('/cart')}
        disabled={cart.length === 0}
      >
        View Cart
      </Button>
    </div>
  );
};

export default CartSummary;
