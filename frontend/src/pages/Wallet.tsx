import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const Wallet: React.FC = () => {
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState([
    { asset: 'SNY', amount: 100 },
    { asset: 'BTC', amount: 0.5 },
  ]);

  const connectWallet = () => {
    // Integrate with Web3Modal
    console.log('Connecting wallet...');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Wallet
      </Typography>
      <Button variant="contained" onClick={connectWallet} sx={{ mb: 2 }}>
        Connect Wallet
      </Button>
      <Typography variant="h6">Balances</Typography>
      <List>
        {balances.map((balance, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${balance.asset}: ${balance.amount}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Wallet;
