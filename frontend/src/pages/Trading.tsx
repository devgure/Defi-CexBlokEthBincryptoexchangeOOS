import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Trading: React.FC = () => {
  const [symbol, setSymbol] = useState('BTC/USDT');
  const [side, setSide] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    // Integrate with backend API
    console.log({ symbol, side, quantity, price });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trading
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Symbol</InputLabel>
        <Select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
          <MenuItem value="BTC/USDT">BTC/USDT</MenuItem>
          <MenuItem value="ETH/USDT">ETH/USDT</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Side</InputLabel>
        <Select value={side} onChange={(e) => setSide(e.target.value)}>
          <MenuItem value="buy">Buy</MenuItem>
          <MenuItem value="sell">Sell</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Price" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleSubmit}>Place Order</Button>
    </Container>
  );
};

export default Trading;
