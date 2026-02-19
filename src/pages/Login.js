import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography,
  Alert, InputAdornment, IconButton, Paper
} from '@mui/material';
import { Visibility, VisibilityOff, LockOpen } from '@mui/icons-material';
import { useHistory, Link } from 'react-router-dom';
import { loginUser } from '../utils/auth';
import { type } from 'os';

const Login = () => {
    const history = useHistory();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(form.email)) newErrors.email = 'Enter a valid email';

        if (!form.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const result = loginUser(form.email, form.password);
        if(result.success) {
            setAlert({
                type : 'success',
                message : 'Login successful!'
            });
            setTimeout(() => history.push('/dashboard'),1500);
        } else {
            setAlert({
                type : 'error',
                message : result.message
            });
        }
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
        padding: 4, width: '100%', maxWidth: 420, borderRadius: 4,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LockOpen sx={{ fontSize: 50, color: '#e94560' }} />
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Welcome Back
          </Typography>
          <Typography sx={{ color: '#aaa', mt: 1 }}>Login to your account</Typography>
        </Box>

        {alert && <Alert severity={alert.type} sx={{ mb: 2 }}>{alert.message}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label="Email Address" name="email"
            value={form.email} onChange={handleChange}
            error={!!errors.email} helperText={errors.email}
            sx={inputStyle}
          />
          <TextField
            fullWidth label="Password" name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password} onChange={handleChange}
            error={!!errors.password} helperText={errors.password}
            sx={inputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff sx={{ color: '#aaa' }} /> : <Visibility sx={{ color: '#aaa' }} />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button fullWidth type="submit" variant="contained" sx={{
            mt: 2, py: 1.5, borderRadius: 3, fontSize: '1rem',
            background: 'linear-gradient(to right, #e94560, #0f3460)',
            '&:hover': { opacity: 0.9 }
          }}>
            Login
          </Button>
        </form>

        <Typography sx={{ textAlign: 'center', mt: 2, color: '#aaa' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#e94560' }}>Register here</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

const inputStyle = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
        color: '#fff',
        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
        '&:hover fieldset': { borderColor: '#e94560' },
    },
    '& .MuiInputLabel-root': { color: '#aaa' },
};

export default Login;