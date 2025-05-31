import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  List,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Container,
  Fade,
  Grow,
  IconButton,
  Badge,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  ArrowBack as ArrowBackIcon,
  Favorite as HeartIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
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

interface KudosModuleProps {
  user: User | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const companyValues = [
  'Przedsiębiorczość',
  'Autonomia',
  'Transparentność',
  'Współpraca',
  'Odpowiedzialność',
  'Rozwój',
  'Zrównoważony rozwój',
  'Innowacyjność',
];

const mockEmployees = [
  { name: 'Anna Kowalska', avatar: '👩‍💻' },
  { name: 'Jan Nowak', avatar: '👨‍💼' },
  { name: 'Maria Wiśniewska', avatar: '👩‍💼' },
  { name: 'Piotr Kowalczyk', avatar: '👨‍💻' },
  { name: 'Katarzyna Zielińska', avatar: '👩‍💼' },
];

const mockKudos = [
  {
    id: 1,
    giver: 'Jan Nowak',
    giverAvatar: '👨‍💼',
    recipient: 'Anna Kowalska',
    recipientAvatar: '👩‍💻',
    value: 'Współpraca',
    reason: 'Doskonała współpraca przy projekcie TARCZA. Anna zawsze była gotowa pomóc zespołowi.',
    date: '2024-01-15',
    visibility: 'Publiczny',
  },
  {
    id: 2,
    giver: 'Maria Wiśniewska',
    giverAvatar: '👩‍💼',
    recipient: 'Piotr Kowalczyk',
    recipientAvatar: '👨‍💻',
    value: 'Innowacyjność',
    reason: 'Wprowadził nowatorskie rozwiązanie, które znacznie usprawniło nasz system.',
    date: '2024-01-14',
    visibility: 'Publiczny',
  },
];

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const KudosModule: React.FC<KudosModuleProps> = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [value, setValue] = useState('');
  const [reason, setReason] = useState('');
  const [visibility, setVisibility] = useState('Publiczny');
  const [kudosList] = useState(mockKudos);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmitKudos = () => {
    if (recipient && value && reason) {
      // In real app, this would send to backend
      console.log('Kudos submitted:', { recipient, value, reason, visibility });
      // Reset form
      setRecipient('');
      setValue('');
      setReason('');
      setVisibility('Publiczny');
      // Show success message
      setShowSuccess(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const getValueColor = (value: string) => {
    const colors: { [key: string]: string } = {
      'Przedsiębiorczość': '#FF9500',
      'Autonomia': '#007AFF',
      'Transparentność': '#5AC8FA',
      'Współpraca': '#34C759',
      'Odpowiedzialność': '#FF3B30',
      'Rozwój': '#FFCC02',
      'Zrównoważony rozwój': '#30D158',
      'Innowacyjność': '#AF52DE',
    };
    return colors[value] || '#007AFF';
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Fade in timeout={600}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <TrophyIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Moduł Kudosów
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Doceniaj współpracowników za działania zgodne z wartościami firmy
              </Typography>
            </Box>
          </Box>

          {/* Tabs */}
          <Card sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrophyIcon sx={{ mr: 1 }} />
                    Przyznaj Kudosa
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={kudosList.length} color="primary">
                      <HeartIcon sx={{ mr: 1 }} />
                    </Badge>
                    Historia Kudosów
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    Statystyki
                  </Box>
                }
              />
            </Tabs>
          </Card>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            <Grow in timeout={800}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
                    Przyznaj Kudosa współpracownikowi
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Sekcja wyboru odbiorcy i wartości */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                        Wybierz odbiorcę i wartość
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <FormControl fullWidth>
                          <InputLabel>Komu przyznajesz Kudosa?</InputLabel>
                          <Select
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            label="Komu przyznajesz Kudosa?"
                          >
                            {mockEmployees
                              .filter(emp => emp.name !== user.name)
                              .map((employee) => (
                                <MenuItem key={employee.name} value={employee.name}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ mr: 2, fontSize: '1rem' }}>
                                      {employee.avatar}
                                    </Avatar>
                                    {employee.name}
                                  </Box>
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel>Za jaką wartość organizacyjną?</InputLabel>
                          <Select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            label="Za jaką wartość organizacyjną?"
                          >
                            {companyValues.map((val) => (
                              <MenuItem key={val} value={val}>
                                <Chip
                                  label={val}
                                  size="small"
                                  sx={{
                                    bgcolor: getValueColor(val),
                                    color: 'white',
                                    fontWeight: 500,
                                  }}
                                />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>

                    {/* Sekcja uzasadnienia */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                        Uzasadnienie
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        label="Opisz konkretne działanie"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Opisz konkretne działanie, za które chcesz docenić współpracownika..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Sekcja widoczności i przycisku */}
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                          <InputLabel>Widoczność</InputLabel>
                          <Select
                            value={visibility}
                            onChange={(e) => setVisibility(e.target.value)}
                            label="Widoczność"
                          >
                            <MenuItem value="Publiczny">Publiczny</MenuItem>
                            <MenuItem value="Tylko dla zespołu">Tylko dla zespołu</MenuItem>
                            <MenuItem value="Prywatny">Prywatny</MenuItem>
                          </Select>
                        </FormControl>

                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<TrophyIcon />}
                          onClick={handleSubmitKudos}
                          disabled={!recipient || !value || !reason}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            background: 'linear-gradient(45deg, #FF9500 30%, #FFCC02 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #FF6B00 30%, #FF9500 90%)',
                            },
                          }}
                        >
                          🏆 Przyznaj Kudosa
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grow in timeout={800}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Historia Kudosów
                  </Typography>

                  <List>
                    {kudosList.map((kudos, index) => (
                      <Grow key={kudos.id} in timeout={600 + index * 200}>
                        <Card sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Avatar sx={{ mr: 2, fontSize: '1.2rem' }}>
                                {kudos.giverAvatar}
                              </Avatar>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {kudos.giver} → {kudos.recipient}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {kudos.date}
                                </Typography>
                              </Box>
                              <Chip
                                label={kudos.value}
                                sx={{
                                  bgcolor: getValueColor(kudos.value),
                                  color: 'white',
                                  fontWeight: 500,
                                }}
                              />
                            </Box>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                              {kudos.reason}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Chip
                                label={kudos.visibility}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 1 }}
                              />
                              <StarIcon sx={{ color: '#FFCC02', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                +1 Kudos
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grow>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grow>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grow in timeout={800}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Karty z głównymi statystykami */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { 
                    xs: '1fr', 
                    sm: 'repeat(2, 1fr)', 
                    md: 'repeat(3, 1fr)' 
                  }, 
                  gap: 3 
                }}>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)', 
                    color: 'white' 
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="h3" fontWeight={700} gutterBottom>
                        {kudosList.length}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                        Łączna liczba Kudosów
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)', 
                    color: 'white' 
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="h3" fontWeight={700} gutterBottom>
                        {mockEmployees.length}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                        Aktywni pracownicy
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)', 
                    color: 'white' 
                  }}>
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="h3" fontWeight={700} gutterBottom>
                        {companyValues.length}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                        Wartości organizacyjne
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {/* Karty z wartościami i odbiorcami */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { 
                    xs: '1fr', 
                    md: 'repeat(2, 1fr)' 
                  }, 
                  gap: 3 
                }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                        Najczęściej nagradzane wartości
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {companyValues.slice(0, 5).map((val) => (
                          <Box
                            key={val}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              p: 2,
                              bgcolor: 'background.default',
                              borderRadius: 1,
                            }}
                          >
                            <Chip
                              label={val}
                              sx={{
                                bgcolor: getValueColor(val),
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '1rem',
                                py: 1,
                              }}
                            />
                            <Typography variant="h6" fontWeight={600}>
                              {Math.floor(Math.random() * 20) + 1}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                        Top odbiorcy Kudosów
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {mockEmployees.slice(0, 5).map((employee, index) => (
                          <Box
                            key={employee.name}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              bgcolor: 'background.default',
                              borderRadius: 1,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ mr: 2, fontWeight: 700, color: 'primary.main', minWidth: 40 }}
                            >
                              #{index + 1}
                            </Typography>
                            <Avatar sx={{ mr: 2, fontSize: '1.2rem', width: 40, height: 40 }}>
                              {employee.avatar}
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ flexGrow: 1 }}>
                              {employee.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <TrophyIcon sx={{ color: '#FFCC02' }} />
                              <Typography variant="h6" fontWeight={600}>
                                {Math.floor(Math.random() * 15) + 1}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Grow>
          </TabPanel>
        </Box>
      </Fade>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Kudos został pomyślnie przyznany! 🎉
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default KudosModule;