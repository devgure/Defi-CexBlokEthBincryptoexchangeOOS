import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Lending: React.FC = () => {
  const [action, setAction] = useState('lend');
  const [asset, setAsset] = useState('SNY');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    // Integrate with smart contract
    console.log({ action, asset, amount });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lending & Borrowing
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Action</InputLabel>
        <Select value={action} onChange={(e) => setAction(e.target.value)}>
          <MenuItem value="lend">Lend</MenuItem>
          <MenuItem value="borrow">Borrow</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Asset</InputLabel>
        <Select value={asset} onChange={(e) => setAsset(e.target.value)}>
          <MenuItem value="SNY">SNY</MenuItem>
          <MenuItem value="USDT">USDT</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};

export default Lending;
