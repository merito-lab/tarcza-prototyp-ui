import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Fade,
  Grow,
  ListItemButton,
} from '@mui/material';
import { Google as GoogleIcon, Shield as ShieldIcon } from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Anna Kowalska',
    email: 'anna.kowalska@energetyka.pl',
    role: 'Pracownik',
    department: 'IT',
    avatar: '👩‍💻',
  },
  {
    id: 2,
    name: 'Jan Nowak',
    email: 'jan.nowak@energetyka.pl',
    role: 'Lider zespołu',
    department: 'HR',
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Maria Wiśniewska',
    email: 'maria.wisniewska@energetyka.pl',
    role: 'Koordynator HR',
    department: 'HR',
    avatar: '👩‍💼',
  },
  {
    id: 4,
    name: 'Piotr Kowalczyk',
    email: 'piotr.kowalczyk@energetyka.pl',
    role: 'Administrator systemu',
    department: 'IT',
    avatar: '👨‍💻',
  },
  {
    id: 5,
    name: 'Katarzyna Zielińska',
    email: 'katarzyna.zielinska@energetyka.pl',
    role: 'Zarząd',
    department: 'Zarząd',
    avatar: '👩‍💼',
  },
  {
    id: 6,
    name: 'Tomasz Dąbrowski',
    email: 'tomasz.dabrowski@energetyka.pl',
    role: 'Koordynator programu Mam wpływ',
    department: 'HR',
    avatar: '👨‍💼',
  },
];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [authProgress, setAuthProgress] = useState(0);

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    setAuthProgress(0);

    // Simulate Google OAuth flow
    const steps = [
      'Przekierowanie do Google...',
      'Autoryzacja z Google Auth...',
      'Pobieranie danych użytkownika...',
      'Sprawdzanie uprawnień w systemie TARCZA...',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setAuthProgress(((i + 1) / steps.length) * 100);
    }

    setIsAuthenticating(false);
    setShowUserSelection(true);
  };

  const handleUserSelect = (user: User) => {
    onLogin(user);
  };

  if (showUserSelection) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Fade in={showUserSelection} timeout={800}>
          <Card
            sx={{
              maxWidth: 500,
              width: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <ShieldIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  Wybierz swoje konto
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Autoryzacja Google zakończona pomyślnie
                </Typography>
              </Box>

              <List>
                {mockUsers.map((user, index) => (
                  <Grow
                    key={user.id}
                    in={showUserSelection}
                    timeout={600 + index * 200}
                  >
                    <ListItemButton
                      onClick={() => handleUserSelect(user)}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                          background: 'rgba(0, 122, 255, 0.05)',
                          transform: 'translateX(8px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.light',
                            fontSize: '1.5rem',
                          }}
                        >
                          {user.avatar}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={`${user.email} • ${user.role}`}
                        primaryTypographyProps={{
                          fontWeight: 600,
                        }}
                      />
                    </ListItemButton>
                  </Grow>
                ))}
              </List>
            </CardContent>
          </Card>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Fade in timeout={1000}>
        <Card
          sx={{
            maxWidth: 450,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <ShieldIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                TARCZA
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Technologia Aktywnego Rozwoju
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Członków Zespołu i Adaptacji
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="primary.main" sx={{ mb: 2, fontWeight: 500 }}>
                💡 System zintegrowany z Google Workspace
              </Typography>
            </Box>

            {isAuthenticating ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress
                  variant="determinate"
                  value={authProgress}
                  size={60}
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Trwa autoryzacja... {Math.round(authProgress)}%
                </Typography>
              </Box>
            ) : (
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  mb: 3,
                }}
              >
                Zaloguj się przez Google Workspace
              </Button>
            )}

            <Box
              sx={{
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'text.secondary',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                pt: 3,
              }}
            >
              🔒 Połączenie zabezpieczone SSL/TLS<br />
              🛡️ Zgodność z RODO • 🔐 Autoryzacja dwuskładnikowa
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default LoginPage;