import React, { useEffect, useState } from 'react';
import { getRestockingAlerts, createRestockingAlert, deleteRestockingAlert } from '../api';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function RestockingAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [newAlert, setNewAlert] = useState({ product_id: 0, threshold: 0 });

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const data = await getRestockingAlerts();
            setAlerts(data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    const handleCreateAlert = async () => {
        try {
            await createRestockingAlert(newAlert);
            fetchAlerts();
            setNewAlert({ product_id: 0, threshold: 0 });
        } catch (error) {
            console.error('Error creating alert:', error);
        }
    };

    const handleDeleteAlert = async (alertId) => {
        try {
            await deleteRestockingAlert(alertId);
            fetchAlerts();
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    return (
        <div>
            <h2>Restocking Alerts</h2>
            <div>
                <TextField label="Product ID" type="number" value={newAlert.product_id} onChange={(e) => setNewAlert({ ...newAlert, product_id: parseInt(e.target.value) })} />
                <TextField label="Threshold" type="number" value={newAlert.threshold} onChange={(e) => setNewAlert({ ...newAlert, threshold: parseInt(e.target.value) })} />
                <Button variant="contained" color="primary" onClick={handleCreateAlert}>Add Alert</Button>
            </div>
            <List>
                {alerts.map((alert) => (
                    <ListItem key={alert.alert_id}>
                        <ListItemText primary={`Product ID: ${alert.product_id}`} secondary={`Threshold: ${alert.threshold}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAlert(alert.alert_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
####
export default RestockingAlerts;
