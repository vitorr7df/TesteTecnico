import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ onLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        onLoading(true);

        try {
            const response = await api.post('/users/login', {
                email,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            navigate('/userlist');
        } catch (err) {
            toast.error("Erro ao fazer login");
        } finally {
            onLoading(false);
        }
    };
    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
};

export default LoginForm;
