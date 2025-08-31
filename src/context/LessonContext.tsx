import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Lesson, mapLessonDTOToLesson } from '../types/Lesson';
import axios from 'axios';

interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  isGenerating: boolean;
  theme: 'light' | 'dark';
}

type LessonAction =
  | { type: 'ADD_LESSON'; payload: Lesson }
  | { type: 'SET_CURRENT_LESSON'; payload: Lesson | null }
  |  { type: 'SET_LESSONS'; payload: Lesson[] } 
  | { type: 'DELETE_LESSON'; payload: string }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_LESSON_PLAN'; payload: { id: string; plan: any; videoScript?: string } };

const initialState: LessonState = {
  lessons: [],
  currentLesson: null,
  isGenerating: false,
  theme: 'light',
};

function lessonReducer(state: LessonState, action: LessonAction): LessonState {
  switch (action.type) {
    case 'SET_LESSONS':
  return {
    ...state,
    lessons: action.payload,
  };
    case 'ADD_LESSON':
      return {
        ...state,
        lessons: [action.payload, ...state.lessons],
        currentLesson: action.payload,
      };
    case 'SET_CURRENT_LESSON':
      return {
        ...state,
        currentLesson: action.payload,
      };
    case 'DELETE_LESSON':
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson.id !== action.payload),
      };
    case 'SET_GENERATING':
      return {
        ...state,
        isGenerating: action.payload,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'UPDATE_LESSON_PLAN':
      return {
        ...state,
        lessons: state.lessons.map(lesson =>
          lesson.id === action.payload.id
            ? { ...lesson, plan: action.payload.plan, videoScript: action.payload.videoScript }
            : lesson
        ),
        currentLesson: state.currentLesson?.id === action.payload.id
          ? { ...state.currentLesson, plan: action.payload.plan, videoScript: action.payload.videoScript }
          : state.currentLesson,
      };
    default:
      return state;
  }
}

const LessonContext = createContext<{
  state: LessonState;
  dispatch: React.Dispatch<LessonAction>;
  fetchLessons: () => Promise<void>;
} | null>(null);

export function LessonProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(lessonReducer, initialState);

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://drtyui.ru/api/lessons', {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000,
      });
      const lessons: Lesson[] = res.data.map((dto: any) => mapLessonDTOToLesson(dto));
      dispatch({ type: 'SET_LESSONS', payload: lessons }); 
    } catch (err: any) {
      dispatch({ type: 'UPDATE_LESSON_PLAN', payload: err.message || 'Ошибка при загрузке уроков' });
    }
  };

  return (
    <LessonContext.Provider value={{ state, dispatch, fetchLessons }}>
      {children}
    </LessonContext.Provider>
  );
}

export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLessonContext must be used within a LessonProvider');
  }
  return context;
}