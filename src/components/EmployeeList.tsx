import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Avatar,
  Chip,
  IconButton,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Grow,
  Button,
} from '@mui/material';
import {
  Group as GroupIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
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

interface EmployeeListProps {
  user: User | null;
}

const mockEmployees = [
  {
    id: 1,
    name: 'Anna Kowalska',
    email: 'anna.kowalska@energetyka.pl',
    role: 'Pracownik',
    department: 'IT',
    avatar: '👩‍💻',
    status: 'Aktywny',
  },
  {
    id: 2,
    name: 'Jan Nowak',
    email: 'jan.nowak@energetyka.pl',
    role: 'Lider zespołu',
    department: 'HR',
    avatar: '👨‍💼',
    status: 'Aktywny',
  },
  {
    id: 3,
    name: 'Maria Wiśniewska',
    email: 'maria.wisniewska@energetyka.pl',
    role: 'Koordynator HR',
    department: 'HR',
    avatar: '👩‍💼',
    status: 'Aktywny',
  },
  {
    id: 4,
    name: 'Piotr Kowalczyk',
    email: 'piotr.kowalczyk@energetyka.pl',
    role: 'Administrator systemu',
    department: 'IT',
    avatar: '👨‍💻',
    status: 'Aktywny',
  },
  {
    id: 5,
    name: 'Katarzyna Zielińska',
    email: 'katarzyna.zielinska@energetyka.pl',
    role: 'Zarząd',
    department: 'Zarząd',
    avatar: '👩‍💼',
    status: 'Aktywny',
  },
  {
    id: 6,
    name: 'Tomasz Dąbrowski',
    email: 'tomasz.dabrowski@energetyka.pl',
    role: 'Koordynator programu Mam wpływ',
    department: 'HR',
    avatar: '👨‍💼',
    status: 'Aktywny',
  },
];

const EmployeeList: React.FC<EmployeeListProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Wszystkie');
  const [roleFilter, setRoleFilter] = useState('Wszystkie');
  const navigate = useNavigate();

  if (!user) return null;

  // Check permissions
  const hasPermission = ['Koordynator HR', 'Administrator systemu', 'Zarząd'].includes(user.role);
  
  if (!hasPermission) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="error" gutterBottom>
              Brak uprawnień
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Nie masz uprawnień do wyświetlenia listy pracowników.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              Powrót do Dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const departments = ['Wszystkie', 'IT', 'HR', 'Zarząd'];
  const roles = ['Wszystkie', ...Array.from(new Set(mockEmployees.map(emp => emp.role)))];

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'Wszystkie' || employee.department === departmentFilter;
    const matchesRole = roleFilter === 'Wszystkie' || employee.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

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
            <GroupIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Lista pracowników
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Zarządzaj danymi pracowników i ich profilami
              </Typography>
            </Box>
          </Box>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Filtrowanie
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <TextField
                    fullWidth
                    label="🔍 Wyszukaj pracownika"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Wpisz nazwisko lub email..."
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel>Departament</InputLabel>
                    <Select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      label="Departament"
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel>Rola</InputLabel>
                    <Select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      label="Rola"
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Znaleziono: {filteredEmployees.length} pracowników
            </Typography>
          </Box>

          {/* Employee Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3 }}>
            {filteredEmployees.map((employee, index) => (
              <Box key={employee.id}>
                <Grow in timeout={600 + index * 100}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            fontSize: '2rem',
                            bgcolor: 'primary.light',
                            mr: 2,
                          }}
                        >
                          {employee.avatar}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {employee.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {employee.email}
                          </Typography>
                          <Chip
                            label={employee.status}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={employee.department}
                          sx={{
                            bgcolor: getDepartmentColor(employee.department),
                            color: 'white',
                            fontWeight: 500,
                            mr: 1,
                            mb: 1,
                          }}
                        />
                        <Chip
                          label={employee.role}
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => {
                            // Navigate to employee profile
                            console.log('View profile:', employee.id);
                          }}
                        >
                          Profil
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            // Navigate to edit employee
                            console.log('Edit employee:', employee.id);
                          }}
                        >
                          Edytuj
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Box>
            ))}
          </Box>

          {/* No Results */}
          {filteredEmployees.length === 0 && (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Brak wyników
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nie znaleziono pracowników spełniających kryteria wyszukiwania.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default EmployeeList;