import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Sun, Moon, Home, Plus, History, LogOut, User } from 'lucide-react';
import { useLessonContext } from '../context/LessonContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { state, dispatch } = useLessonContext();
  const { state: authState, logout } = useAuth();
  const location = useLocation();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const navItems = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/create', label: 'Создать урок', icon: Plus },
    { path: '/history', label: 'История', icon: History },
  ];

  return (
    <header className={`border-b transition-colors duration-300 ${
      state.theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Brain className={`h-8 w-8 transition-colors duration-300 ${
                state.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              } group-hover:text-purple-500`} />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              NeuroTeach
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === path
                    ? state.theme === 'dark'
                      ? 'bg-blue-900 text-blue-300'
                      : 'bg-blue-100 text-blue-700'
                    : state.theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {authState.isAuthenticated && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className={`h-4 w-4 ${
                    state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {authState.user?.name || authState.user?.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    state.theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Выйти"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition-colors duration-200 ${
                state.theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {state.theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}