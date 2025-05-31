import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Badge,
  Container,
  Fade,
  Grow,
} from '@mui/material';
import {
  Person as PersonIcon,
  EmojiEvents as TrophyIcon,
  Group as GroupIcon,
  Lightbulb as LightbulbIcon,
  Assessment as ReportIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from './AppBarComponent';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
}

interface DashboardCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  badge?: number;
  disabled?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  if (!user) return null;

  const getAvailableCards = (): DashboardCard[] => {
    const baseCards: DashboardCard[] = [
      {
        title: 'Moduł Kudosów',
        description: 'Doceniaj współpracowników za działania zgodne z wartościami firmy',
        icon: <TrophyIcon sx={{ fontSize: 40 }} />,
        color: '#FF9500',
        route: '/kudos',
        badge: 3,
      },
      {
        title: 'Mój Profil',
        description: 'Zarządzaj swoimi danymi i ścieżką rozwoju',
        icon: <PersonIcon sx={{ fontSize: 40 }} />,
        color: '#007AFF',
        route: '/profile',
      },
      {
        title: 'Moduł Szkoleń',
        description: 'Zarządzaj szkoleniami i rozwojem kompetencji',
        icon: <SchoolIcon sx={{ fontSize: 40 }} />,
        color: '#AF52DE',
        route: '/training',
        badge: 2,
      },
    ];

    // Add role-specific cards
    if (['Koordynator HR', 'Administrator systemu', 'Zarząd'].includes(user.role)) {
      baseCards.push({
        title: 'Lista Pracowników',
        description: 'Zarządzaj danymi pracowników i ich profilami',
        icon: <GroupIcon sx={{ fontSize: 40 }} />,
        color: '#34C759',
        route: '/employees',
      });
    }

    if (['Koordynator programu Mam wpływ', 'Zarząd'].includes(user.role)) {
      baseCards.push({
        title: 'Program "Mam wpływ"',
        description: 'Zarządzaj inicjatywami pracowniczymi',
        icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
        color: '#FFCC02',
        route: '/initiatives',
        badge: 5,
      });
    }

    if (user.role === 'Zarząd') {
      baseCards.push({
        title: 'Raporty i Analizy',
        description: 'Strategiczne raporty i wskaźniki HR',
        icon: <ReportIcon sx={{ fontSize: 40 }} />,
        color: '#FF3B30',
        route: '/reports',
      });
    }

    return baseCards;
  };

  const cards = getAvailableCards();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarComponent user={user} onLogout={onLogout} />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Fade in timeout={800}>
          <Box>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
              Witaj, {user.name.split(' ')[0]}! 👋
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
              Kontekst: {user.role} • {user.department}
            </Typography>

            {/* Quick Stats */}
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
              <Card sx={{ background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)', color: 'white', flex: 1, minWidth: 200 }}>
                <CardContent>
                  <Typography variant="h4" fontWeight={700}>12</Typography>
                  <Typography variant="body2">Przyznane Kudosy</Typography>
                </CardContent>
              </Card>
              <Card sx={{ background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)', color: 'white', flex: 1, minWidth: 200 }}>
                <CardContent>
                  <Typography variant="h4" fontWeight={700}>3</Typography>
                  <Typography variant="body2">Aktywne inicjatywy</Typography>
                </CardContent>
              </Card>
              <Card sx={{ background: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)', color: 'white', flex: 1, minWidth: 200 }}>
                <CardContent>
                  <Typography variant="h4" fontWeight={700}>85%</Typography>
                  <Typography variant="body2">Postęp celów</Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Main Navigation Cards */}
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Dostępne moduły
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
              {cards.map((card, index) => (
                <Box key={card.title}>
                  <Grow in timeout={600 + index * 200}>
                    <Card
                      sx={{
                        cursor: card.disabled ? 'not-allowed' : 'pointer',
                        opacity: card.disabled ? 0.6 : 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        '&:hover': card.disabled ? {} : {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                      onClick={() => !card.disabled && handleCardClick(card.route)}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              color: card.color,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {card.icon}
                          </Box>
                          {card.badge && (
                            <Badge
                              badgeContent={card.badge}
                              color="error"
                              sx={{
                                '& .MuiBadge-badge': {
                                  fontSize: '0.75rem',
                                },
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grow>
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Dashboard;