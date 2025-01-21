import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Card, Table } from 'tabler-react';

const LibraryDetails = () => {
  const { library_id } = useParams();
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    fetchLibrary();
  }, [library_id]);

  const fetchLibrary = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/libraries/${library_id}`);
      const data = await response.json();
      setLibrary(data);
    } catch (error) {
      console.error('Error fetching library:', error);
    }
  };

  if (!library) {
    return <div>Loading...</div>;
  }

  return (
    <Page.Content>
      <Card>
        <Card.Header>
          <Card.Title>{library.lib_name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <p><strong>Description:</strong> {library.description}</p>
          <p><strong>Create Date:</strong> {library.create_date}</p>
          <p><strong>Built By:</strong> {library.built_by_name}</p>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Books in {library.lib_name}</Card.Title>
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
              {Array.isArray(library.books) && library.books.map((book, index) => (
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

export default LibraryDetails;