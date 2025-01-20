import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, Card, Table, Form, Button, Grid, Alert } from 'tabler-react';
import './Books.css'; // Import the CSS file for additional styling

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    bookName: '',
    authorName: '',
    genre: '',
    minPageCount: '',
    maxPageCount: '',
    minOwners: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (query = '') => {
    try {
      const response = await fetch(`http://localhost:5001/api/books${query}`);
      const data = await response.json();
      console.log('Fetched books data:', data);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const validateFilters = () => {
    const newErrors = {};
    if (filters.minPageCount && isNaN(filters.minPageCount)) {
      newErrors.minPageCount = 'Min Page Count must be a number';
    }
    if (filters.maxPageCount && isNaN(filters.maxPageCount)) {
      newErrors.maxPageCount = 'Max Page Count must be a number';
    }
    if (filters.minOwners && isNaN(filters.minOwners)) {
      newErrors.minOwners = 'Owned by at least must be a number';
    }
    return newErrors;
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFilters();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const params = [];
    if (filters.bookName) params.push(`title=${encodeURIComponent(filters.bookName)}`);
    if (filters.authorName) params.push(`author=${encodeURIComponent(filters.authorName)}`);
    if (filters.genre) params.push(`genre=${encodeURIComponent(filters.genre)}`);
    if (filters.minPageCount) params.push(`minPageCount=${encodeURIComponent(filters.minPageCount)}`);
    if (filters.maxPageCount) params.push(`maxPageCount=${encodeURIComponent(filters.maxPageCount)}`);
    if (filters.minOwners) params.push(`minOwners=${encodeURIComponent(filters.minOwners)}`);
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    fetchBooks(query);
    setIsFilterOpen(false); // Close the filter menu after submitting
  };

  const genres = [
    { value: '', label: 'All' },
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'Biography', label: 'Biography' },
    { value: 'History', label: 'History' },
    { value: 'Thriller', label: 'Thriller' }
  ];

  return (
    <Page.Content>
      <Card>
        <Card.Header className="card-header">
          <Card.Title>Books</Card.Title>
          <Button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            {isFilterOpen ? 'Close Filter' : 'Open Filter'}
          </Button>
        </Card.Header>
        {isFilterOpen && (
          <Card.Body className="filter-menu">
            <Form onSubmit={handleFilterSubmit}>
              <Grid.Row>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Book Name">
                    <Form.Input
                      name="bookName"
                      value={filters.bookName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Author Name">
                    <Form.Input
                      name="authorName"
                      value={filters.authorName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Genre">
                    <Form.Select
                      name="genre"
                      value={filters.genre}
                      onChange={handleInputChange}
                    >
                      {genres.map((genre) => (
                        <option key={genre.value} value={genre.value}>
                          {genre.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Min Page Count">
                    <Form.Input
                      name="minPageCount"
                      value={filters.minPageCount}
                      onChange={handleInputChange}
                    />
                    {errors.minPageCount && <Alert type="danger">{errors.minPageCount}</Alert>}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Max Page Count">
                    <Form.Input
                      name="maxPageCount"
                      value={filters.maxPageCount}
                      onChange={handleInputChange}
                    />
                    {errors.maxPageCount && <Alert type="danger">{errors.maxPageCount}</Alert>}
                  </Form.Group>
                </Grid.Col>
                <Grid.Col sm={6} lg={4}>
                  <Form.Group label="Owned by at least">
                    <Form.Input
                      name="minOwners"
                      value={filters.minOwners}
                      onChange={handleInputChange}
                    />
                    {errors.minOwners && <Alert type="danger">{errors.minOwners}</Alert>}
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>
              <Button type="submit" color="primary">Filter</Button>
            </Form>
          </Card.Body>
        )}
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Title</Table.ColHeader>
                <Table.ColHeader>Author</Table.ColHeader>
                <Table.ColHeader>Genre</Table.ColHeader>
                <Table.ColHeader>Year</Table.ColHeader>
                <Table.ColHeader>ISBN</Table.ColHeader>
                <Table.ColHeader>Publisher</Table.ColHeader>
                <Table.ColHeader>Pages</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(books) && books.map((book, index) => (
                <Table.Row key={index}>
                  <Table.Col>
                    <Link to={`/books/${book.book_id}`}>{book.title}</Link>
                  </Table.Col>
                  <Table.Col>{book.author}</Table.Col>
                  <Table.Col>{book.genre}</Table.Col>
                  <Table.Col>{book.year}</Table.Col>
                  <Table.Col>{book.isbn}</Table.Col>
                  <Table.Col>{book.publisher}</Table.Col>
                  <Table.Col>{book.pages}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
    </Page.Content>
  );
};

export default Books;