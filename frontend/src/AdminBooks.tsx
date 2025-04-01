import React, { useEffect, useState } from 'react';
import { Book } from './types/Book';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const AdminBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch(
      'https://mission13-kehl-backend.azurewebsites.net/api/books?pageSize=1000'
    );
    const data = await response.json();
    setBooks(data);
  };

  const handleDelete = async (id: number) => {
    await fetch(
      `https://mission13-kehl-backend.azurewebsites.net/api/books/${id}`,
      {
        method: 'DELETE',
      }
    );
    fetchBooks();
  };

  const handleEdit = (book: Book) => {
    setEditingBook({ ...book });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingBook({
      bookID: 0,
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      classification: '',
      category: '',
      pageCount: 0,
      price: 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingBook) return;

    const isUpdating = editingBook.bookID !== 0;
    const method = isUpdating ? 'PUT' : 'POST';
    const url = `https://mission13-kehl-backend.azurewebsites.net/api/books${isUpdating ? `/${editingBook.bookID}` : ''}`;

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBook),
    });

    if (response.ok) {
      setShowModal(false);
      fetchBooks();
    } else {
      alert('Failed to save book. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Admin Book Management</h2>
      <Button className="mb-3" onClick={handleAdd}>
        Add New Book
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Actions</th>
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
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </Button>{' '}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(book.bookID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBook?.bookID ? 'Edit Book' : 'Add Book'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingBook && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Publisher</Form.Label>
                <Form.Control
                  type="text"
                  value={editingBook.publisher}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      publisher: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  value={editingBook.isbn}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, isbn: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Classification</Form.Label>
                <Form.Control
                  type="text"
                  value={editingBook.classification}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      classification: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={editingBook.category}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, category: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Page Count</Form.Label>
                <Form.Control
                  type="number"
                  value={editingBook.pageCount}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      pageCount: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={editingBook.price}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBooks;
