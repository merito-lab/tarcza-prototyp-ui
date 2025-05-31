import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
  Divider,
  Fade,
  Tab,
  Tabs,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
} from '@mui/material';
import {
  Assessment as ReportIcon,
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  Download as DownloadIcon,
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

interface ReportsModuleProps {
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

const ReportsModule: React.FC<ReportsModuleProps> = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) return null;

  // Check permissions - only Zarząd should access this
  if (user.role !== 'Zarząd') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="error" gutterBottom>
              Brak uprawnień
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Nie masz uprawnień do wyświetlenia raportów strategicznych.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              Powrót do Dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const mockHRMetrics = {
    totalEmployees: 498,
    newHires: 23,
    retention: 94.2,
    satisfaction: 4.3,
    kudosGiven: 847,
    trainingsCompleted: 156,
    budgetUtilization: 78.5,
  };

  const departmentData = [
    { name: 'IT', employees: 145, satisfaction: 4.5, kudos: 234 },
    { name: 'HR', employees: 34, satisfaction: 4.2, kudos: 156 },
    { name: 'Zarząd', employees: 12, satisfaction: 4.1, kudos: 89 },
    { name: 'Produkcja', employees: 187, satisfaction: 4.0, kudos: 278 },
    { name: 'Sprzedaż', employees: 76, satisfaction: 4.4, kudos: 134 },
    { name: 'Finanse', employees: 44, satisfaction: 4.3, kudos: 98 },
  ];

  const topPerformers = [
    { name: 'Anna Kowalska', department: 'IT', kudos: 45, avatar: '👩‍💻' },
    { name: 'Jan Nowak', department: 'HR', kudos: 38, avatar: '👨‍💼' },
    { name: 'Maria Wiśniewska', department: 'HR', kudos: 34, avatar: '👩‍💼' },
    { name: 'Piotr Kowalczyk', department: 'IT', kudos: 32, avatar: '👨‍💻' },
    { name: 'Katarzyna Zielińska', department: 'Zarząd', kudos: 29, avatar: '👩‍💼' },
  ];

  const monthlyTrends = [
    { month: 'Sty', kudos: 67, trainings: 12, satisfaction: 4.1 },
    { month: 'Lut', kudos: 73, trainings: 15, satisfaction: 4.2 },
    { month: 'Mar', kudos: 82, trainings: 18, satisfaction: 4.3 },
    { month: 'Kwi', kudos: 78, trainings: 14, satisfaction: 4.2 },
    { month: 'Maj', kudos: 89, trainings: 21, satisfaction: 4.4 },
    { month: 'Cze', kudos: 94, trainings: 19, satisfaction: 4.3 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <ReportIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Raporty i Analizy
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Strategiczne raporty i wskaźniki HR
              </Typography>
            </Box>
          </Box>

          {/* Key Metrics Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
            <Card sx={{ background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {mockHRMetrics.totalEmployees}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Pracowników
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                  +{mockHRMetrics.newHires} w tym miesiącu
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ background: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {mockHRMetrics.retention}%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Retencja
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                  +2.1% vs poprzedni rok
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ background: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <TrophyIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {mockHRMetrics.kudosGiven}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Kudosów
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                  W tym miesiącu
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ background: 'linear-gradient(135deg, #AF52DE 0%, #FF3B30 100%)', color: 'white' }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <SchoolIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {mockHRMetrics.trainingsCompleted}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Szkoleń
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                  Ukończonych
                </Typography>
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
                    <BarChartIcon sx={{ mr: 1 }} />
                    Przegląd HR
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PieChartIcon sx={{ mr: 1 }} />
                    Departamenty
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ShowChartIcon sx={{ mr: 1 }} />
                    Trendy
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TimelineIcon sx={{ mr: 1 }} />
                    ROI Szkoleń
                  </Box>
                }
              />
            </Tabs>
          </Card>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: '1fr', 
                  md: '2fr 1fr' 
                }, 
                gap: 3 
              }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Satysfakcja pracowników w czasie
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    
                    {/* Simulated chart area */}
                    <Box sx={{ height: 300, bgcolor: 'background.default', borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: '100%', gap: 2 }}>
                        {monthlyTrends.map((data, index) => (
                          <Box key={data.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box
                              sx={{
                                height: `${data.satisfaction * 60}px`,
                                width: '100%',
                                background: `linear-gradient(45deg, #007AFF ${30 + index * 10}%, #5AC8FA ${70 + index * 5}%)`,
                                borderRadius: 1,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'end',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                pb: 1,
                              }}
                            >
                              {data.satisfaction}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {data.month}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Top Performerzy
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <List>
                      {topPerformers.map((performer, index) => (
                        <ListItem key={performer.name} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light', fontSize: '1rem' }}>
                              {performer.avatar}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={performer.name}
                            secondary={performer.department}
                          />
                          <Chip
                            label={`${performer.kudos} kudosów`}
                            color="primary"
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Analiza departamentów
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      sm: 'repeat(2, 1fr)', 
                      md: 'repeat(3, 1fr)' 
                    }, 
                    gap: 3 
                  }}>
                    {departmentData.map((dept, index) => (
                      <Card key={dept.name} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                          <Typography variant="h6" fontWeight={600} gutterBottom color="primary.main">
                            {dept.name}
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                              Liczba pracowników
                            </Typography>
                            <Typography variant="h4" fontWeight={700}>
                              {dept.employees}
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Satysfakcja: {dept.satisfaction}/5
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={(dept.satisfaction / 5) * 100}
                              sx={{ height: 8, borderRadius: 4 }}
                              color="success"
                            />
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">
                              Kudosy
                            </Typography>
                            <Chip
                              label={dept.kudos}
                              color="primary"
                              size="small"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Trendy miesięczne
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      md: 'repeat(3, 1fr)' 
                    }, 
                    gap: 3 
                  }}>
                    <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom fontWeight={600} color="primary.main">
                        Kudosy
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: 200, gap: 1 }}>
                        {monthlyTrends.map((data, index) => (
                          <Box key={data.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box
                              sx={{
                                height: `${(data.kudos / 100) * 180}px`,
                                width: '100%',
                                background: 'linear-gradient(45deg, #FF9500 30%, #FFCC02 90%)',
                                borderRadius: 1,
                                mb: 1,
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {data.month}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom fontWeight={600} color="secondary.main">
                        Szkolenia
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: 200, gap: 1 }}>
                        {monthlyTrends.map((data, index) => (
                          <Box key={data.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box
                              sx={{
                                height: `${(data.trainings / 25) * 180}px`,
                                width: '100%',
                                background: 'linear-gradient(45deg, #AF52DE 30%, #FF3B30 90%)',
                                borderRadius: 1,
                                mb: 1,
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {data.month}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom fontWeight={600} color="success.main">
                        Satysfakcja
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', height: 200, gap: 1 }}>
                        {monthlyTrends.map((data, index) => (
                          <Box key={data.month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box
                              sx={{
                                height: `${(data.satisfaction / 5) * 180}px`,
                                width: '100%',
                                background: 'linear-gradient(45deg, #34C759 30%, #30D158 90%)',
                                borderRadius: 1,
                                mb: 1,
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {data.month}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    ROI Szkoleń i Analiza Kosztów
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      md: 'repeat(2, 1fr)' 
                    }, 
                    gap: 3 
                  }}>
                    <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Budżet szkoleniowy
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
                        1,250,000 zł
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Wykorzystanie: {mockHRMetrics.budgetUtilization}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={mockHRMetrics.budgetUtilization}
                        sx={{ height: 10, borderRadius: 5, mb: 2 }}
                        color="secondary"
                      />
                      <Typography variant="body2" color="text.secondary">
                        Pozostało: {((100 - mockHRMetrics.budgetUtilization) / 100 * 1250000).toLocaleString()} zł
                      </Typography>
                    </Box>

                    <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                        Średni ROI szkoleń
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="success.main" gutterBottom>
                        324%
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Wzrost produktywności
                      </Typography>
                      <Typography variant="body2" color="success.main" gutterBottom>
                        +15% w stosunku do poprzedniego roku
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Średni koszt szkolenia: 8,200 zł
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 3, p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                      Kategorie szkoleń - wydatki
                    </Typography>
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: { 
                        xs: '1fr', 
                        md: 'repeat(3, 1fr)' 
                      }, 
                      gap: 3, 
                      mt: 2 
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight={600} color="primary.main">
                          Zarządzanie
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          320,000 zł
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          25.6% budżetu
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight={600} color="secondary.main">
                          Techniczne
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          450,000 zł
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          36% budżetu
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight={600} color="success.main">
                          Soft Skills
                        </Typography>
                        <Typography variant="h4" fontWeight={700}>
                          210,000 zł
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          16.8% budżetu
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </TabPanel>

          {/* Export Options */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Eksport raportów
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pobierz szczegółowe raporty w różnych formatach
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={() => console.log('Export PDF')}
                  >
                    PDF
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={() => console.log('Export Excel')}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={() => console.log('Export Full Report')}
                  >
                    Pełny raport
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Container>
  );
};

export default ReportsModule;