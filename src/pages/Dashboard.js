import React from 'react';
import { Box, Typography, Button, Paper, Avatar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';
import { Logout, VerifiedUser } from '@mui/icons-material';

const Dashboard = () => {
  const history = useHistory();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    history.push('/login');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2
    }}>
      <Paper elevation={10} sx={{
        padding: 5, textAlign: 'center', borderRadius: 4, maxWidth: 450, width: '100%',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <Avatar sx={{
          width: 80, height: 80, margin: '0 auto 16px',
          background: 'linear-gradient(to right, #e94560, #0f3460)',
          fontSize: '2rem'
        }}>
          {user?.email?.charAt(0).toUpperCase()}
        </Avatar>

        <VerifiedUser sx={{ color: '#4caf50', fontSize: 30 }} />

        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', mt: 1 }}>
          Welcome! 
        </Typography>
        <Typography sx={{ color: '#e94560', fontSize: '1.1rem', mt: 1 }}>
          {user?.email}
        </Typography>
        <Typography sx={{ color: '#aaa', mt: 2, mb: 4 }}>
          You are successfully logged in. This is your dashboard.
        </Typography>

        <Button
          variant="outlined"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            color: '#e94560', borderColor: '#e94560', borderRadius: 3, px: 4, py: 1,
            '&:hover': { background: '#e94560', color: '#fff' }
          }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default Dashboard;