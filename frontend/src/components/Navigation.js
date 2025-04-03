import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Retail Inventory Management
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Inventory
                </Button>
                <Button color="inherit" component={Link} to="/alerts">
                    Restocking Alerts
                </Button>
                <Button color="inherit" component={Link} to="/sales">
                    Sales Trends
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
