
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './components/PostList';
import Post from './components/Post';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/post/:id" component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
