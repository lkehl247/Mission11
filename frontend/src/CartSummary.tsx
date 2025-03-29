import React from 'react';
import { useCart } from './CartContext';
import { Button } from 'react-bootstrap';

const CartSummary: React.FC<{ onViewCart: () => void }> = ({ onViewCart }) => {
  const { cart } = useCart();

  // Calculate total quantity and total price
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
        onClick={onViewCart}
        disabled={cart.length === 0}
      >
        View Cart
      </Button>
    </div>
  );
};

export default CartSummary;
