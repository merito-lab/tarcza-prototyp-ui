import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Fade,
  Grow,
  Badge,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Lightbulb as LightbulbIcon,
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
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

interface MamWplywModuleProps {
  user: User | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Initiative {
  id: number;
  title: string;
  description: string;
  solution: string;
  category: string;
  expectedImpact: string;
  author: string;
  authorAvatar: string;
  status: string;
  date: string;
  votes: number;
  comments: number;
}

const categories = [
  'Usprawnienie procesów',
  'Oszczędności',
  'Kultura organizacyjna',
  'Technologia',
  'Środowisko pracy',
  'Inne',
];

const impactLevels = ['Niski', 'Średni', 'Wysoki'];
const statusOptions = ['Nowa', 'W ocenie', 'Zaakceptowana', 'W realizacji', 'Zrealizowana', 'Odrzucona'];

const mockInitiatives: Initiative[] = [
  {
    id: 1,
    title: 'Automatyzacja raportów HR',
    description: 'Obecne tworzenie raportów HR zajmuje zbyt dużo czasu i jest podatne na błędy.',
    solution: 'Wdrożenie systemu automatycznego generowania raportów z bazy danych.',
    category: 'Usprawnienie procesów',
    expectedImpact: 'Wysoki',
    author: 'Anna Kowalska',
    authorAvatar: '👩‍💻',
    status: 'W realizacji',
    date: '2024-01-15',
    votes: 15,
    comments: 8,
  },
  {
    id: 2,
    title: 'Program mentoringu',
    description: 'Nowi pracownicy potrzebują lepszego wsparcia w procesie adaptacji.',
    solution: 'Stworzenie formalnego programu mentoringu dla nowych pracowników.',
    category: 'Kultura organizacyjna',
    expectedImpact: 'Średni',
    author: 'Jan Nowak',
    authorAvatar: '👨‍💼',
    status: 'Zaakceptowana',
    date: '2024-01-12',
    votes: 22,
    comments: 12,
  },
  {
    id: 3,
    title: 'Zielone biuro',
    description: 'Zwiększenie ekologiczności naszego miejsca pracy.',
    solution: 'Wprowadzenie recyklingu, redukcja papieru, rośliny w biurze.',
    category: 'Środowisko pracy',
    expectedImpact: 'Średni',
    author: 'Maria Wiśniewska',
    authorAvatar: '👩‍💼',
    status: 'Nowa',
    date: '2024-01-10',
    votes: 18,
    comments: 5,
  },
];

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const MamWplywModule: React.FC<MamWplywModuleProps> = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [solution, setSolution] = useState('');
  const [category, setCategory] = useState('');
  const [expectedImpact, setExpectedImpact] = useState('');
  const [initiatives] = useState(mockInitiatives);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  // Check permissions
  const hasFullAccess = ['Koordynator programu Mam wpływ', 'Zarząd'].includes(user.role);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSubmitInitiative = () => {
    if (title && description && solution && category && expectedImpact) {
      console.log('Initiative submitted:', { title, description, solution, category, expectedImpact });
      // Reset form
      setTitle('');
      setDescription('');
      setSolution('');
      setCategory('');
      setExpectedImpact('');
      // Show success message
      setShowSuccess(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
    // Przekieruj do tabu z listą inicjatyw
    setTabValue(1);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Nowa': '#6D6D80',
      'W ocenie': '#007AFF',
      'Zaakceptowana': '#34C759',
      'W realizacji': '#FF9500',
      'Zrealizowana': '#30D158',
      'Odrzucona': '#FF3B30',
    };
    return colors[status] || '#6D6D80';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Usprawnienie procesów': '#007AFF',
      'Oszczędności': '#34C759',
      'Kultura organizacyjna': '#FF9500',
      'Technologia': '#AF52DE',
      'Środowisko pracy': '#30D158',
      'Inne': '#6D6D80',
    };
    return colors[category] || '#6D6D80';
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
            <LightbulbIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Program "Mam wpływ"
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Zgłaszaj i zarządzaj inicjatywami pracowniczymi
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
                    <AddIcon sx={{ mr: 1 }} />
                    Zgłoś inicjatywę
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={initiatives.length} color="primary">
                      <LightbulbIcon sx={{ mr: 1 }} />
                    </Badge>
                    Wszystkie inicjatywy
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
                    Zgłoś swoją inicjatywę
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Sekcja podstawowych informacji */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                        Podstawowe informacje
                      </Typography>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <TextField
                          fullWidth
                          label="Tytuł inicjatywy"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Krótko opisz swoją inicjatywę..."
                        />
                        <FormControl fullWidth>
                          <InputLabel>Kategoria</InputLabel>
                          <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Kategoria"
                          >
                            {categories.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                <Chip
                                  label={cat}
                                  size="small"
                                  sx={{
                                    bgcolor: getCategoryColor(cat),
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

                    {/* Sekcja opisu problemu */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                        Opis problemu
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Opis problemu/możliwości"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Opisz problem, który chcesz rozwiązać lub możliwość, którą dostrzegasz..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Sekcja proponowanego rozwiązania */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                        Proponowane rozwiązanie
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Proponowane rozwiązanie"
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder="Jak można rozwiązać ten problem? Jakie kroki należy podjąć?"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* Sekcja wpływu i przycisku */}
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <FormControl sx={{ minWidth: 200 }}>
                          <InputLabel>Oczekiwany wpływ</InputLabel>
                          <Select
                            value={expectedImpact}
                            onChange={(e) => setExpectedImpact(e.target.value)}
                            label="Oczekiwany wpływ"
                          >
                            {impactLevels.map((level) => (
                              <MenuItem key={level} value={level}>
                                {level}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<LightbulbIcon />}
                          onClick={handleSubmitInitiative}
                          disabled={!title || !description || !solution || !category || !expectedImpact}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            background: 'linear-gradient(45deg, #FFCC02 30%, #FF9500 90%)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #FF9500 30%, #FF6B00 90%)',
                            },
                          }}
                        >
                          💡 Zgłoś inicjatywę
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {initiatives.map((initiative, index) => (
                <Grow key={initiative.id} in timeout={600 + index * 200}>
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      {/* Nagłówek inicjatywy */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                        <Avatar sx={{ mr: 2, fontSize: '1.2rem', width: 40, height: 40 }}>
                          {initiative.authorAvatar}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {initiative.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Typography variant="body2" color="text.secondary">
                              {initiative.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">•</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {initiative.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">•</Typography>
                            <Chip
                              label={initiative.category}
                              size="small"
                              sx={{
                                bgcolor: getCategoryColor(initiative.category),
                                color: 'white',
                                fontWeight: 500,
                              }}
                            />
                          </Box>
                        </Box>
                        <Chip
                          label={initiative.status}
                          sx={{
                            bgcolor: getStatusColor(initiative.status),
                            color: 'white',
                            fontWeight: 500,
                            ml: 2,
                          }}
                        />
                      </Box>

                      {/* Treść inicjatywy */}
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Problem
                          </Typography>
                          <Typography variant="body1">
                            {initiative.description}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Proponowane rozwiązanie
                          </Typography>
                          <Typography variant="body1">
                            {initiative.solution}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Stopka inicjatywy */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                        pt: 2,
                        borderTop: 1,
                        borderColor: 'divider'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ThumbUpIcon />}
                            sx={{ minWidth: 100 }}
                          >
                            {initiative.votes}
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: 100 }}
                          >
                            {initiative.comments} komentarzy
                          </Button>
                          <Chip
                            label={`Wpływ: ${initiative.expectedImpact}`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>

                        {hasFullAccess && (
                          <FormControl size="small" sx={{ minWidth: 200 }}>
                            <InputLabel>Zmień status</InputLabel>
                            <Select
                              value={initiative.status}
                              label="Zmień status"
                              onChange={(e) => {
                                console.log('Status changed:', e.target.value);
                              }}
                            >
                              {statusOptions.map((status) => (
                                <MenuItem key={status} value={status}>
                                  {status}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
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
                  background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)', 
                  color: 'white' 
                }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                      {initiatives.length}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      Łączna liczba inicjatyw
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ 
                  background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)', 
                  color: 'white' 
                }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                      {initiatives.filter(i => i.status === 'Zrealizowana').length}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      Zrealizowane inicjatywy
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ 
                  background: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)', 
                  color: 'white' 
                }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                      {Math.round(initiatives.reduce((sum, i) => sum + i.votes, 0) / initiatives.length)}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      Średnia liczba głosów
                    </Typography>
                  </CardContent>
                </Card>
              </Box>

              {/* Karty z kategoriami i statusami */}
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
                      Inicjatywy według kategorii
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {categories.slice(0, 4).map((cat) => (
                        <Box
                          key={cat}
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
                            label={cat}
                            sx={{
                              bgcolor: getCategoryColor(cat),
                              color: 'white',
                              fontWeight: 500,
                              fontSize: '1rem',
                              py: 1,
                            }}
                          />
                          <Typography variant="h6" fontWeight={600}>
                            {Math.floor(Math.random() * 10) + 1}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                      Status inicjatyw
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {statusOptions.slice(0, 5).map((status) => (
                        <Box
                          key={status}
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
                            label={status}
                            sx={{
                              bgcolor: getStatusColor(status),
                              color: 'white',
                              fontWeight: 500,
                              fontSize: '1rem',
                              py: 1,
                            }}
                          />
                          <Typography variant="h6" fontWeight={600}>
                            {Math.floor(Math.random() * 8) + 1}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </TabPanel>
        </Box>
      </Fade>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Inicjatywa została pomyślnie zgłoszona! 🎉
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MamWplywModule;