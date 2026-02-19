import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography,
  Alert, InputAdornment, IconButton, Paper
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { useHistory, Link } from 'react-router-dom';
import { registerUser } from '../utils/auth';

const Register = () => {
    const history = useHistory();
    const [form, setForm] = useState({ email : '', password : '', confirmPassword : ''});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

        if(!form.email) newErrors.email = 'Email is required.';
        else if(!emailRegex.test(form.email)) newErrors.email = 'Enter a valid email address';

        if(!form.password) newErrors.password = 'Password is required.';
        else if(!passwordRegex.test(form.password)) newErrors.password = 'Password must contain minimum 8 characters, a letter, and a number';

        if(!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if(form.password !== form.confirmPassword) newErrors.confirmPassword = 'Password does not match';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const result = registerUser(form.email, form.password);
        if(result.success) {
            setAlert({
                type : 'success',
                message : 'Account created! Redirecting to login page...'
            });
            setTimeout(() => history.push('/login'), 2000);
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
          <PersonAdd sx={{ fontSize: 50, color: '#e94560' }} />
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
            Create Account
          </Typography>
          <Typography sx={{ color: '#aaa', mt: 1 }}>Join us today, it's free!</Typography>
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
          <TextField
            fullWidth label="Confirm Password" name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            value={form.confirmPassword} onChange={handleChange}
            error={!!errors.confirmPassword} helperText={errors.confirmPassword}
            sx={inputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <VisibilityOff sx={{ color: '#aaa' }} /> : <Visibility sx={{ color: '#aaa' }} />}
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
            Register
          </Button>
        </form>

        <Typography sx={{ textAlign: 'center', mt: 2, color: '#aaa' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#e94560' }}>Login here</Link>
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

export default Register;