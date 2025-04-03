import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import InventoryList from './components/InventoryList';
import InventoryItem from './components/InventoryItem';
import RestockingAlerts from './components/RestockingAlerts';
import SalesTrends from './components/SalesTrends';
import Login from './components/Login';

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={InventoryList} />
        <Route path="/inventory" exact component={InventoryList} />
        <Route path="/inventory/:itemId" component={InventoryItem} />
        <Route path="/alerts" component={RestockingAlerts} />
        <Route path="/sales-trends" component={SalesTrends} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Routes;
