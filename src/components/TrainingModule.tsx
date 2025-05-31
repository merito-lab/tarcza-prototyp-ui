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
  Divider,
  Fade,
  Grow,
  IconButton,
  Badge,
  Snackbar,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  School as SchoolIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  EuroSymbol as EuroIcon,
  CheckCircle as CheckCircleIcon,
  Assessment as AssessmentIcon,
  Recommend as RecommendIcon,
  TrendingUp as TrendingUpIcon,
  Book as BookIcon,
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

interface TrainingModuleProps {
  user: User | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Training {
  id: number;
  title: string;
  provider: string;
  category: string;
  cost: number;
  duration: string;
  description: string;
  status: 'available' | 'pending' | 'approved' | 'completed';
  deadline?: string;
  effectiveness?: number;
}

interface TrainingApplication {
  id: number;
  trainingId: number;
  employeeName: string;
  employeeAvatar: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  justification: string;
  budget: number;
}

const mockTrainings: Training[] = [
  {
    id: 1,
    title: 'Zarządzanie zespołem w organizacji turkusowej',
    provider: 'Akademia Rozwoju',
    category: 'Zarządzanie',
    cost: 2500,
    duration: '3 dni',
    description: 'Szkolenie z zakresu nowoczesnych metod zarządzania zespołem zgodnych z filozofią organizacji turkusowej.',
    status: 'available',
    deadline: '2024-03-15',
  },
  {
    id: 2,
    title: 'Technologie OZE - fotowoltaika',
    provider: 'Instytut Energetyki',
    category: 'Techniczne',
    cost: 3200,
    duration: '5 dni',
    description: 'Kompleksowe szkolenie z zakresu projektowania i montażu instalacji fotowoltaicznych.',
    status: 'pending',
    deadline: '2024-02-28',
  },
  {
    id: 3,
    title: 'Komunikacja w zespole',
    provider: 'HR Excellence',
    category: 'Soft skills',
    cost: 1800,
    duration: '2 dni',
    description: 'Szkolenie z zakresu efektywnej komunikacji wewnętrznej i zewnętrznej.',
    status: 'completed',
    effectiveness: 4.2,
  },
];

const mockApplications: TrainingApplication[] = [
  {
    id: 1,
    trainingId: 2,
    employeeName: 'Jan Nowak',
    employeeAvatar: '👨‍💼',
    status: 'pending',
    appliedDate: '2024-01-20',
    justification: 'Chcę rozwijać kompetencje w zakresie odnawialnych źródeł energii, aby lepiej wspierać projekty zespołu.',
    budget: 3200,
  },
  {
    id: 2,
    trainingId: 1,
    employeeName: 'Anna Kowalska',
    employeeAvatar: '👩‍💻',
    status: 'approved',
    appliedDate: '2024-01-18',
    justification: 'Jako lider zespołu chcę pogłębić wiedzę na temat zarządzania w organizacji turkusowej.',
    budget: 2500,
  },
];

const categories = ['Wszystkie', 'Zarządzanie', 'Techniczne', 'Soft skills', 'IT', 'Bezpieczeństwo'];

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const TrainingModule: React.FC<TrainingModuleProps> = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('Wszystkie');
  const [trainings] = useState(mockTrainings);
  const [applications] = useState(mockApplications);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [applicationJustification, setApplicationJustification] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleApplyForTraining = (training: Training) => {
    setSelectedTraining(training);
    setDialogOpen(true);
  };

