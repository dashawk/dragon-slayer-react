import React from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
