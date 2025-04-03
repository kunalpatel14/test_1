import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { getRestockingAlerts, acknowledgeRestockingAlert } from '../api';

const RestockingAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getRestockingAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const handleAcknowledge = async (alertId) => {
    try {
      await acknowledgeRestockingAlert(alertId);
      // Refresh alerts or show success message
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Restocking Alerts</Typography>
      <List>
        {alerts.map((alert) => (
          <ListItem key={alert.alert_id}>
            <ListItemText primary={`Item ID: ${alert.item_id}`} secondary={`Status: ${alert.alert_status}`} />
            <Button variant="contained" color="primary" onClick={() => handleAcknowledge(alert.alert_id)}>
              Acknowledge
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default RestockingAlerts;
