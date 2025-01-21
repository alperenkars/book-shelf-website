import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Card, Table } from 'tabler-react';

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/books/${bookId}`);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Page.Content>
      <Card>
        <Card.Header>
          <Card.Title>{book.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Borrowers</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
                <Table.ColHeader>Status</Table.ColHeader>
                <Table.ColHeader>Borrow Date</Table.ColHeader>
                <Table.ColHeader>Return Date</Table.ColHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.isArray(book.borrowers) && book.borrowers.map((borrower, index) => (
                <Table.Row key={index}>
                  <Table.Col>{borrower.user_name}</Table.Col>
                  <Table.Col>{borrower.email}</Table.Col>
                  <Table.Col>{borrower.status}</Table.Col>
                  <Table.Col>{borrower.borrow_date}</Table.Col>
                  <Table.Col>{borrower.return_date}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Body>
      </Card>
    </Page.Content>
  );
};

export default BookDetails;