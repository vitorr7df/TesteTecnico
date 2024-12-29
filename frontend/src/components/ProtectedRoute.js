import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Recupera o token do localStorage (ou de onde você armazena o token)
    const token = localStorage.getItem('authToken');

    // Se não houver token, redireciona para a página de login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Se houver token, renderiza o componente filho (UserList)
    return children;
};

export default ProtectedRoute;
