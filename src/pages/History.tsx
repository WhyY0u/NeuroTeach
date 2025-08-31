import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Trash2, Share2, BookOpen, Calendar } from 'lucide-react';
import { useLessonContext } from '../context/LessonContext';
import Notification from '../components/Notification';

export default function History() {
  const { state, dispatch } = useLessonContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [notification, setNotification] = useState({ show: false, message: '' });

  const subjects = [
    { value: 'all', label: 'Все предметы' },
    { value: 'mathematics', label: 'Математика' },
    { value: 'history', label: 'История' },
    { value: 'biology', label: 'Биология' },
    { value: 'physics', label: 'Физика' },
    { value: 'chemistry', label: 'Химия' },
    { value: 'literature', label: 'Литература' },
    { value: 'geography', label: 'География' },
    { value: 'other', label: 'Другое' },
  ];

  const filteredLessons = state.lessons.filter(lesson => {
    const matchesSearch = lesson.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleDelete = (lessonId: string) => {
    dispatch({ type: 'DELETE_LESSON', payload: lessonId });
    setNotification({ show: true, message: 'Урок удален из истории' });
  };

  const handleShare = () => {
    setNotification({ show: true, message: 'Функция поделиться будет добавлена в следующей версии' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <BookOpen className="h-16 w-16 text-blue-600" />
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
          </div>
          
          <h1 className={`text-4xl font-bold mb-4 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Библиотека уроков
          </h1>
          
          <p className={`text-lg ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Все ваши созданные уроки в одном месте
          </p>
        </div>

        {/* Search and Filters */}
        <div className={`bg-gradient-to-r ${
          state.theme === 'dark' 
            ? 'from-gray-800 to-gray-900' 
            : 'from-white to-gray-50'
        } rounded-2xl shadow-xl p-6 mb-8`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Поиск по теме или предмету..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            <div className="relative">
              <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                state.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`pl-10 pr-8 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {subjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length === 0 ? (
          <div className={`text-center py-16 ${
            state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">
              {state.lessons.length === 0 ? 'Пока нет уроков' : 'Ничего не найдено'}
            </h3>
            <p className="mb-6">
              {state.lessons.length === 0 
                ? 'Создайте свой первый урок с помощью ИИ'
                : 'Попробуйте изменить параметры поиска'
              }
            </p>
            {state.lessons.length === 0 && (
              <Link
                to="/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Создать первый урок
              </Link>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`bg-gradient-to-br ${
                  state.theme === 'dark' 
                    ? 'from-gray-800 to-gray-900' 
                    : 'from-white to-gray-50'
                } rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3"></div>
                    <span className={`text-sm font-medium ${
                      state.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {subjects.find(s => s.value === lesson.subject)?.label}
                    </span>
                  </div>
                  
                  <h3 className={`font-semibold mb-3 line-clamp-2 ${
                    state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {lesson.topic}
                  </h3>
                  
                  <div className={`text-sm mb-4 space-y-1 ${
                    state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {lesson.createdAt.toLocaleDateString('ru-RU')}
                    </div>
                    <div>🎯 {lesson.level} • ⏱️ {lesson.duration} мин</div>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/lesson/${lesson.id}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Открыть
                    </Link>
                    
                    <button
                      onClick={handleShare}
                      className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                        state.theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Notification
        show={notification.show}
        message={notification.message}
        onClose={() => setNotification({ show: false, message: '' })}
      />
    </div>
  );
}