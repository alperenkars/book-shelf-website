import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Books from './components/Books';
import BookDetails from './components/BookDetails';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Books} />
        <Route path="/books/:bookId" component={BookDetails} />
      </Switch>
    </Router>
  );
};

export default App;