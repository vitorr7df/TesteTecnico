import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme, IconButton, CircularProgress } from '@mui/material';
import { WbSunny, NightlightRound } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UserList from './pages/UserList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const salvarTema = localStorage.getItem('darkMode');
        if (salvarTema) {
            setDarkMode(JSON.parse(salvarTema));
        }
    }, []);

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const alterarTema = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };

    const startLoading = (status) => {
        setLoading(status);
    };


    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Router>
                <div className="App">
                    <IconButton className="theme-toggle" onClick={alterarTema} color="inherit">
                        {darkMode ? <WbSunny /> : <NightlightRound />}
                    </IconButton>

                    {loading && (
                        <div className="loading-overlay">
                            <CircularProgress />
                        </div>
                    )}

                    <Routes>
                        <Route path="/" element={<AuthPage onLoading={startLoading} />} />
                        <Route
                            path="/userlist"
                            element={
                                <ProtectedRoute>
                                    <UserList onLoading={startLoading} />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
