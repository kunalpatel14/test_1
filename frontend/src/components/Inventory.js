import React, { useEffect, useState } from 'react';
import { getInventory, createInventoryItem, updateInventory, deleteInventoryItem } from '../api';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', sku: '', initial_stock_level: 0, current_stock_level: 0 });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const data = await getInventory();
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleCreateProduct = async () => {
        try {
            await createInventoryItem(newProduct);
            fetchInventory();
            setNewProduct({ name: '', sku: '', initial_stock_level: 0, current_stock_level: 0 });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteInventoryItem(productId);
            fetchInventory();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Inventory</h2>
            <div>
                <TextField label="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <TextField label="SKU" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} />
                <TextField label="Initial Stock Level" type="number" value={newProduct.initial_stock_level} onChange={(e) => setNewProduct({ ...newProduct, initial_stock_level: parseInt(e.target.value) })} />
                <TextField label="Current Stock Level" type="number" value={newProduct.current_stock_level} onChange={(e) => setNewProduct({ ...newProduct, current_stock_level: parseInt(e.target.value) })} />
                <Button variant="contained" color="primary" onClick={handleCreateProduct}>Add Product</Button>
            </div>
            <List>
                {inventory.map((product) => (
                    <ListItem key={product.product_id}>
                        <ListItemText primary={product.name} secondary={`SKU: ${product.sku}, Stock: ${product.current_stock_level}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.product_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Inventory;
