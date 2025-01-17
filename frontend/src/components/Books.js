import React, { useEffect, useState } from 'react';
import { Page, Card, Table } from 'tabler-react';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the books data from the backend
    fetch('http://localhost:3001/books')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched books data:', data); // Add this line
        setBooks(data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <Page.Content>
      <Card>
        <Card.Header>
          <Card.Title>Books</Card.Title>
        </Card.Header>
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
              {books.map((book, index) => (
                <Table.Row key={index}>
                  <Table.Col>{book.title}</Table.Col>
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