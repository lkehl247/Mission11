import React, { useEffect, useState } from 'react';
import { Book } from './types/Book';
import { Table, Pagination, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from './CartContext';
import CartSummary from './CartSummary';

const BookList: React.FC<{ onViewCart: () => void }> = ({ onViewCart }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { addToCart } = useCart();

  // Fetch book categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/api/books/categories`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: string[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch books based on filters
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/api/books?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy || ''}&category=${category || ''}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, [pageNumber, pageSize, sortBy, category]);

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    setToastMessage(`Added "${book.title}" to cart!`);
    setShowToast(true);
  };

  return (
    <div className="container">
      {/* Cart Summary */}
      <CartSummary onViewCart={onViewCart} />

      <h2 className="my-3">Book List</h2>

      {/* Filters for sorting and category */}
      <div className="d-flex justify-content-between mb-2">
        <div>
          <label>Sort by:</label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div>
          <label>Filter by Category:</label>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Books per page:</label>
          <select onChange={(e) => setPageSize(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>

      {/* Book List Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <Button variant="primary" onClick={() => handleAddToCart(book)}>
                  Add to Cart
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination>
        <Pagination.Prev
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        />
        <Pagination.Item active>{pageNumber}</Pagination.Item>
        <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} />
      </Pagination>

      {/* Bootstrap Toast for Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Cart Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default BookList;
