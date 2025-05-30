import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
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
} from '@mui/material';
import {
  Lightbulb as LightbulbIcon,
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
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
    }
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
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Zgłoś swoją inicjatywę
                  </Typography>

                  <Grid container spacing={3}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <TextField
                        fullWidth
                        label="Tytuł inicjatywy"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Krótko opisz swoją inicjatywę..."
                        sx={{ mb: 3 }}
                      />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Opis problemu/możliwości"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Opisz problem, który chcesz rozwiązać lub możliwość, którą dostrzegasz..."
                        sx={{ mb: 3 }}
                      />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Proponowane rozwiązanie"
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder="Jak można rozwiązać ten problem? Jakie kroki należy podjąć?"
                        sx={{ mb: 3 }}
                      />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <FormControl fullWidth sx={{ mb: 3 }}>
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

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <FormControl fullWidth sx={{ mb: 3 }}>
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
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<LightbulbIcon />}
                        onClick={handleSubmitInitiative}
                        disabled={!title || !description || !solution || !category || !expectedImpact}
                        sx={{
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
                  </Grid>
                </CardContent>
              </Card>
            </Grow>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              {initiatives.map((initiative, index) => (
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }} key={initiative.id}>
                  <Grow in timeout={600 + index * 200}>
                    <Card>
                      <CardContent sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Avatar sx={{ mr: 2, fontSize: '1rem' }}>
                                {initiative.authorAvatar}
                              </Avatar>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight={600}>
                                  {initiative.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {initiative.author} • {initiative.date}
                                </Typography>
                              </Box>
                              <Chip
                                label={initiative.status}
                                sx={{
                                  bgcolor: getStatusColor(initiative.status),
                                  color: 'white',
                                  fontWeight: 500,
                                }}
                              />
                            </Box>

                            <Typography variant="body1" sx={{ mb: 2 }}>
                              <strong>Problem:</strong> {initiative.description}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                              <strong>Rozwiązanie:</strong> {initiative.solution}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                              <Chip
                                label={initiative.category}
                                size="small"
                                sx={{
                                  bgcolor: getCategoryColor(initiative.category),
                                  color: 'white',
                                  fontWeight: 500,
                                }}
                              />
                              <Chip
                                label={`Wpływ: ${initiative.expectedImpact}`}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Box>

                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Button
                                  variant="outlined"
                                  startIcon={<ThumbUpIcon />}
                                  sx={{ mr: 1 }}
                                >
                                  {initiative.votes}
                                </Button>
                                <Button variant="outlined">
                                  {initiative.comments} komentarzy
                                </Button>
                              </Box>

                              {hasFullAccess && (
                                <FormControl fullWidth size="small">
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
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grow>
                </Box>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Inicjatywy według kategorii
                    </Typography>
                    {categories.slice(0, 4).map((cat, index) => (
                      <Box
                        key={cat}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2,
                        }}
                      >
                        <Chip
                          label={cat}
                          sx={{
                            bgcolor: getCategoryColor(cat),
                            color: 'white',
                            fontWeight: 500,
                          }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {Math.floor(Math.random() * 10) + 1}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Status inicjatyw
                    </Typography>
                    {statusOptions.slice(0, 5).map((status, index) => (
                      <Box
                        key={status}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2,
                        }}
                      >
                        <Chip
                          label={status}
                          sx={{
                            bgcolor: getStatusColor(status),
                            color: 'white',
                            fontWeight: 500,
                          }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {Math.floor(Math.random() * 8) + 1}
                        </Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Box>

              <Grid container spacing={3}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight={700}>
                          {initiatives.length}
                        </Typography>
                        <Typography variant="body2">
                          Łączna liczba inicjatyw
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight={700}>
                          {initiatives.filter(i => i.status === 'Zrealizowana').length}
                        </Typography>
                        <Typography variant="body2">
                          Zrealizowane inicjatywy
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Card sx={{ bgcolor: 'warning.light', color: 'white' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" fontWeight={700}>
                          {Math.round(initiatives.reduce((sum, i) => sum + i.votes, 0) / initiatives.length)}
                        </Typography>
                        <Typography variant="body2">
                          Średnia liczba głosów
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Fade>
    </Container>
  );
};

export default MamWplywModule;