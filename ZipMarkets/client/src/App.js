import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import './App.css';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <ApplicationViews />
      </UserProvider>
    </Router>
  );
}

export default App;
