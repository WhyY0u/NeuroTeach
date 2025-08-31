import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, History, Brain, Sparkles, BookOpen, Video } from 'lucide-react';
import { useLessonContext } from '../context/LessonContext';

export default function Home() {
  const { state } = useLessonContext();
  const recentLessons = state.lessons.slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
            <Brain className="h-24 w-24 text-blue-600 relative z-10" />
          </div>
          
          <h1 className={`text-5xl font-bold mb-4 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NeuroTeach
            </span>
          </h1>
          
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ваш персональный ИИ-учитель для создания увлекательных уроков и обучающих видео
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Создать урок
            </Link>
            
            <Link
              to="/history"
              className={`inline-flex items-center px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
                state.theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <History className="h-5 w-5 mr-2" />
              История уроков
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
            state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className={`text-lg font-semibold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ИИ-Генерация
              </h3>
            </div>
            <p className={state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Автоматическое создание структурированных планов уроков с учетом возраста и стиля обучения
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
            state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center mb-4">
              <Video className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className={`text-lg font-semibold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Видео-сценарии
              </h3>
            </div>
            <p className={state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Создание готовых сценариев для обучающих видео с тайм-кодами и рекомендациями
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
            state.theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-green-600 mr-3" />
              <h3 className={`text-lg font-semibold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Библиотека уроков
              </h3>
            </div>
            <p className={state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              Сохранение и организация всех созданных уроков с возможностью поиска и фильтрации
            </p>
          </div>
        </div>

        {/* Recent Lessons */}
        {recentLessons.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-2xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Последние уроки
              </h2>
              <Link
                to="/history"
                className="text-blue-600 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                Показать все
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recentLessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className={`block p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    state.theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                    <span className={`text-sm font-medium ${
                      state.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {lesson.subject}
                    </span>
                  </div>
                  
                  <h3 className={`font-semibold mb-2 line-clamp-2 ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {lesson.topic}
                  </h3>
                  
                  <div className={`text-sm ${
                    state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {lesson.duration} мин • {lesson.level}
                  </div>
                  
                  <div className={`text-xs mt-2 ${
                    state.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {lesson.createdAt.toLocaleDateString('ru-RU')}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}