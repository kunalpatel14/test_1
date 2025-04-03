import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { getInventoryItem, updateInventoryItem } from '../api';
import { useParams } from 'react-router-dom';

const InventoryItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [threshold, setThreshold] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getInventoryItem(itemId);
        setItem(data);
        setName(data.name);
        setQuantity(data.quantity);
        setThreshold(data.threshold);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleUpdate = async () => {
    try {
      const updatedItem = { item_id: itemId, name, quantity, threshold };
      await updateInventoryItem(itemId, updatedItem);
      // Redirect or show success message
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (!item) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">Inventory Item</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Threshold"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Container>
  );
};

export default InventoryItem;
