import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Button, Box } from '@mui/material';

const AuthPage = ({ onLoading }) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
            <img src={require('../assets/1300231.svg').default} alt="Carro" className="car-icon" />

            {isLogin ? <LoginForm onLoading={onLoading} /> : <SignupForm onLoading={onLoading} />}  {/* Exibe o formulário de login ou cadastro */}
            <Button onClick={toggleForm} sx={{ mt: 2 }}>
                {isLogin ? 'Criar conta' : 'Já tem uma conta? Faça Login'}  {/* Botão para alternar */}
            </Button>
        </Box>
    );
};

export default AuthPage;
