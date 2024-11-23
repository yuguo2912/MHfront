import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import UsersList from './UsersList';
function Root() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={App} />
        <Route path="/users" component={UsersList} />
      </Routes>
    </Router>
  );
}
export default Root;
