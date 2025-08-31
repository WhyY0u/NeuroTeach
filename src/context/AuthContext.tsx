import axios from 'axios';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AuthState {
  user: any;
  isLoading: boolean;
  token: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: any; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  token: localStorage.getItem('token'),
};

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload.user, token: action.payload.token };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, token: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post('https://drtyui.ru/api/auth/login', {
      email,
      password,
    });

    const data = res.data;
    console.log('Login response:', data);

    if (!data.access_token) {
      console.error('Token or user not found in response:', data);
      throw new Error('Ошибка авторизации: неверный ответ от сервера');
    }

    localStorage.setItem('token', data.access_token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token: data.token } });

    return true;
  } catch (err: any) {
    dispatch({ type: 'LOGIN_FAILURE' });
    console.error('Ошибка авторизации:', err.response?.data?.message || err.message);
    return false;
  }
};


const register = async (email: string, password: string, name: string) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post('https://drtyui.ru/api/auth/register', {
      email,
      password,
      name,
    });

    const data = res.data;
    console.log('Registration response:', data);

    if (!data.access_token) {
      console.error('Token or user not found in response:', data);
      throw new Error(`Ошибка регистрации: неверный ответ от сервера`);
    }

    localStorage.setItem('token', data.access_token);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user: data.user, token: data.token } });

    return true;
  } catch (err: any) {
    dispatch({ type: 'LOGIN_FAILURE' });
    console.error('Ошибка регистрации:', err.response?.data?.message || err.message);
    return false;
  }
};



  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
