import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './BookList';
import Cart from './Cart';
import { CartProvider } from './CartContext';

const App: React.FC = () => {
  const [view, setView] = useState<'books' | 'cart'>('books');

  return (
    <CartProvider>
      <div className="App">
        {view === 'books' ? (
          <BookList onViewCart={() => setView('cart')} />
        ) : (
          <Cart onContinueShopping={() => setView('books')} />
        )}
      </div>
    </CartProvider>
  );
};

export default App;
