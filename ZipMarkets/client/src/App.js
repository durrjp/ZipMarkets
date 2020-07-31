import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import './App.css';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/header/Header';
import ZipProvider from './providers/ZipProvider';
import PinnedMarketProvider from './providers/PinnedMarketProvider';


function App() {
  return (
    <Router>
      <UserProvider>
        <ZipProvider>
          <PinnedMarketProvider>
            <Header />
            <ApplicationViews />
          </PinnedMarketProvider>
        </ZipProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
