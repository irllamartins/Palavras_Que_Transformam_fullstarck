import Register from './pages/home'
import Workspace from './pages/workspace'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Statistic from './pages/statistic'
import { AppThemeProvider } from './components/theme/context'
import Profile from './pages/profile'
import { AuthProvider } from './components/auth/AuthProvider';
import { RequireAuth } from './components/private/RequireAuth';
import { SnackbarProvider } from 'notistack';
import Achievement from './pages/achievement'

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
              <Route path="/achievement" element={<RequireAuth><Achievement /></RequireAuth>} />
            </Routes>
          </BrowserRouter >
        </SnackbarProvider>
      </AuthProvider>
    </AppThemeProvider>

  );
}

export default App;
