import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { getSalesTrends } from '../api';

const SalesTrends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await getSalesTrends();
        setTrends(data);
      } catch (error) {
        console.error('Error fetching trends:', error);
      }
    };

    fetchTrends();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Sales Trends</Typography>
      <List>
        {trends.map((trend) => (
          <ListItem key={trend.trend_id}>
            <ListItemText primary={`Item ID: ${trend.item_id}`} secondary={`Sales Data: ${JSON.stringify(trend.sales_data)}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SalesTrends;
