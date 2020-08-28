import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import './App.css';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/header/Header';
import ZipProvider from './providers/ZipProvider';
import PinnedMarketProvider from './providers/PinnedMarketProvider';
import MessageProvider from './providers/MessageProvider';
import HPiProvider from './providers/HPIProvider';
import ZVHIProvider from './providers/ZVHIProvider';
import MortgageRateProvider from './providers/MortgageRateProvider';


function App() {
  return (
      <Router>
        <UserProvider>
          <ZipProvider>
            <PinnedMarketProvider>
              <MessageProvider>
                <HPiProvider>
                  <ZVHIProvider>
                    <MortgageRateProvider>
                      <Header />
                      <ApplicationViews  />
                    </MortgageRateProvider>
                  </ZVHIProvider>
                </HPiProvider>
              </MessageProvider>
            </PinnedMarketProvider>
          </ZipProvider>
        </UserProvider>
      </Router>
  );
}

export default App;
