import React, { useEffect, useState } from 'react';
import { Book } from './types/Book';
import { Table, Pagination } from 'react-bootstrap';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/api/books?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy || ''}`
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
  }, [pageNumber, pageSize, sortBy]);

  return (
    <div className="container">
      <h2 className="my-3">Book List</h2>
      <div className="d-flex justify-content-between mb-2">
        <div>
          <label>Sort by:</label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="title">Title</option>
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
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        />
        <Pagination.Item active>{pageNumber}</Pagination.Item>
        <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} />
      </Pagination>
    </div>
  );
};

export default BookList;
