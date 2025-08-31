import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Video, FileText, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { useLessonContext } from '../context/LessonContext';
import { generateVideoScript } from '../utils/mockAI';
import Notification from '../components/Notification';

export default function LessonResult() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useLessonContext();
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  const lesson = state.lessons.find(l => l.id === id);

  if (!lesson) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        state.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Урок не найден
          </h2>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const handleGenerateVideo = async () => {
    if (!lesson.plan) return;
    
    setIsGeneratingVideo(true);
    try {
      const videoScript = await generateVideoScript(lesson.plan);
      dispatch({
        type: 'UPDATE_LESSON_PLAN',
        payload: { id: lesson.id, plan: lesson.plan, videoScript }
      });
      setNotification({ show: true, message: 'Видео-сценарий успешно создан!' });
    } catch (error) {
      setNotification({ show: true, message: 'Ошибка при создании видео-сценария' });
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleDownloadPlan = () => {
    setNotification({ show: true, message: 'Функция скачивания будет добавлена в следующей версии' });
  };

  const planSections = lesson.plan ? [
    { title: 'Вступление', content: lesson.plan.introduction, icon: '🎯' },
    { title: 'Объяснение', content: lesson.plan.explanation, icon: '📚' },
    { title: 'Практика', content: lesson.plan.practice, icon: '✍️' },
    { title: 'Итог', content: lesson.plan.conclusion, icon: '🎉' },
  ] : [];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      state.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
              state.theme === 'dark'
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к главной
          </Link>

          <button
            onClick={() => setNotification({ show: true, message: 'Функция поделиться будет добавлена в следующей версии' })}
            className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
              state.theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } shadow-md`}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Поделиться
          </button>
        </div>

        {/* Lesson Info */}
        <div className={`bg-gradient-to-r ${
          state.theme === 'dark' 
            ? 'from-gray-800 to-gray-900' 
            : 'from-white to-gray-50'
        } rounded-2xl shadow-xl p-8 mb-8`}>
          <div className="flex items-center mb-6">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-4"></div>
            <span className={`text-sm font-medium uppercase tracking-wide ${
              state.theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {lesson.label}
            </span>
          </div>
          
          <h1 className={`text-3xl font-bold mb-4 ${
            state.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {lesson.topic}
          </h1>
          
          <div className={`flex flex-wrap gap-4 text-sm ${
            state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>🎯 {lesson.level}</span>
            <span>⏱️ {lesson.duration} минут</span>
            <span>🎨 {lesson.label}</span>
            <span>📅 {lesson.createdAt.toLocaleDateString('ru-RU')}</span>
          </div>
        </div>

        {/* Lesson Plan */}
        {lesson.plan && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${
                state.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                План урока
              </h2>
              
              <button
                onClick={handleDownloadPlan}
                className={`inline-flex items-center px-6 py-3 rounded-xl transition-all duration-200 ${
                  state.theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                <Download className="h-4 w-4 mr-2" />
                Скачать план
              </button>
            </div>

            <div className="grid gap-6">
              {planSections.map((section, index) => (
                <div
                  key={section.title}
                  className={`bg-gradient-to-br ${
                    state.theme === 'dark' 
                      ? 'from-gray-800 to-gray-900' 
                      : 'from-white to-gray-50'
                  } rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-102`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <h3 className={`text-lg font-semibold ${
                      state.theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {section.title}
                    </h3>
                  </div>
                  
                  <p className={`leading-relaxed ${
                    state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Script Section */}
        <div className={`bg-gradient-to-br ${
          state.theme === 'dark' 
            ? 'from-gray-800 to-gray-900' 
            : 'from-white to-gray-50'
        } rounded-2xl shadow-xl p-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold flex items-center ${
              state.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <Video className="h-6 w-6 mr-3 text-purple-600" />
              Видео-сценарий
            </h2>
            
            {!lesson.videoScript && (
              <button
                onClick={handleGenerateVideo}
                disabled={isGeneratingVideo}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGeneratingVideo ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Генерируем...
                  </>
                ) : (
                  <>
                    <Video className="h-4 w-4 mr-2" />
                    Сгенерировать видео
                  </>
                )}
              </button>
            )}
          </div>

          {lesson.videoScript ? (
            <div className={`bg-gradient-to-br ${
              state.theme === 'dark' 
                ? 'from-gray-700 to-gray-800' 
                : 'from-gray-50 to-white'
            } rounded-xl p-6 max-h-96 overflow-y-auto border ${
              state.theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <pre className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${
                state.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {lesson.videoScript}
              </pre>
            </div>
          ) : (
            <div className={`text-center py-12 ${
              state.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Видео-сценарий еще не создан</p>
              <p className="text-sm mt-2">Нажмите кнопку выше для генерации сценария</p>
            </div>
          )}
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