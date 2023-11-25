import React, { useContext } from 'react';
import Register from './pages/register'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MenuAppBar from './components/menu/menu.app.bar'
import Workspace from './pages/workspace'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Statistic from './pages/statistic'
import { AppThemeProvider } from './components/theme/context'
import Profile from './pages/profile'
import { AuthProvider } from './components/auth/AuthProvider';
import { AuthContext } from './components/auth/AuthContext';
import { RequireAuth } from './components/private/RequireAuth';
import { SnackbarProvider } from 'notistack';


function App() {

  return (
      <AppThemeProvider>
        <AuthProvider>
        <SnackbarProvider maxSnack={3}>
        <BrowserRouter  >
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workspace" element={<RequireAuth><Workspace /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/statistic" element={<RequireAuth><Statistic /></RequireAuth>} />
          </Routes>
        </BrowserRouter >
        </SnackbarProvider>
        </AuthProvider>
      </AppThemeProvider>
    
  );
}

export default App;
