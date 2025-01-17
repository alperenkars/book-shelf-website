import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import LibraryList from './components/LibraryList';
import BookList from './components/BookList';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/users" component={UserList} />
                <Route path="/libraries" component={LibraryList} />
                <Route path="/books" component={BookList} />
            </Switch>
        </Router>
    );
};

export default App;