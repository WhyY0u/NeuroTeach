import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LessonProvider, useLessonContext } from './context/LessonContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CreateLesson from './pages/CreateLesson';
import LessonResult from './pages/LessonResult';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const { state } = useLessonContext();
  const { state: authState } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        state.theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'
      }`}>
        {authState.isAuthenticated && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreateLesson />
            </ProtectedRoute>
          } />
          <Route path="/lesson/:id" element={
            <ProtectedRoute>
              <LessonResult />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <LessonProvider>
        <AppContent />
      </LessonProvider>
    </AuthProvider>
  );
}

export default App;