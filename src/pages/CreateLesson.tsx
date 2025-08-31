import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Loader2, Wand2 } from 'lucide-react';
import { useLessonContext } from '../context/LessonContext';
import { Subject, LessonStyle } from '../types/Lesson';
import { generateLessonPlan } from '../utils/mockAI';
import Notification from '../components/Notification';

export default function CreateLesson() {
  const { state, dispatch } = useLessonContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    subject: 'mathematics' as Subject,
    topic: '',
    level: '',
    duration: 30,
    style: 'examples' as LessonStyle,
  });
  
  const [notification, setNotification] = useState({ show: false, message: '' });

  const subjects = [
    { value: 'mathematics', label: 'Математика' },
    { value: 'history', label: 'История' },
    { value: 'biology', label: 'Биология' },
    { value: 'physics', label: 'Физика' },
    { value: 'chemistry', label: 'Химия' },
    { value: 'literature', label: 'Литература' },
    { value: 'geography', label: 'География' },
    { value: 'other', label: 'Другое' },
  ];

  const styles = [
    { value: 'strict', label: 'Строго и академично' },
    { value: 'easy', label: 'Легко и доступно' },
    { value: 'examples', label: 'С примерами' },
    { value: 'creative', label: 'Креативно' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.topic || !formData.level) {
      setNotification({ show: true, message: 'Пожалуйста, заполните все обязательные поля' });
      return;
    }

    dispatch({ type: 'SET_GENERATING', payload: true });

    try {
      const lessonPlan = await generateLessonPlan(
        formData.subject,
        formData.topic,
        formData.level,
        formData.duration,
        formData.style
      );

      const newLesson = {
        id: crypto.randomUUID(),
        title: formData.topic,
        subject: formData.subject,
        topic: formData.topic,
        level: formData.level,
        duration: formData.duration,
        style: formData.style,
        createdAt: new Date(),
        plan: lessonPlan,
      };

      dispatch({ type: 'ADD_LESSON', payload: newLesson });
      setNotification({ show: true, message: 'Урок успешно создан!' });
      
      setTimeout(() => {
        navigate(`/lesson/${newLesson.id}`);
      }, 1000);
    } catch (error) {
      setNotification({ show: true, message: 'Ошибка при создании урока' });
    } finally {
      dispatch({ type: 'SET_GENERATING', payload: false });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <Wand2 className="h-16 w-16 text-purple-600" />
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
          </div>
          
          <h1 className={`text-4xl font-bold mb-4 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Создание урока
          </h1>
          
          <p className={`text-lg ${
            state.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Расскажите о вашем уроке, и ИИ создаст для вас план и видео-сценарий
          </p>
        </div>

        <div className={`bg-gradient-to-br ${
          state.theme === 'dark' 
            ? 'from-gray-800 to-gray-900' 
            : 'from-white to-gray-50'
        } rounded-2xl shadow-xl p-8`}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Предмет *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value as Subject })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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

              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Длительность (минуты) *
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    state.theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Тема урока *
              </label>
              <input
                type="text"
                placeholder="Например: Квадратные уравнения"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Уровень/возраст аудитории *
              </label>
              <input
                type="text"
                placeholder="Например: 8-9 класс, студенты, взрослые"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  state.theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${
                state.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Стиль урока
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styles.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, style: style.value as LessonStyle })}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      formData.style === style.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : state.theme === 'dark'
                          ? 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={state.isGenerating}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {state.isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Генерируем урок...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Сгенерировать урок
                  </>
                )}
              </button>
            </div>
          </form>
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