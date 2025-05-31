import React from 'react';
import { Box } from '@mui/material';
import AppBarComponent from './AppBarComponent';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarComponent user={user} onLogout={onLogout} />
      {children}
    </Box>
  );
};

export default Layout;