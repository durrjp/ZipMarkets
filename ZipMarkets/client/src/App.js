import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import './App.css';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/header/Header';
import ZipProvider from './providers/ZipProvider';

function App() {
  return (
    <Router>
      <UserProvider>
        <ZipProvider>
          <Header />
          <ApplicationViews />
        </ZipProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
