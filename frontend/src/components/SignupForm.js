import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import api from '../services/api';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onLoading }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const insertUser = async (e) => {
        e.preventDefault();
        onLoading(true);

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem");
        }

        try {
            const response = await api.post('/users', {
                name,
                email,
                password,
            });
            console.log(response.data);
            toast.success("Usuário cadastrado com sucesso!");
            navigate('/');

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            toast.error('Erro ao cadastrar usuário. Tente novamente.');
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
                    Cadastro
                </Typography>
                <form onSubmit={insertUser} style={{ width: '100%' }}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <TextField
                        label="Confirmar senha"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Cadastrar
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

export default SignupForm;
