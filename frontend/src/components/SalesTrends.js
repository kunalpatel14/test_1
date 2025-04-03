import React, { useEffect, useState } from 'react';
import { getSalesTrends, createSalesRecord, deleteSalesRecord } from '../api';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SalesTrends() {
    const [sales, setSales] = useState([]);
    const [newSale, setNewSale] = useState({ product_id: 0, quantity_sold: 0, sale_date: '' });

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const data = await getSalesTrends();
            setSales(data);
        } catch (error) {
            console.error('Error fetching sales:', error);
        }
    };

    const handleCreateSale = async () => {
        try {
            await createSalesRecord(newSale);
            fetchSales();
            setNewSale({ product_id: 0, quantity_sold: 0, sale_date: '' });
        } catch (error) {
            console.error('Error creating sale:', error);
        }
    };

    const handleDeleteSale = async (salesId) => {
        try {
            await deleteSalesRecord(salesId);
            fetchSales();
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };

    return (
        <div>
            <h2>Sales Trends</h2>
            <div>
                <TextField label="Product ID" type="number" value={newSale.product_id} onChange={(e) => setNewSale({ ...newSale, product_id: parseInt(e.target.value) })} />
                <TextField label="Quantity Sold" type="number" value={newSale.quantity_sold} onChange={(e) => setNewSale({ ...newSale, quantity_sold: parseInt(e.target.value) })} />
                <TextField label="Sale Date" type="date" value={newSale.sale_date} onChange={(e) => setNewSale({ ...newSale, sale_date: e.target.value })} />
                <Button variant="contained" color="primary" onClick={handleCreateSale}>Add Sale</Button>
            </div>
            <List>
                {sales.map((sale) => (
                    <ListItem key={sale.sales_id}>
                        <ListItemText primary={`Product ID: ${sale.product_id}`} secondary={`Quantity Sold: ${sale.quantity_sold}, Date: ${sale.sale_date}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSale(sale.sales_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default SalesTrends;
