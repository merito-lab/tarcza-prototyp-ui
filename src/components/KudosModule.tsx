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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
    }
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
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                    Przyznaj Kudosa współpracownikowi
                  </Typography>

                  <Grid container spacing={3}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <FormControl fullWidth sx={{ mb: 3 }}>
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

                      <FormControl fullWidth sx={{ mb: 3 }}>
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

                      <FormControl fullWidth sx={{ mb: 3 }}>
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
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={8}
                        label="Uzasadnienie (opisz konkretne działanie)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Opisz konkretne działanie, za które chcesz docenić współpracownika..."
                        sx={{ mb: 3 }}
                      />

                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<TrophyIcon />}
                        onClick={handleSubmitKudos}
                        disabled={!recipient || !value || !reason}
                        sx={{
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
                  </Grid>
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
              <Grid container spacing={3}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Najczęściej nagradzane wartości
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      {companyValues.slice(0, 5).map((val, index) => (
                        <Box
                          key={val}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 2,
                          }}
                        >
                          <Chip
                            label={val}
                            sx={{
                              bgcolor: getValueColor(val),
                              color: 'white',
                              fontWeight: 500,
                            }}
                          />
                          <Typography variant="h6" fontWeight={600}>
                            {Math.floor(Math.random() * 20) + 1}
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
                        Top odbiorcy Kudosów
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      {mockEmployees.slice(0, 5).map((employee, index) => (
                        <Box
                          key={employee.name}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ mr: 2, fontWeight: 700, color: 'primary.main' }}
                          >
                            #{index + 1}
                          </Typography>
                          <Avatar sx={{ mr: 2, fontSize: '1rem' }}>
                            {employee.avatar}
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {employee.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TrophyIcon sx={{ color: '#FFCC02', mr: 0.5 }} />
                            <Typography variant="h6" fontWeight={600}>
                              {Math.floor(Math.random() * 15) + 1}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grow>
          </TabPanel>
        </Box>
      </Fade>
    </Container>
  );
};

export default KudosModule;