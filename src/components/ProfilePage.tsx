import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Container,
  Divider,
  Fade,
  Grow,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
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

interface ProfilePageProps {
  user: User | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    phone: '+48 123 456 789',
    bio: 'Doświadczony specjalista IT z pasją do innowacyjnych rozwiązań.',
    skills: 'React, TypeScript, Node.js, Python, Docker',
    interests: 'Sztuczna inteligencja, Zrównoważony rozwój, Fotografia',
  });
  const navigate = useNavigate();

  if (!user) return null;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      'IT': '#007AFF',
      'HR': '#34C759',
      'Zarząd': '#FF9500',
    };
    return colors[department] || '#6D6D80';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Mój profil
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Zarządzaj swoimi danymi i ścieżką rozwoju
              </Typography>
            </Box>
          </Box>

          {/* Profile Header Card */}
          <Grow in timeout={800}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} alignItems="center">
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        fontSize: '4rem',
                        bgcolor: 'primary.light',
                      }}
                    >
                      {user.avatar}
                    </Avatar>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {user.email}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={user.department}
                        sx={{
                          bgcolor: getDepartmentColor(user.department),
                          color: 'white',
                          fontWeight: 500,
                          mr: 1,
                        }}
                      />
                      <Chip
                        label={user.role}
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label="Aktywny"
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Button
                      variant={isEditing ? "outlined" : "contained"}
                      startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
                      onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                      sx={{ mr: 1 }}
                    >
                      {isEditing ? 'Anuluj' : 'Edytuj profil'}
                    </Button>
                    {isEditing && (
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        color="success"
                      >
                        Zapisz
                      </Button>
                    )}
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Grow>

          {/* Tabs */}
          <Card>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab label="Informacje osobiste" />
              <Tab label="Kompetencje i zainteresowania" />
              <Tab label="Historia aktywności" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Dane osobowe
                </Typography>
                
                <Grid container spacing={3}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <TextField
                      fullWidth
                      label="Imię i nazwisko"
                      value={user.name}
                      disabled
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Email firmowy"
                      value={user.email}
                      disabled
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Rola"
                      value={user.role}
                      disabled
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Departament"
                      value={user.department}
                      disabled
                    />
                  </Box>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <TextField
                      fullWidth
                      label="Telefon"
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      disabled={!isEditing}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Bio"
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Napisz coś o sobie..."
                    />
                  </Box>
                </Grid>
              </CardContent>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Kompetencje i zainteresowania
                </Typography>
                
                <Grid container spacing={3}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <TextField
                      fullWidth
                      label="Umiejętności techniczne"
                      value={editData.skills}
                      onChange={(e) => setEditData({...editData, skills: e.target.value})}
                      disabled={!isEditing}
                      placeholder="React, TypeScript, Python..."
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Zainteresowania"
                      value={editData.interests}
                      onChange={(e) => setEditData({...editData, interests: e.target.value})}
                      disabled={!isEditing}
                      placeholder="AI, Sustainability, Photography..."
                      sx={{ mb: 3 }}
                    />
                  </Box>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  Certyfikaty i osiągnięcia
                </Typography>
                <Grid container spacing={2}>
                  {[
                    'AWS Certified Solutions Architect',
                    'Scrum Master Certified',
                    'React Developer Expert',
                  ].map((cert, index) => (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }} key={index}>
                      <Chip
                        label={cert}
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    </Box>
                  ))}
                </Grid>
              </CardContent>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Historia aktywności
                </Typography>
                
                <Grid container spacing={3}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight={700}>
                          12
                        </Typography>
                        <Typography variant="body2">
                          Przyznane Kudosy
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight={700}>
                          8
                        </Typography>
                        <Typography variant="body2">
                          Otrzymane Kudosy
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Card sx={{ bgcolor: 'warning.light', color: 'white' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight={700}>
                          3
                        </Typography>
                        <Typography variant="body2">
                          Zgłoszone inicjatywy
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Ostatnie aktywności
                  </Typography>
                  {[
                    { action: 'Przyznano Kudosa', target: 'Jan Nowak', date: '2024-01-15', type: 'kudos' },
                    { action: 'Zgłoszono inicjatywę', target: 'Optymalizacja procesów', date: '2024-01-14', type: 'initiative' },
                    { action: 'Otrzymano Kudosa', target: 'od Maria Wiśniewska', date: '2024-01-13', type: 'received' },
                  ].map((activity, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent sx={{ py: 2 }}>
                        <Grid container alignItems="center">
                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {activity.action}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activity.target}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                              {activity.date}
                            </Typography>
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </TabPanel>
          </Card>
        </Box>
      </Fade>
    </Container>
  );
};

export default ProfilePage;