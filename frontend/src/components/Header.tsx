import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sunny Platform
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/trading">Trading</Button>
        <Button color="inherit" component={Link} to="/lending">Lending</Button>
        <Button color="inherit" component={Link} to="/wallet">Wallet</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
