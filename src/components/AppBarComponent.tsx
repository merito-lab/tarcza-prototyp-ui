import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  ListItemIcon,
  Divider,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
} from '@mui/material';
import {
  Shield as ShieldIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

interface AppBarComponentProps {
  user: User | null;
  onLogout: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'kudos' | 'training' | 'initiative' | 'system';
  time: string;
  read: boolean;
  icon: React.ReactNode;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: 1,
      title: 'Nowy Kudos!',
      message: 'Anna Kowalska przyznała Ci Kudosa za "Współpracę"',
      type: 'kudos',
      time: '5 min temu',
      read: false,
      icon: <TrophyIcon sx={{ color: '#FF9500' }} />,
    },
    {
      id: 2,
      title: 'Szkolenie zatwierdzone',
      message: 'Twój wniosek na szkolenie "Zarządzanie zespołem" został zatwierdzony',
      type: 'training',
      time: '2 godziny temu',
      read: false,
      icon: <SchoolIcon sx={{ color: '#AF52DE' }} />,
    },
    {
      id: 3,
      title: 'Nowa inicjatywa',
      message: 'Jan Nowak zgłosił inicjatywę "Program mentoringu"',
      type: 'initiative',
      time: '1 dzień temu',
      read: true,
      icon: <LightbulbIcon sx={{ color: '#FFCC02' }} />,
    },
    {
      id: 4,
      title: 'Przypomnienie',
      message: 'Szkolenie "Komunikacja w zespole" rozpoczyna się jutro o 9:00',
      type: 'system',
      time: '2 dni temu',
      read: true,
      icon: <ScheduleIcon sx={{ color: '#007AFF' }} />,
    },
  ];

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  const markAllAsRead = () => {
    console.log('Mark all notifications as read');
    // In real app, this would update the state/backend
  };

  if (!user) return null;

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton 
          onClick={() => navigate('/')} 
          sx={{ mr: 2, color: 'inherit' }}
        >
          <ShieldIcon sx={{ fontSize: 28 }} />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          TARCZA
        </Typography>
        
        <IconButton 
          color="inherit" 
          sx={{ mr: 1 }}
          onClick={handleNotificationsOpen}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          onClick={handleMenuOpen}
          sx={{ p: 0 }}
        >
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
              width: 40,
              height: 40,
              fontSize: '1.2rem',
            }}
          >
            {user.avatar}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 2,
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Chip
              label={user.role}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Box>
          <Divider />
          <MenuItem onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Mój profil
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Ustawienia
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Wyloguj się
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleNotificationsClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 2,
              mt: 1,
              minWidth: 380,
              maxWidth: 400,
              maxHeight: 500,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={600}>
                Powiadomienia
              </Typography>
              <Button
                size="small"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Oznacz jako przeczytane
              </Button>
            </Box>
            {unreadCount > 0 && (
              <Typography variant="body2" color="text.secondary">
                {unreadCount} nowych powiadomień
              </Typography>
            )}
          </Box>
          
          <List sx={{ py: 0, maxHeight: 400, overflow: 'auto' }}>
            {mockNotifications.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="Brak powiadomień"
                  secondary="Nie masz żadnych nowych powiadomień"
                  sx={{ textAlign: 'center' }}
                />
              </ListItem>
            ) : (
              mockNotifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    borderLeft: notification.read ? 'none' : '4px solid',
                    borderColor: notification.read ? 'transparent' : 'primary.main',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent' }}>
                      {notification.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip
                            label="Nowe"
                            size="small"
                            color="primary"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))
            )}
          </List>
          
          {mockNotifications.length > 0 && (
            <Box sx={{ p: 1, borderTop: 1, borderColor: 'divider' }}>
              <Button
                fullWidth
                variant="text"
                size="small"
                onClick={() => {
                  handleNotificationsClose();
                  // In real app, navigate to notifications page
                  console.log('Show all notifications');
                }}
              >
                Zobacz wszystkie powiadomienia
              </Button>
            </Box>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;