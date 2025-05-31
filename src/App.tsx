import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import KudosModule from './components/KudosModule';
import EmployeeList from './components/EmployeeList';
import ProfilePage from './components/ProfilePage';
import MamWplywModule from './components/MamWplywModule';
import TrainingModule from './components/TrainingModule';
import ReportsModule from './components/ReportsModule';
import Layout from './components/Layout';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

// Apple-like theme configuration
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF', // Apple blue
      light: '#5AC8FA',
      dark: '#0051D5',
    },
    secondary: {
      main: '#FF9500', // Apple orange
      light: '#FFCC02',
      dark: '#FF6B00',
    },
    background: {
      default: '#F2F2F7', // Apple light gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#6D6D80',
    },
    success: {
      main: '#34C759', // Apple green
    },
    error: {
      main: '#FF3B30', // Apple red
    },
    warning: {
      main: '#FFCC02', // Apple yellow
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12, // Apple-like rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #007AFF 30%, #5AC8FA 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #0051D5 30%, #007AFF 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(20px)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: 'none',
          color: '#000000',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 122, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007AFF',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F2F2F7 0%, #E5E5EA 100%)',
      }}>
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                isLoggedIn ? (
                  <Dashboard 
                    user={currentUser} 
                    onLogout={handleLogout} 
                  />
                ) : (
                  <LoginPage 
                    onLogin={(user) => {
                      setCurrentUser(user);
                      setIsLoggedIn(true);
                    }} 
                  />
                )
              } 
            />
            <Route 
              path="/kudos" 
              element={
                <Layout user={currentUser} onLogout={handleLogout}>
                  <KudosModule user={currentUser} />
                </Layout>
              } 
            />
            <Route 
              path="/employees" 
              element={
                <Layout user={currentUser} onLogout={handleLogout}>
                  <EmployeeList user={currentUser} />
                </Layout>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Layout user={currentUser} onLogout={handleLogout}>
                  <ProfilePage user={currentUser} />
                </Layout>
              } 
            />
            <Route 
              path="/initiatives" 
              element={
                <Layout user={currentUser} onLogout={handleLogout}>
                  <MamWplywModule user={currentUser} />
                </Layout>
              } 
            />
            <Route 
              path="/training" 
              element={
                <Layout user={currentUser} onLogout={handleLogout}>
                  <TrainingModule user={currentUser} />
                </Layout>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <Layout user={currentUser} onLogout={handleLogout}>
                  <ReportsModule user={currentUser} />
                </Layout>
              } 
            />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;