import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { getInventoryList } from '../api';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventoryList();
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Inventory List</Typography>
      <List>
        {inventory.map((item) => (
          <ListItem key={item.item_id}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default InventoryList;

#####