  const handleSubmitApplication = () => {
    if (selectedTraining && applicationJustification) {
      console.log('Training application submitted:', {
        trainingId: selectedTraining.id,
        justification: applicationJustification,
      });
      setDialogOpen(false);
      setApplicationJustification('');
      setSelectedTraining(null);
      setShowSuccess(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Zarządzanie': '#FF9500',
      'Techniczne': '#007AFF',
      'Soft skills': '#34C759',
      'IT': '#5AC8FA',
      'Bezpieczeństwo': '#FF3B30',
    };
    return colors[category] || '#6D6D80';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'available': '#34C759',
      'pending': '#FFCC02',
      'approved': '#007AFF',
      'completed': '#6D6D80',
    };
    return colors[status] || '#6D6D80';
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'available': 'Dostępne',
      'pending': 'Oczekuje',
      'approved': 'Zatwierdzone',
      'completed': 'Ukończone',
    };
    return labels[status] || status;
  };

  if (!user) return null;

  const filteredTrainings = trainings.filter(training => 
    categoryFilter === 'Wszystkie' || training.category === categoryFilter
  );

  const isLeaderOrHR = ['Lider zespołu', 'Koordynator HR', 'Zarząd'].includes(user.role);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Moduł Szkoleń
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Zarządzaj szkoleniami i rozwojem kompetencji
              </Typography>
            </Box>
          </Box>

          {/* Quick Stats */}
          <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
            <Card sx={{ background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)', color: 'white', flex: 1, minWidth: 200 }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>5,500 zł</Typography>
                <Typography variant="body2">Budżet szkoleniowy</Typography>
              </CardContent>
            </Card>
            <Card sx={{ background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)', color: 'white', flex: 1, minWidth: 200 }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>3</Typography>
                <Typography variant="body2">Ukończone szkolenia</Typography>
              </CardContent>
            </Card>
            <Card sx={{ background: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)', color: 'white', flex: 1, minWidth: 200 }}>
              <CardContent>
                <Typography variant="h4" fontWeight={700}>92%</Typography>
                <Typography variant="body2">Średnia ocena</Typography>
              </CardContent>
            </Card>
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
                    <BookIcon sx={{ mr: 1 }} />
                    Katalog Szkoleń
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={applications.filter(a => a.status === 'pending').length} color="primary">
                      <ScheduleIcon sx={{ mr: 1 }} />
                    </Badge>
                    Moje Wnioski
                  </Box>
                }
              />
              {isLeaderOrHR && (
                <Tab
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Badge badgeContent={applications.filter(a => a.status === 'pending').length} color="error">
                        <AssessmentIcon sx={{ mr: 1 }} />
                      </Badge>
                      Zatwierdzanie
                    </Box>
                  }
                />
              )}
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    Analityka
                  </Box>
                }
              />
            </Tabs>
          </Card>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            <Box>
              {/* Filters */}
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Filtrowanie
                  </Typography>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Kategoria</InputLabel>
                    <Select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      label="Kategoria"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>

              {/* Training Cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                {filteredTrainings.map((training, index) => (
                  <Box key={training.id}>
                    <Grow in timeout={600 + index * 200}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Chip
                              label={training.category}
                              sx={{
                                bgcolor: getCategoryColor(training.category),
                                color: 'white',
                                fontWeight: 500,
                              }}
                            />
                            <Chip
                              label={getStatusLabel(training.status)}
                              sx={{
                                bgcolor: getStatusColor(training.status),
                                color: 'white',
                                fontWeight: 500,
                              }}
                            />
                          </Box>

                          <Typography variant="h6" gutterBottom fontWeight={600}>
                            {training.title}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {training.provider}
                          </Typography>

                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {training.description}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <EuroIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {training.cost.toLocaleString()} zł
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {training.duration}
                              </Typography>
                            </Box>
                          </Box>

                          {training.deadline && (
                            <Typography variant="body2" color="warning.main" sx={{ mb: 2 }}>
                              Termin zapisów: {training.deadline}
                            </Typography>
                          )}

                          {training.effectiveness && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                Ocena efektywności:
                              </Typography>
                              <Typography variant="body2" fontWeight={600}>
                                {training.effectiveness}/5
                              </Typography>
                            </Box>
                          )}

                          <Box sx={{ mt: 'auto' }}>
                            {training.status === 'available' && (
                              <Button
                                variant="contained"
                                fullWidth
                                startIcon={<AddIcon />}
                                onClick={() => handleApplyForTraining(training)}
                              >
                                Złóż wniosek
                              </Button>
                            )}
                            {training.status === 'completed' && (
                              <Button
                                variant="outlined"
                                fullWidth
                                startIcon={<RecommendIcon />}
                              >
                                Poleć innym
                              </Button>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Box>
                ))}
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Moje wnioski szkoleniowe
                </Typography>

                <List>
                  {applications.map((application, index) => {
                    const training = trainings.find(t => t.id === application.trainingId);
                    if (!training) return null;

                    return (
                      <Grow key={application.id} in timeout={600 + index * 200}>
                        <Card sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                  {training.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  {training.provider} • {application.appliedDate}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                  {application.justification}
                                </Typography>
                              </Box>
                              <Chip
                                label={application.status === 'pending' ? 'Oczekuje' : application.status === 'approved' ? 'Zatwierdzony' : 'Odrzucony'}
                                color={application.status === 'approved' ? 'success' : application.status === 'pending' ? 'warning' : 'error'}
                              />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EuroIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {application.budget.toLocaleString()} zł
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {training.duration}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grow>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          {isLeaderOrHR && (
            <TabPanel value={tabValue} index={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Wnioski do zatwierdzenia
                  </Typography>

                  <List>
                    {applications.filter(a => a.status === 'pending').map((application, index) => {
                      const training = trainings.find(t => t.id === application.trainingId);
                      if (!training) return null;

                      return (
                        <Grow key={application.id} in timeout={600 + index * 200}>
                          <Card sx={{ mb: 2 }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ mr: 2, fontSize: '1.2rem' }}>
                                  {application.employeeAvatar}
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography variant="subtitle1" fontWeight={600}>
                                    {application.employeeName}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {application.appliedDate}
                                  </Typography>
                                </Box>
                                <Chip
                                  label={`${application.budget.toLocaleString()} zł`}
                                  color="primary"
                                  variant="outlined"
                                />
                              </Box>

                              <Typography variant="h6" fontWeight={600} gutterBottom>
                                {training.title}
                              </Typography>
                              
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                <strong>Uzasadnienie:</strong> {application.justification}
                              </Typography>

                              <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  startIcon={<CheckCircleIcon />}
                                  size="small"
                                >
                                  Zatwierdź
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                >
                                  Odrzuć
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grow>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </TabPanel>
          )}

          <TabPanel value={tabValue} index={isLeaderOrHR ? 3 : 2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Najpopularniejsze kategorie
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
                    {categories.slice(1, 6).map((category, index) => (
                      <Box
                        key={category}
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
                          label={category}
                          sx={{
                            bgcolor: getCategoryColor(category),
                            color: 'white',
                            fontWeight: 500,
                            fontSize: '1rem',
                            py: 1,
                          }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {Math.floor(Math.random() * 15) + 5}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Efektywność szkoleń
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Średnia ocena
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
                        4.2/5
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={84} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Wykorzystanie budżetu
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="secondary.main" gutterBottom>
                        65%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={65} 
                        color="secondary"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Ukończone szkolenia
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="success.main" gutterBottom>
                        78%
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={78} 
                        color="success"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </TabPanel>
        </Box>
      </Fade>

      {/* Training Application Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Wniosek o udział w szkoleniu
        </DialogTitle>
        <DialogContent>
          {selectedTraining && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedTraining.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedTraining.provider} • {selectedTraining.cost.toLocaleString()} zł • {selectedTraining.duration}
              </Typography>
              
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Uzasadnienie"
                value={applicationJustification}
                onChange={(e) => setApplicationJustification(e.target.value)}
                placeholder="Opisz, dlaczego chcesz uczestniczyć w tym szkoleniu i jak przyczyni się to do Twojego rozwoju..."
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Anuluj
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitApplication}
            disabled={!applicationJustification}
          >
            Złóż wniosek
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Wniosek o szkolenie został złożony pomyślnie! 🎓
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TrainingModule;