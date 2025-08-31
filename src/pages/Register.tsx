import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLessonContext } from '../context/LessonContext';
import Notification from '../components/Notification';

export default function Register() {
  const { state: authState, register } = useAuth();
  const { state } = useLessonContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      setNotification({ show: true, message: 'Пожалуйста, заполните все поля' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({ show: true, message: 'Пароли не совпадают' });
      return;
    }

    if (formData.password.length < 6) {
      setNotification({ show: true, message: 'Пароль должен содержать минимум 6 символов' });
      return;
    }

    const success = await register(formData.email, formData.password, formData.name);
    
    if (success) {
      setNotification({ show: true, message: 'Аккаунт успешно создан! Добро пожаловать!' });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setNotification({ show: true, message: 'Ошибка при создании аккаунта' });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="max-w-md w-full mx-4">
        <div className={`bg-gradient-to-br ${
          state.theme === 'dark' 
            ? 'from-gray-800 to-gray-900' 
            : 'from-white to-gray-50'
        } rounded-2xl shadow-xl p-8`}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <Brain className="h-16 w-16 text-blue-600" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NeuroTeach
            </h1>
            <p className={`text-sm mt-2 ${
              state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Создайте свой аккаунт
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Имя
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Пароль
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    state.theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  } transition-colors duration-200`}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Подтвердите пароль
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    state.theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  } transition-colors duration-200`}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authState.isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {authState.isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin inline" />
                  Создание аккаунта...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${
              state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Уже есть аккаунт?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Notification
        show={notification.show}
        message={notification.message}
        onClose={() => setNotification({ show: false, message: '' })}
      />
    </div>
  );
}