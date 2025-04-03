import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navigation from './components/Navigation';
import Inventory from './components/Inventory';
import RestockingAlerts from './components/RestockingAlerts';
import SalesTrends from './components/SalesTrends';

function App() {
    return (
        <Router>
            <CssBaseline />
            <Navigation />
            <Container>
                <Routes>
                    <Route path="/" element={<Inventory />} />
                    <Route path="/alerts" element={<RestockingAlerts />} />
                    <Route path="/sales" element={<SalesTrends />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
